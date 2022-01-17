import DataLoader from 'dataloader';
import { getConnection } from 'typeorm';
import Comment from '../../api/comment/comment-entity';

export const createCommentsLoader = () =>
  new DataLoader<string, { post_id: string; comments: number }>(
    async (keys) => {
      const likes = await getConnection()
        .getRepository(Comment)
        .createQueryBuilder('comment')
        .select('comment.post_id as post_id')
        .addSelect('COUNT(comment.post_id) as comments')
        .where(`comment.post_id IN (:...ids)`, { ids: keys as string[] })
        .groupBy('comment.post_id')
        .getRawMany();

      const postIdToComments: Record<
        string,
        { post_id: string; comments: number }
      > = {};

      likes.forEach((el) => {
        postIdToComments[el.post_id] = el;
      });

      return keys.map((key) => postIdToComments[key]);
    }
  );
