import { config } from 'dotenv';
config({ path: './config.env' });

import { createConnection } from 'typeorm';
import * as IORedis from 'ioredis';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const IoRedisMock = require('ioredis-mock');
import path from 'path';
import { entities } from '../api';
import { DB_HOST, DB_USER, DB_PASS, DB_NAME_TEST } from './config';

const testConnection = (drop = false) => {
  return createConnection({
    type: 'postgres',
    entities,
    port: 5432,
    host: DB_HOST,
    database: DB_NAME_TEST,
    username: DB_USER,
    password: DB_PASS,
    synchronize: drop,
    dropSchema: drop,
    migrations: [path.join(__dirname, './migrations/*.ts')],
  });
};

export const RedisMock = new IoRedisMock() as IORedis.Redis;

export default testConnection;
