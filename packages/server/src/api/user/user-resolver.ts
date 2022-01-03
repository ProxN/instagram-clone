import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { GraphQLUpload } from 'graphql-upload';
import { deleteFile, Upload, uploadFile } from '../../lib/upload';
import { Context } from '../../types/context';
import * as userErrors from './user-errors';
import User from './user-entity';
import { UpdatePassResponse, UpdateUserInput } from '../../types/user';
import { UserResponse } from '../../types/shared';

@Resolver()
class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context) {
    if (req.session.userId) {
      return User.findOne(req.session.userId);
    }
    return null;
  }

  @Authorized()
  @Mutation(() => UserResponse)
  async updateUser(
    @Arg('newUser') newUser: UpdateUserInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
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
      return { user: updatedUser };
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
}

export default UserResolver;
