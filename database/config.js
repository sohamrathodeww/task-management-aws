require('dotenv').config();

const base = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME,
  dialect: 'mysql',
};

module.exports = {
  development: base,
  test: base,
  production: base,
};