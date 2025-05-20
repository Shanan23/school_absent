const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  class: {
    type: DataTypes.STRING,
    defaultValue: 'XI Pemasaran'
  },
  waliKelas: {
    type: DataTypes.STRING,
    defaultValue: 'Aghi Sofia Jati, S.I.Kom'
  }
});

module.exports = Student; 