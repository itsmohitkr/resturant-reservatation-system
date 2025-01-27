/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL_DEVELOPMENT = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_TEST = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_PREVIEW = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_PRODUCTION = "postgresql://postgres@localhost/postgres",
  USER_NAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DEBUG,
} = process.env;

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
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      host: DATABASE_URL_TEST,
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
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      host: DATABASE_URL_PREVIEW,
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
    connection: DATABASE_URL_PRODUCTION,

    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: false,
  },
};
