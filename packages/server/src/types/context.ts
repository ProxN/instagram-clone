import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { createHasFollowedLoader } from '../lib/loaders/createHasFollowedLoader';
import { createUserLoader } from '../lib/loaders/createUserLoader';

export type Context = {
  req: Request;
  res: Response;
  redis: Redis;
  followLoader: ReturnType<typeof createHasFollowedLoader>;
  userLoader: ReturnType<typeof createUserLoader>;
};
