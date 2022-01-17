import DataLoader from 'dataloader';
import { getConnection } from 'typeorm';
import Like from '../../api/like/like-entity';

export const createLikesLoader = () =>
  new DataLoader<string, { post_id: string; likes: number }>(async (keys) => {
    const likes = await getConnection()
      .getRepository(Like)
      .createQueryBuilder('like')
      .select('like.post_id as post_id')
      .addSelect('COUNT(like.post_id) as likes')
      .where(`like.post_id IN (:...ids)`, { ids: keys as string[] })
      .groupBy('like.post_id')
      .getRawMany();

    const postIdToLike: Record<string, { post_id: string; likes: number }> = {};

    likes.forEach((el) => {
      postIdToLike[el.post_id] = el;
    });

    return keys.map((key) => postIdToLike[key]);
  });
