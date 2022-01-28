import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { GraphQLUpload } from 'graphql-upload';
import { deleteFile, Upload, uploadFile } from '../../lib/upload';
import { Context } from '../../types/context';
import * as userErrors from './user-errors';
import User from './user-entity';
import {
  UpdatePassResponse,
  UpdateUserInput,
  StatsResponse,
} from '../../types/user';
import { UserResponse } from '../../types/shared';
import Post from '../post/post-entity';

@Resolver(User)
class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: Context) {
    if (req.session.userId !== user.id) return null;
    return user.email;
  }

  @FieldResolver(() => [Post])
  async posts(@Root() user: User) {
    const posts = await Post.find({ where: { user_id: user.id } });
    return posts;
  }

  @FieldResolver(() => StatsResponse)
  async stats(@Root() user: User) {
    const result = await getConnection().query(
      `
      select count(f1."follower_id") as followers,
      (select count(f2."user_id")
        from follow f2
        where f2."user_id" = $1
      ) as following,
      (select count(id) as posts from post p where p."user_id" = $1)
      from follow f1
      where f1."follower_id" = $1
      `,
      [user.id]
    );
    return {
      followers: +result[0].followers,
      following: +result[0].following,
      posts: +result[0].posts,
    };
  }

  @FieldResolver(() => Boolean, { nullable: true })
  async has_followed(
    @Root() user: User,
    @Ctx() { req, followLoader }: Context
  ) {
    if (!req.session.userId) return null;
    const result = await followLoader.load({
      user_id: req.session.userId as string,
      follower_id: user.id,
    });

    return !!result;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context) {
    if (req.session.userId) {
      return User.findOne(req.session.userId);
    }
    return null;
  }

  @Authorized()
  @Mutation(() => UserResponse)
  async updateProfile(
    @Arg('newUser') newUser: UpdateUserInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const hasUsername = Object.prototype.hasOwnProperty.call(
      newUser,
      'username'
    );
    if (hasUsername && newUser.username?.length === 0) {
      return { error: userErrors.usernameRequired };
    }
    let updatedUser;

    try {
      await User.update({ id: req.session.userId }, newUser);

      updatedUser = await User.findOne(req.session.userId);
    } catch (error: any) {
      if (error.code === '23505') {
        return { error: userErrors.usernameAlreadyExists };
      }
    }

    return { user: updatedUser };
  }

  @Authorized()
  @Mutation(() => UpdatePassResponse)
  async updatePassword(
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { req }: Context
  ) {
    if (!oldPassword) {
      return { error: userErrors.oldPasswordRequired };
    }
    if (!newPassword) {
      return { error: userErrors.newPasswordRequired };
    }

    const user = await User.findOne(req.session.userId);

    if (!user || !(await user.comparePassword(user.password, oldPassword))) {
      return { error: userErrors.oldPasswordIncorrect };
    }

    user.password = newPassword;
    await user?.save();

    return { updated: true };
  }

  @Authorized()
  @Mutation(() => UserResponse)
  async updateAvatar(
    @Arg('file', () => GraphQLUpload) file: Upload,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    let updatedUser;
    try {
      const res = await uploadFile(file, 'avatar');

      const user = await User.findOne({ where: { id: req.session.userId } });
      if (user && user.has_avatar && user.avatar) {
        const splitUrl = user.avatar.split('/');
        const public_id = splitUrl[splitUrl.length - 1].split('.')[0];
        await deleteFile(`avatar/${public_id}`);
      }
      const result = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
          avatar: res.secure_url,
          has_avatar: true,
        })
        .where('id = :userId', { userId: req.session.userId })
        .returning('*')
        .execute();

      updatedUser = result.raw[0];
    } catch (error) {
      return {
        error: {
          field: 'avatar',
          message: 'Something went worng! Please Try again.',
        },
      };
    }
    return { user: updatedUser };
  }

  @Query(() => User, { nullable: true })
  async getUserProfile(@Arg('username') username: string) {
    if (!username) return;
    const user = await User.findOne({ where: { username } });
    return user;
  }

  @Authorized()
  @Query(() => [User], { nullable: true })
  async searchUsers(@Arg('query') query: string) {
    if (!query) return [];
    const users = await getConnection()
      .getRepository(User)
      .createQueryBuilder('u')
      .select()
      .where(`u."username" like :query`, { query: `%${query}%` })
      .orWhere(`u."name" like :query`, { query: `%${query}%` })
      .limit(10)
      .getMany();

    return users;
  }
}

export default UserResolver;
