import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { createCommentsLoader } from '../lib/loaders/createCommentsLoader';
import { createHasFollowedLoader } from '../lib/loaders/createHasFollowedLoader';
import { createLikesLoader } from '../lib/loaders/createLikesLoader';
import { createUserLoader } from '../lib/loaders/createUserLoader';

export type Context = {
  req: Request;
  res: Response;
  redis: Redis;
  followLoader: ReturnType<typeof createHasFollowedLoader>;
  userLoader: ReturnType<typeof createUserLoader>;
  likesLoader: ReturnType<typeof createLikesLoader>;
  commentsLoader: ReturnType<typeof createCommentsLoader>;
};
