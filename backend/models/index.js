// models/index.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

sequelize.authenticate().then(() => {
  console.log('Conexión establecida con éxito.');
}).catch(err => {
  console.error('No se pudo conectar a la base de datos:', err);
});

const Bin = sequelize.define('Bin', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sensorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true // Asegura que sensorId sea único
  },
  distanciaPromedio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  porcentajeLlenado: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = { sequelize, Bin };
