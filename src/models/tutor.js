const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Level = require('./enums/level');
const Subject = require('./enums/subject');

const Tutor = sequelize.define('Tutor', {
  fullName: { type: DataTypes.STRING, allowNull: false },
  experienceYears: { type: DataTypes.INTEGER, allowNull: false },
  subjects: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  levels: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
});

module.exports = Tutor;
