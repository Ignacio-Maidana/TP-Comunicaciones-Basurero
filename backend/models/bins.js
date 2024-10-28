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
        allowNull: true,  // Optional field
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: true,  // Optional field
    },
    kg_estimados: {
        type: DataTypes.FLOAT,
        allowNull: true,  // Optional field
    },
    basura_recolectada: {
        type: DataTypes.FLOAT,
        allowNull: true,  // Optional field
    },
}, {
    tableName: 'basureros',  // Ensure this matches your actual table name
    timestamps: true,         // Optional: Add timestamps if needed (createdAt, updatedAt)
});

// Add this part at the end of the file
const BinHistory = require('./BinHistory');

Bin.hasMany(BinHistory, { foreignKey: 'binId' });
BinHistory.belongsTo(Bin, { foreignKey: 'binId' });

module.exports = Bin;