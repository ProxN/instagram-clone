import { Request } from 'express';
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import dayjs from 'dayjs';
import { getConnection } from 'typeorm';
import { checkEmpty } from '../../lib/helpers';
import { Context } from '../../types/context';
import {
  InboxResult,
  MessageResponse,
  MessagesPayload,
  SendMessageResponse,
  UnReadMressagesResponse,
} from '../../types/message';
import Conversation from '../conversation/conversation-entity';
import User from '../user/user-entity';
import Message from './message-entity';

@Resolver(InboxResult)
class MessageResolver {
  @FieldResolver(() => User, { nullable: true })
  async user(
    @Root() payload: InboxResult,
    @Ctx() { req, userLoader }: Context
  ) {
    let id: string;
    if (payload.user_id === req.session.userId) {
      id = payload.receiver_id;
    } else {
      id = payload.user_id;
    }
    const user = await userLoader.load(id);
    return user;
  }

  @Authorized()
  @Mutation(() => SendMessageResponse)
  async sendMessage(
    @Arg('text') text: string,
    @Arg('receiver_id') receiver_id: string,
    @Ctx() { req, pubSub }: Context
  ): Promise<SendMessageResponse> {
    const error = checkEmpty({ text, receiver_id });
    if (error.message) {
      return { error };
    }

    let message;
    try {
      message = await Message.create({
        text,
        user_id: req.session.userId,
      }).save();

      const conversation = await Conversation.create({
        user_id: req.session.userId,
        message_id: message.id,
        receiver_id,
      }).save();

      pubSub.publish('READ_MESSAGE', { message, conversation });
      pubSub.publish('UNREAD_MESSAGES', conversation);
    } catch (error) {
      return {
        error: {
          field: 'sendMessage',
          message: 'Something went worng!! Please try again.',
        },
      };
    }

    return { message };
  }

  @Authorized()
  @Query(() => MessageResponse)
  async getUserConversation(
    @Arg('receiver_id') receiver_id: string,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Arg('limit', () => Int) limit: number,
    @Ctx() { req }: Context
  ): Promise<MessageResponse> {
    const messagesLimit = Math.min(50, limit);
    const realLimit = messagesLimit + 1;
    const args: any[] = [req.session.userId, receiver_id, realLimit];

    if (cursor) {
      args.push(new Date(+cursor));
    }

    const result = await getConnection().query(
      `
        select date_trunc('hour',m."createdAt") as time, m.*, c."receiver_id"
        from message m
        INNER JOIN conversation c ON m."id" = c."message_id"
        where   ${
          cursor ? ` m."createdAt" < $4 AND` : ''
        } (c."user_id" = $1 AND c."receiver_id" = $2)
        OR (c."user_id" = $2 AND c."receiver_id" = $1)
      
        order by m."createdAt" DESC
        limit $3
        `,
      args
    );

    return {
      messages: result.slice(0, messagesLimit),
      hasMore: result.length === realLimit,
    };
  }

  @Authorized()
  @Query(() => [InboxResult])
  async getUserInbox(@Ctx() { req }: Context) {
    const result = await getConnection().query(
      `
      select DISTINCT ON (pair) conv.*, case 
      when conv."user_id" = $1
      then (conv."user_id",conv."receiver_id") else (conv."receiver_id",conv."user_id") end as pair
      from ( select  c."user_id", c."receiver_id", m."text", m."id", m."createdAt", m."seen"
      from message m
      inner join conversation c on c."message_id" = m."id"
      where $1 in (c."user_id", c."receiver_id")
      group by c."user_id", c."receiver_id", m."text",  m."id", m."createdAt", m."seen"
      order by c."receiver_id", c."user_id"
      ) conv
      order by pair, conv."createdAt" DESC
      `,
      [req.session.userId]
    );
    return result;
  }

  @Authorized()
  @Query(() => [UnReadMressagesResponse])
  async getUnreadMessagesCount(@Ctx() { req }: Context) {
    const result = await getConnection().query(
      `
      select m."user_id", count(m."id")
      from message m
      inner join conversation c ON c."message_id" = m."id"
      where c."receiver_id" = $1
      and m."seen"  = false
      group by m."user_id"
      `,
      [req.session.userId]
    );

    return result;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async seenMessages(
    @Arg('user_id') user_id: string,
    @Arg('lastMessageDate') lastMessageDate: string,
    @Ctx() { req }: Context
  ) {
    const messageDate = new Date(+lastMessageDate + 1000 * 60);
    await getConnection().query(
      `
      update message m
      set seen = true
      from conversation c
      where m."createdAt" <= $3 AND (m."id",c."receiver_id",c."user_id") = (c."message_id",$1,$2)
      `,
      [req.session.userId, user_id, messageDate]
    );
    return true;
  }

  @Subscription(() => InboxResult, {
    topics: 'READ_MESSAGE',
    filter: ({
      payload,
      context,
    }: {
      payload: MessagesPayload;
      context: { req: Request };
    }) => {
      const { conversation } = payload;
      const { userId } = context.req.session;
      if (
        conversation.user_id === userId ||
        conversation.receiver_id === userId
      )
        return true;
      return false;
    },
  })
  async messages(@Root() payload: MessagesPayload): Promise<InboxResult> {
    const time = dayjs(payload.message.createdAt)
      .minute(0)
      .second(0)
      .millisecond(0)
      .format();
    return {
      ...payload.message,
      receiver_id: payload.conversation.receiver_id,
      time: new Date(time),
    };
  }

  @Subscription(() => UnReadMressagesResponse, {
    topics: 'UNREAD_MESSAGES',
    filter: ({
      payload,
      context,
    }: {
      payload: Conversation;
      context: { req: Request };
    }) => {
      if (context.req.session.userId === payload.receiver_id) {
        return true;
      }
      return false;
    },
  })
  async unReadMessages(@Root() payload: Conversation) {
    return {
      user_id: payload.user_id,
      count: 1,
    };
  }
}

export default MessageResolver;
