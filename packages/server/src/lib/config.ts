export const {
  NODE_ENV = 'development',
  PORT = 5000,
  CORS_ORIGIN = 'http://localhost:3000',
  DB_HOST = 'localhost',
  DB_NAME = 'test',
  DB_USER = 'postgres',
  DB_NAME_TEST = 'test-test',
  SESSION_SECRET = 'secret',
  DB_PASS = 'postgres',
  WEB_URL = 'http://localhost:3000',
  SENTRY_DSN = 'SENTRY_DSN',
  SENDGRID_API_KEY = 'SENDGRID_KEY',
  MAIL_FROM = 'info@info.com',
} = process.env;

export const IS_PROD = NODE_ENV === 'production';

export const EMAIL_OPTIONS = {
  port: 587,
  host: process.env.MAIL_HOST,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};
