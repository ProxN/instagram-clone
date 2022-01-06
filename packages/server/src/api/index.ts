import userEntity from './user/user-entity';
import postEntity from './post/post-entity';
import followEntity from './follow/follow-entity';
import authResolver from './auth/auth-resolver';
import userResolver from './user/user-resolver';
import postResolver from './post/post-resolver';
import followResolver from './follow/follow-resolver';

export const entities = [userEntity, postEntity, followEntity];
export const resolvers = [
  authResolver,
  userResolver,
  postResolver,
  followResolver,
] as const;
