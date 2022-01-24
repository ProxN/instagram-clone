import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../user/user-entity';

@ObjectType()
@Entity()
class Message extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  user_id!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ default: false })
  seen?: boolean;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}

export default Message;
