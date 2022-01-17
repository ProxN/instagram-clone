import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../types/context';
import Like from './like-entity';

@Resolver()
class LikeResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async likePost(@Arg('post_id') post_id: string, @Ctx() { req }: Context) {
    if (!post_id) return false;

    const alreadyLiked = await Like.findOne({
      where: { post_id, user_id: req.session.userId },
    });

    if (alreadyLiked) {
      await Like.delete({ user_id: req.session.userId, post_id });
      return false;
    }

    const like = await Like.create({
      post_id,
      user_id: req.session.userId,
    }).save();

    if (like) return true;
  }
}

export default LikeResolver;
