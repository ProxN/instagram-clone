import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../types/context';
import { FollowResponse } from '../../types/follow';
import Follow from './follow-entity';
import * as followErrors from './follow-errors';

@Resolver(Follow)
class FollowResolver {
  @Authorized()
  @Mutation(() => FollowResponse)
  async follow(
    @Arg('follower_id') follower_id: string,
    @Ctx() { req }: Context
  ): Promise<FollowResponse> {
    if (follower_id === req.session.userId) {
      return { error: followErrors.followYourSelf };
    }
    if (!follower_id) {
      return { error: followErrors.followerIdRequired };
    }
    let followed = false;
    try {
      const res = await Follow.create({
        user_id: req.session.userId,
        follower_id,
      }).save();

      followed = !!res;
    } catch (error) {
      return {
        error: {
          field: 'follow',
          message: 'Something went worng. Please try again!',
        },
      };
    }
    return { result: followed };
  }

  @Authorized()
  @Mutation(() => FollowResponse)
  async unFollow(
    @Arg('follower_id') follower_id: string,
    @Ctx() { req }: Context
  ): Promise<FollowResponse> {
    if (follower_id === req.session.userId) {
      return { error: followErrors.followYourSelf };
    }

    if (!follower_id) {
      return { error: followErrors.followerIdRequired };
    }

    const res = await Follow.delete({
      user_id: req.session.userId,
      follower_id,
    });

    return { result: res.affected === 1 };
  }
}

export default FollowResolver;
