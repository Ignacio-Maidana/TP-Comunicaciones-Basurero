// backend/models/Bin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Bin model
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
    tableName: 'basureros',  // Ensure this matches your actual table name
    timestamps: false,         // Optional: Add timestamps if needed (createdAt, updatedAt)
});

module.exports = Bin;