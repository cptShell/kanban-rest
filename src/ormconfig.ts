import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;
const LOCAL_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export default {
  type: 'postgres',
  cache: false,
  url: (process.env.DATABASE_URL as string) || LOCAL_URL,
  synchronize: false,
  logging: false,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  entities: ['src/resources/**/**.entity{.ts,.js}'],
  migrations: ['./migrations/*.ts'],
} as ConnectionOptions;
