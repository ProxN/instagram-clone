import DataLoader from 'dataloader';
import Follow from '../../api/follow/follow-entity';

export const createHasFollowedLoader = () =>
  new DataLoader<{ user_id: string; follower_id: string }, boolean | null>(
    async (keys) => {
      const followers = await Follow.findByIds(keys as any);
      const followIdToFollowers: Record<string, boolean> = {};

      followers.forEach((follow) => {
        followIdToFollowers[`${follow.user_id}|${follow.follower_id}`] = true;
      });

      return keys.map(
        (key) => followIdToFollowers[`${key.user_id}|${key.follower_id}`]
      );
    }
  );
