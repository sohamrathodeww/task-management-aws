import 'dotenv/config';

function required(key: string): string {
  const value = process.env[key];
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const dbSsl = process.env.DB_SSL === 'true';

if (dbSsl && !process.env.DB_SSL_CA) {
  throw new Error('DB_SSL_CA (path to CA bundle file) is required when DB_SSL=true');
}

export const env = {
  port: Number(process.env.PORT ?? 3000),
  db: {
    host: required('DB_HOST'),
    port: Number(process.env.DB_PORT ?? 3306),
    user: required('DB_USER'),
    password: process.env.DB_PASSWORD ?? '',
    name: required('DB_NAME'),
    ssl: dbSsl,
    sslCa: process.env.DB_SSL_CA ?? '',
  },
};