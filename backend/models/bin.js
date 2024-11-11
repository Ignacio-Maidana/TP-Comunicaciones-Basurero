const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bin = sequelize.define('Bin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    distancia: {
        type: DataTypes.FLOAT,
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