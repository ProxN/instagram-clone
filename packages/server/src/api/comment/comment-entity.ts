import { Field, ObjectType } from 'type-graphql';
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
import Post from '../post/post-entity';
import User from '../user/user-entity';

@ObjectType()
@Entity()
class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  user_id!: string;

  @Field()
  @Column()
  post_id!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}

export default Comment;
