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
import { NewCommentInput } from '../../types/comment/comment-input';
import {
  CommentsResponse,
  NewCommentResponse,
} from '../../types/comment/comment-response';
import { Context } from '../../types/context';
import User from '../user/user-entity';
import Comment from './comment-entity';
import * as commentErrors from './comment-error';

@Resolver(Comment)
class CommentResolver {
  @FieldResolver(() => User)
  async user(@Root() comment: Comment, @Ctx() { userLoader }: Context) {
    return await userLoader.load(comment.user_id);
  }

  @Authorized()
  @Mutation(() => NewCommentResponse)
  async newComment(
    @Arg('comment_body') comment_body: NewCommentInput,
    @Ctx() { req }: Context
  ): Promise<NewCommentResponse> {
    const { post_id, text } = comment_body;
    if (!post_id) {
      return { error: commentErrors.PostIdRequired };
    }

    if (!text) {
      return { error: commentErrors.PostIdRequired };
    }

    let comment;

    try {
      comment = await Comment.create({
        text,
        post_id,
        user_id: req.session.userId,
      }).save();
    } catch (error) {
      return {
        error: {
          field: 'comment',
          message: 'Something went worng!! Please try again.',
        },
      };
    }

    return { comment };
  }

  @Authorized()
  @Query(() => CommentsResponse)
  async getComments(
    @Arg('post_id') post_id: string,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Arg('limit', () => Int) limit: number
  ): Promise<CommentsResponse> {
    if (!post_id) return { comments: [], hasMore: false };

    const commentsLimit = Math.min(30, limit);
    const realLimit = commentsLimit + 1;
    const args: any[] = [post_id, realLimit];

    if (cursor) {
      args.push(new Date(+cursor));
    }
    const result = await getConnection().query(
      `
        select c.* 
        from comment c
        where c."post_id" = $1
        ${cursor ? `AND c."createdAt" < $3` : ''}
        order by c."createdAt" DESC
        limit $2
        `,
      args
    );

    return {
      comments: result.slice(0, commentsLimit),
      hasMore: result.length === realLimit,
    };
  }
}

export default CommentResolver;
