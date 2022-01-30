import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Post from '../post/post-entity';
import Follow from '../follow/follow-entity';
import Comment from '../comment/comment-entity';
import Message from '../message/message-entity';

@ObjectType()
@Entity({ schema: 'public', name: 'User' })
class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field()
  @Column({ default: false })
  has_avatar?: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  website?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  bio?: string;

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @OneToMany(() => Follow, (follower) => follower.user)
  followers!: Follow[];

  @OneToMany(() => Follow, (following) => following.follower)
  following!: Follow[];

  @OneToMany(() => Comment, (comment) => comment.user_id)
  comments!: Comment[];

  @OneToMany(() => Message, (message) => message.user_id)
  messages!: Message[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePassword(hashPass: string, password: string) {
    return await bcrypt.compare(password, hashPass);
  }

  generateResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    return { resetToken, hashedToken };
  }
}

export default User;
