const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Level = require('./enums/level');
const Subject = require('./enums/subject');

const Student = sequelize.define('Student', {
  fullName: { type: DataTypes.STRING, allowNull: false },
  level: { type: DataTypes.ENUM(...Object.values(Level)), allowNull: false },
  subjects: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
});

module.exports = Student;
