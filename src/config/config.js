require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'casaos',
    password: process.env.DB_PASSWORD || 'casaos',
    database: process.env.DB_NAME || 'school_absent',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: process.env.DB_USER || 'casaos',
    password: process.env.DB_PASSWORD || 'casaos',
    database: process.env.DB_NAME || 'school_absent_test',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: process.env.DB_USER || 'casaos',
    password: process.env.DB_PASSWORD || 'casaos',
    database: process.env.DB_NAME || 'school_absent',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
