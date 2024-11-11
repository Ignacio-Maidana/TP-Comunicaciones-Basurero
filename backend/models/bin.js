const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bin = sequelize.define('Bin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sensorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    distancia: {
        type: DataTypes.FLOAT,
        allowNull: false,  
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: true,  
    }
}, {
    tableName: 'basureros',
    timestamps: false,
});

module.exports = Bin;