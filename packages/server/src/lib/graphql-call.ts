import { graphql } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { buildSchema } from 'type-graphql';
import { RedisMock } from './test-connection';
import { resolvers } from '../api';
import authChecker from './authChecker';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: string;
}

const graphqlCall = async ({ source, variableValues, userId }: Options) => {
  return graphql({
    schema: await buildSchema({
      resolvers,
      validate: false,
      authChecker,
    }),
    source,
    variableValues,
    contextValue: {
      redis: RedisMock,
      req: {
        session: {
          userId,
        },
      },
      res: {},
    },
  });
};

export default graphqlCall;
