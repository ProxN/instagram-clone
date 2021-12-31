import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../../types/context';
import { UserResponse } from '../shared/user.response';
import * as userErrors from './user.errors';
import { UpdateUserInput } from './inputs/updateUser.input';
import User from './user.entity';
import { UpdatePassResponse } from './response/updatePass.response';

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
}

export default UserResolver;
