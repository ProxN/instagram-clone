import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Context } from '../../types/context';
import Post from '../post/post-entity';
import Bookmark from './bookmark-entity';

@Resolver(Bookmark)
class BookmarkResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async bookmarkPost(@Arg('post_id') post_id: string, @Ctx() { req }: Context) {
    if (!post_id) return false;
    const bookmark = await Bookmark.create({
      post_id: post_id,
      user_id: req.session.userId,
    }).save();

    if (bookmark) return true;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unBookmarkPost(
    @Arg('post_id') post_id: string,
    @Ctx() { req }: Context
  ) {
    if (!post_id) return false;

    const result = await Bookmark.delete({
      post_id,
      user_id: req.session.userId,
    });

    return result.affected === 1;
  }

  @Authorized()
  @Query(() => [Post])
  async getSavedPosts(@Ctx() { req }: Context) {
    const result = await getConnection().query(
      `
      select p.* 
      from bookmark b
      inner join post p on p."id" = b."post_id"
      where b."user_id" = $1
      order by b."createdAt" DESC
      `,
      [req.session.userId]
    );
    return result;
  }
}

export default BookmarkResolver;
