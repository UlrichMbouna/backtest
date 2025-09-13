const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Availability = sequelize.define('Availability', {
  dayOfWeek: { type: DataTypes.STRING, allowNull: false },
  startTime: { type: DataTypes.TIME, allowNull: false },
  endTime: { type: DataTypes.TIME, allowNull: false },
  ownerType: { type: DataTypes.STRING, allowNull: false }, // "TUTOR" ou "STUDENT"
  ownerId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Availability;
