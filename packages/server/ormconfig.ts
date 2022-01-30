import { config } from 'dotenv';
config({ path: './config.env' });

export default {
  type: 'postgres',
  port: 5432,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: ['./src/api/**/*-entity{.ts,.js}'],
  migrations: ['./src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
