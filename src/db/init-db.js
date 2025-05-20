const sequelize = require('../config/database');
const { Student, Attendance } = require('../models');

async function initDb() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

initDb();
