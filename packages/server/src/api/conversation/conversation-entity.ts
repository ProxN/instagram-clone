import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import Message from '../message/message-entity';
import User from '../user/user-entity';

@ObjectType()
@Entity()
class Conversation extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  message_id!: string;

  @Field(() => ID)
  @PrimaryColumn()
  user_id!: string;

  @Field(() => ID)
  @PrimaryColumn()
  receiver_id!: string;

  @ManyToOne(() => Message)
  @JoinColumn({ name: 'message_id' })
  message!: Message;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiver_id' })
  receiver!: User;
}

export default Conversation;
