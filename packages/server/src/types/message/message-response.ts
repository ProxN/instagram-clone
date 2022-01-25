import { Field, ObjectType } from 'type-graphql';
import Message from '../../api/message/message-entity';
import User from '../../api/user/user-entity';
import { ErrorResponse } from '../shared';

@ObjectType()
export class SendMessageResponse extends ErrorResponse {
  @Field(() => Message, { nullable: true })
  message?: Message;
}

@ObjectType()
export class InboxResult {
  @Field()
  id!: string;

  @Field(() => String, { nullable: true })
  time?: Date;

  @Field()
  user_id!: string;

  @Field(() => User, { nullable: true })
  user!: User;

  @Field(() => Boolean, { nullable: true })
  seen?: boolean;

  @Field()
  receiver_id!: string;

  @Field()
  text!: string;

  @Field(() => String)
  createdAt!: Date;
}

@ObjectType()
export class MessageResponse {
  @Field(() => [InboxResult])
  messages!: InboxResult[];

  @Field()
  hasMore!: boolean;
}

@ObjectType()
export class UnReadMressagesResponse {
  @Field()
  user_id!: string;

  @Field()
  count!: number;
}
