import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

// Here remove those variables that you will not use anymore when checking on localhost
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

export default {
  type: 'postgres',
  // To run the application from a non-Docker host, change the host value (POSTGRES_HOST) to 'localhost'.
  // Also replace POSTGRES_USER, POSTGRES_PASSWORD, etc. to your values.
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
  entities: [path.join(__dirname, '../**/*.entity.ts')],
  migrations: [path.join(__dirname, '../migrations/*.ts')],
  cli: {
    migrationsDir: 'migrations',
  },
} as ConnectionOptions;
