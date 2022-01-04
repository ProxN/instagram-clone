import userEntity from './user/user-entity';
import PostEntity from './post/post-entity';
import authResolver from './auth/auth-resolver';
import userResolver from './user/user-resolver';
import postResolver from './post/post-resolver';

export const entities = [userEntity, PostEntity];
export const resolvers = [authResolver, userResolver, postResolver] as const;
