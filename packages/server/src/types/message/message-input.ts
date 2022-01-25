import { Field, ObjectType } from 'type-graphql';
import { InboxResult } from '.';
import Conversation from '../../api/conversation/conversation-entity';
import Message from '../../api/message/message-entity';

@ObjectType()
export class MessagesPayload {
  @Field(() => Conversation)
  conversation!: Conversation;
  @Field(() => Message)
  message!: InboxResult;
}
