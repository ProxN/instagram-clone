import 'reflect-metadata';
import { config } from 'dotenv';
config({ path: './config.env' });

import express from 'express';
import session from 'express-session';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { PubSub } from 'graphql-subscriptions';

import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import { graphqlUploadExpress } from 'graphql-upload';
import cookieParser from 'cookie-parser';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import cors from 'cors';
import helmet from 'helmet';
import depthLimit from 'graphql-depth-limit';
import connection from './conn';
import { resolvers } from './api';
import authChecker from './lib/authChecker';
import { logger } from './lib/logger';
import {
  CORS_ORIGIN,
  PORT,
  IS_PROD,
  SESSION_SECRET,
  SENTRY_DSN,
} from './lib/config';
import { createHasFollowedLoader } from './lib/loaders/createHasFollowedLoader';
import { createUserLoader } from './lib/loaders/createUserLoader';
import { createLikesLoader } from './lib/loaders/createLikesLoader';
import { createCommentsLoader } from './lib/loaders/createCommentsLoader';

logger.info('Starting Application');

const Main = async () => {
  await connection();
  const app = express();

  if (IS_PROD) {
    Sentry.init({
      dsn: SENTRY_DSN,
      integrations: [new Tracing.Integrations.Express({ app })],
      tracesSampleRate: 1.0,
    });
  }

  const RedisStore = connectRedis(session);
  const redis = new Redis('127.0.0.1:6379');
  const pubSub = new PubSub();
  const httpServer = createServer(app);

  app.set('trust proxy', 1);
  app.use(helmet({ contentSecurityPolicy: IS_PROD ? undefined : false }));
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  app.use(
    cors({
      origin: [CORS_ORIGIN, 'http://localhost:3000'],
      credentials: true,
    })
  );
  app.use(cookieParser());

  const sessionMiddleware = session({
    store: new RedisStore({
      client: redis,
      disableTouch: true,
    }),
    name: 'sid',
    secret: SESSION_SECRET || 'secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: IS_PROD,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    },
  });

  app.use(sessionMiddleware);

  const schema = await buildSchema({
    resolvers,
    validate: false,
    authChecker,
    pubSub,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      pubSub,
      followLoader: createHasFollowedLoader(),
      userLoader: createUserLoader(),
      likesLoader: createLikesLoader(),
      commentsLoader: createCommentsLoader(),
    }),
    validationRules: [depthLimit(6)],
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: async (connectionParams: Record<string, unknown>, ws: any) => {
        return new Promise((resolve) => {
          sessionMiddleware(ws.upgradeReq, {} as any, () => {
            resolve({ req: ws.upgradeReq, userLoader: createUserLoader() });
          });
        });
      },
    },
    { server: httpServer, path: apolloServer.graphqlPath }
  );

  app.get(
    '/graphql',
    expressPlayground({
      endpoint: '/graphql',
      subscriptionEndpoint: `/graphql`,
    })
  );

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  httpServer.listen(PORT, () =>
    logger.info(`> Ready on http://localhost:${PORT}`)
  );
};

Main();
