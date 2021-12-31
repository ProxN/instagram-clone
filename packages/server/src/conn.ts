import { createConnection } from 'typeorm';
import path from 'path';
import * as Sentry from '@sentry/node';
import { entities } from './api';
import { DB_HOST, DB_NAME, DB_PASS, DB_USER, IS_PROD } from './lib/config';
import { logger } from './lib/logger';

const connectDB = async () => {
  await createConnection({
    type: 'postgres',
    entities,
    logging: !IS_PROD,
    synchronize: true,
    port: 5432,
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    migrations: [path.join(__dirname, './migrations/*.ts')],
  })
    .then(() => logger.info('DB CONNECTED SUCCESSFULY'))
    .catch((err) => Sentry.captureException(err));
};

export default connectDB;
