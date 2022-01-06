import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import User from '../user/user-entity';

@ObjectType()
@Entity()
class Follow extends BaseEntity {
  @Field()
  @PrimaryColumn()
  user_id!: string;

  @Field()
  @PrimaryColumn()
  follower_id!: string;

  @ManyToOne(() => User, (user) => user.followers, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => User, (user) => user.following, { primary: true })
  @JoinColumn({ name: 'follower_id' })
  follower?: User;
}

export default Follow;
