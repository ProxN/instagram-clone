import DataLoader from 'dataloader';
import User from '../../api/user/user-entity';

export const createUserLoader = () =>
  new DataLoader<string, User>(async (keys) => {
    const users = await User.findByIds(keys as string[]);
    const userIdToUser: Record<string, User> = {};

    users.forEach((el) => {
      userIdToUser[el.id] = el;
    });

    return keys.map((key) => userIdToUser[key]);
  });
