/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL_DEVELOPMENT,
  DATABASE_URL_PRODUCTION,
  USER_NAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DEBUG,
} = process.env;
console.log(DATABASE_URL_PRODUCTION);

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      host: DATABASE_URL_DEVELOPMENT,
      port: 5432,
      user: USER_NAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      ssl: {
        rejectUnauthorized: false, // Skip certificate validation
      },
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: false,
  },

  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      host: DATABASE_URL_PRODUCTION,
      port: 5432,
      user: USER_NAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      ssl: {
        rejectUnauthorized: false, // Skip certificate validation
      },
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: true,
  },
};
