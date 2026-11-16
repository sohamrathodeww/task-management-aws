import fs from 'fs';
import { Sequelize } from 'sequelize';
import { env } from './env';

const dialectOptions: Record<string, unknown> = {
  connectTimeout: 10000,
};

if (env.db.ssl) {
  dialectOptions.ssl = {
    ca: fs.readFileSync(env.db.sslCa, 'utf8'),
    rejectUnauthorized: true,
  };
}

export const sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
  host: env.db.host,
  port: env.db.port,
  dialect: 'mysql',
  logging: false,
  dialectOptions,
  pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
});