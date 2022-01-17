import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Post from '../post/post-entity';
import User from '../user/user-entity';

@ObjectType()
@Entity()
class Like extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  user_id!: string;

  @Field(() => ID)
  @PrimaryColumn()
  post_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  //   @Field(() => String)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  //   @Field(() => String)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}

export default Like;
