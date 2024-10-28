const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BinHistory = sequelize.define('BinHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    binId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    kg_estimados: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    basura_recolectada: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'bin_history',
    timestamps: true,
});

module.exports = BinHistory;