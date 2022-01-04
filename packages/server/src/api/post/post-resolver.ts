import { GraphQLUpload } from 'graphql-upload';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Upload, uploadFile } from '../../lib/upload';
import { Context } from '../../types/context';
import { AddPostInput, AddPostResponse } from '../../types/post';
import Post from './post-entity';
import * as PostErrors from './post-error';

@Resolver()
class PostResolver {
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
}

export default PostResolver;
