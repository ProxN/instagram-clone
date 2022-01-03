import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import * as Sentry from '@sentry/node';
import { checkEmpty, isEmail } from '../../lib/helpers';
import { WEB_URL } from '../../lib/config';
import { Mailer } from '../../lib/mailer';
import { Context } from '../../types/context';
import User from '../user/user-entity';
import { UserResponse, FieldError } from '../../types/shared';
import {
  SignupInputs,
  LoginInputs,
  ForgotPassResponse,
} from '../../types/auth';
import * as authErrors from './auth-errors';

const validateAuth = (email: string, password: string) => {
  if (!isEmail(email)) {
    return authErrors.ValidEmail;
  }

  if (password.length < 8) {
    return authErrors.PasswordLength;
  }
};

@Resolver()
class AuthResolver {
  @Mutation(() => UserResponse)
  async signup(
    @Arg('data') data: SignupInputs,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    let error: FieldError = checkEmpty(data);
    if (error.message) {
      return { error };
    }

    error = validateAuth(data.email, data.password) as FieldError;
    if (error) {
      return { error };
    }

    let user;
    try {
      const { email, password, name, username } = data;
      user = await User.create({
        email,
        password,
        username,
        name,
      }).save();

      req.session.userId = user.id;
    } catch (err: any) {
      if (err.code === '23505') {
        if (err.detail.includes('email')) {
          return { error: authErrors.EmailAlreadyExists };
        } else if (err.detail.includes('username')) {
          return { error: authErrors.UsernameAlreadyExists };
        }
      }
    }
    return { user };
  }

  @Mutation(() => UserResponse)
  async signin(
    @Arg('data') data: LoginInputs,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    let error: FieldError = checkEmpty(data);

    if (error.message) {
      return { error };
    }

    error = validateAuth(data.email, data.password) as FieldError;

    if (error) {
      return { error };
    }

    const user = await User.findOne({ where: { email: data.email } });

    if (!user || !(await user.comparePassword(user.password, data.password))) {
      return { error: authErrors.IncorrectEmailOrPassword };
    }

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => ForgotPassResponse)
  async forgotPassword(@Arg('email') email: string, @Ctx() { redis }: Context) {
    if (!isEmail(email)) {
      return { error: authErrors.ValidEmail };
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { error: authErrors.EmailNotExists };
    }

    const { resetToken } = user.generateResetToken();
    await redis.set(resetToken, user.id, 'px', 1000 * 60 * 10); // 10min
    const resetURL = `${WEB_URL}/reset_password/${resetToken}`;

    try {
      await new Mailer({
        name: user.name || '',
        url: resetURL,
        to: user.email,
      }).sendResetPassword();
    } catch (err) {
      Sentry.captureException(err);
    }

    return { emailSent: true };
  }

  @Mutation(() => UserResponse)
  async resetPassword(
    @Arg('resetToken') resetToken: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: Context
  ) {
    if (newPassword.length < 8) {
      return { error: authErrors.PasswordLength };
    }
    const userId = await redis.get(resetToken);
    if (!userId) {
      return { error: authErrors.InvalidToken };
    }

    const user = await User.findOne(userId);
    if (!user) {
      return { error: authErrors.UserNotExists };
    }

    user.password = newPassword;
    await user.save();
    await redis.del(resetToken);

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res, req }: Context) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie('sid');
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }
}

export default AuthResolver;
