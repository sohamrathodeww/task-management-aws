require('dotenv').config();
const fs = require('fs');

const ssl = process.env.DB_SSL === 'true';

if (ssl && !process.env.DB_SSL_CA) {
  throw new Error('DB_SSL_CA (path to CA bundle file) is required when DB_SSL=true');
}

const dialectOptions = { connectTimeout: 10000 };

if (ssl) {
  dialectOptions.ssl = {
    ca: fs.readFileSync(process.env.DB_SSL_CA, 'utf8'),
    rejectUnauthorized: true,
  };
}

const base = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME,
  dialect: 'mysql',
  dialectOptions,
};

module.exports = {
  development: base,
  test: base,
  production: base,
};