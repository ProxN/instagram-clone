import userEntity from './user/user-entity';
import postEntity from './post/post-entity';
import followEntity from './follow/follow-entity';
import commentEntity from './comment/comment-entity';
import authResolver from './auth/auth-resolver';
import userResolver from './user/user-resolver';
import postResolver from './post/post-resolver';
import followResolver from './follow/follow-resolver';
import commentResolver from './comment/comment-resolver';

export const entities = [userEntity, postEntity, followEntity, commentEntity];
export const resolvers = [
  authResolver,
  userResolver,
  postResolver,
  followResolver,
  commentResolver,
] as const;
