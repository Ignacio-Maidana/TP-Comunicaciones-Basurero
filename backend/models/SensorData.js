const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SensorData = sequelize.define('SensorData', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sensorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  distancia: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = SensorData;