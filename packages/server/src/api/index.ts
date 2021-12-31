import userEntity from './user/user.entity';
import authResolver from './auth/auth.resolver';
import userResolver from './user/user.resolver';

export const entities = [userEntity];
export const resolvers = [authResolver, userResolver] as const;
