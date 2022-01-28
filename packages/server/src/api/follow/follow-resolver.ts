import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Context } from '../../types/context';
import {
  FollowResponse,
  FollowSuggestionResponse,
  NofiticationResponse,
} from '../../types/follow';
import User from '../user/user-entity';
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

  @Authorized()
  @Query(() => [User], { nullable: true })
  async getUserFollowers(@Arg('user_id') user_id: string) {
    const followers = await getConnection().query(
      `
      select u.*
      from follow f
      inner join public.user u on u."id" = f."user_id"
      where f."follower_id" = $1
      `,
      [user_id]
    );

    return followers;
  }

  @Authorized()
  @Query(() => [User], { nullable: true })
  async getUserFollowing(@Arg('user_id') user_id: string) {
    const following = await getConnection().query(
      `
      select u.* 
      from follow f
      inner join public.user u on u."id" = f."follower_id"
      where f."user_id" = $1
      `,
      [user_id]
    );
    return following;
  }
  @Authorized()
  @Query(() => FollowSuggestionResponse)
  async followerSuggestion(
    @Arg('cursor', () => [String], { nullable: true }) cursor: string[],
    @Arg('limit', () => Int) limit: number,
    @Ctx() { req }: Context
  ) {
    const followersLimit = Math.min(30, limit);
    const realLimit = followersLimit + 1;
    const args: any[] = [req.session.userId, realLimit];

    if (cursor) {
      args.push(new Date(+cursor[0]));
      args.push(cursor[1]);
    }

    const result = await getConnection().query(
      `
      select u.*
      from public.user u
      where u."id" NOT IN (
        select f."follower_id" 
        from follow f
        where f."user_id" = $1
        )
      AND u."id" != $1
      ${cursor ? `AND (u."createdAt", u."id") < ($3,$4)` : ''}
      order by u."createdAt" DESC , u."id" DESC
      limit $2
      `,
      args
    );

    return {
      users: result.slice(0, followersLimit),
      hasMore: result.length === realLimit,
    };
  }

  @Authorized()
  @Query(() => [NofiticationResponse])
  async followersNotification(@Ctx() { req }: Context) {
    const result = await getConnection().query(
      `
      select u.*, f."createdAt" as since from follow f
      inner join public.user u on f."user_id" = u."id"
      where f."follower_id" = $1
      and date_trunc('month',f."createdAt") = date_trunc('month',NOW())
      order by f."createdAt" DESC
      limit 10
    `,
      [req.session.userId]
    );
    return result;
  }
}

export default FollowResolver;
