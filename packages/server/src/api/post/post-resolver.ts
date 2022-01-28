import { GraphQLUpload } from 'graphql-upload';
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Upload, uploadFile } from '../../lib/upload';
import { Context } from '../../types/context';
import {
  AddPostInput,
  AddPostResponse,
  DeletePostResponse,
  PostsResponse,
} from '../../types/post';
import Bookmark from '../bookmark/bookmark-entity';
import Like from '../like/like-entity';
import User from '../user/user-entity';
import Post from './post-entity';
import * as PostErrors from './post-error';

@Resolver(Post)
class PostResolver {
  @FieldResolver(() => User)
  async user(@Root() post: Post) {
    return User.findOne(post.user_id);
  }

  @FieldResolver(() => Boolean, { nullable: true })
  async has_bookmark(@Root() post: Post, @Ctx() { req }: Context) {
    const result = await Bookmark.findOne({
      where: { user_id: req.session.userId, post_id: post.id },
    });

    return !!result;
  }

  @Authorized()
  @FieldResolver(() => Boolean)
  async is_liked(@Root() post: Post, @Ctx() { req }: Context) {
    const result = await Like.findOne({
      where: { user_id: req.session.userId, post_id: post.id },
    });
    return !!result;
  }

  @FieldResolver(() => Number)
  async likes(@Root() post: Post, @Ctx() { likesLoader }: Context) {
    const result = await likesLoader.load(post.id);
    return result ? result.likes : 0;
  }

  @FieldResolver(() => Number)
  async comments(@Root() post: Post, @Ctx() { commentsLoader }: Context) {
    const result = await commentsLoader.load(post.id);
    return result ? result.comments : 0;
  }

  @Authorized()
  @Mutation(() => AddPostResponse)
  async addPost(
    @Arg('file', () => GraphQLUpload) file: Upload,
    @Arg('data') data: AddPostInput,
    @Ctx() { req }: Context
  ): Promise<AddPostResponse> {
    if (!file) {
      return { error: PostErrors.FileIsRequired };
    }

    let post;
    try {
      const { caption } = data;
      const res = await uploadFile(file, 'posts');
      post = await Post.create({
        user_id: req.session.userId,
        post_url: res.secure_url,
        caption,
      }).save();
    } catch (error) {
      return {
        error: {
          field: 'post',
          message: 'Something went worng. Please try again!',
        },
      };
    }

    return { post };
  }

  @Query(() => PostsResponse)
  async getPosts(
    @Arg('user_id') user_id: string,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Arg('limit', () => Int) limit: number
  ): Promise<PostsResponse> {
    if (!user_id) return { posts: [], hasMore: false };

    const postsLimit = Math.min(30, limit);
    const realLimit = postsLimit + 1;
    const args: any[] = [user_id, realLimit];

    if (cursor) {
      args.push(new Date(+cursor));
    }

    const result = await getConnection().query(
      `
      select p.* 
      from post p
      where p."user_id" = $1
      ${cursor ? `AND p."createdAt" < $3` : ''}
      order by p."createdAt" DESC
      limit $2
      `,
      args
    );
    return {
      posts: result.slice(0, postsLimit),
      hasMore: result.length === realLimit,
    };
  }

  @Authorized()
  @Query(() => Post, { nullable: true })
  async getPost(@Arg('post_id') post_id: string) {
    const post = await Post.findOne(post_id);
    return post;
  }

  @Authorized()
  @Mutation(() => DeletePostResponse)
  async deletePost(@Arg('post_id') post_id: string, @Ctx() { req }: Context) {
    if (!post_id) {
      return { error: PostErrors.PostIdRequired };
    }

    const result = await Post.delete({
      user_id: req.session.userId,
      id: post_id,
    });

    if (result.affected === 0)
      return {
        error: {
          field: 'deletePost',
          message: 'Something went worng! Please try again.',
        },
      };

    return { deleted: result.affected === 1 };
  }

  @Authorized()
  @Query(() => PostsResponse)
  async userFeeds(
    @Ctx() { req }: Context,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Arg('limit', () => Int) limit: number
  ) {
    const postsLimit = Math.min(30, limit);
    const realLimit = postsLimit + 1;
    const args: any[] = [req.session.userId, realLimit];

    if (cursor) {
      args.push(new Date(+cursor));
    }

    const result = await getConnection().query(
      `
      select DISTINCT p."id", p.* 
      from post p
      inner join public.user u ON u."id" = p."user_id"
      left join follow f ON f."follower_id" = p."user_id"
      where u."id" = $1 OR f."user_id" = $1
      ${cursor ? `AND p."createdAt" < $3` : ''}
      order by p."createdAt" DESC
      limit $2
      `,
      args
    );
    return {
      posts: result.slice(0, postsLimit),
      hasMore: result.length === realLimit,
    };
  }
}

export default PostResolver;
