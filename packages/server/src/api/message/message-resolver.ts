import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { checkEmpty } from '../../lib/helpers';
import { Context } from '../../types/context';
import {
  InboxResult,
  MessageResponse,
  SendMessageResponse,
} from '../../types/message';
import Conversation from '../conversation/conversation-entity';
import User from '../user/user-entity';
import Message from './message-entity';

@ObjectType()
class TestingArgs {
  @Field(() => Conversation)
  conversation!: Conversation;
  @Field(() => Message)
  message!: Message;
}

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
      from ( select  c."user_id", c."receiver_id", m."text", m."id", m."createdAt"
      from message m
      inner join conversation c on c."message_id" = m."id"
      where $1 in (c."user_id", c."receiver_id")
      group by c."user_id", c."receiver_id", m."text",  m."id", m."createdAt"
      order by c."receiver_id", c."user_id"
      ) conv
      order by pair, conv."createdAt" DESC
      `,
      [req.session.userId]
    );
    return result;
  }

  @Subscription(() => Message, {
    topics: 'READ_MESSAGE',
    filter: ({
      payload,
      context,
    }: {
      payload: TestingArgs;
      context: { userId: string };
    }) => {
      const { conversation } = payload;
      const { userId } = context;
      if (
        conversation.receiver_id === userId ||
        conversation.user_id === userId
      )
        return true;
      return false;
    },
  })
  async messages(@Root() payload: TestingArgs) {
    return payload.message;
  }
}

export default MessageResolver;
