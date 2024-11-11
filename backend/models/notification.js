const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  contenido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idBasurero: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Basurero', 
      key: 'id'
    }
  },
  fecha: {
    type: DataTypes.DATE, 
    allowNull: false,
    defaultValue: DataTypes.NOW 
  }
});

Notification.associate = function(models) {
    Notification.belongsTo(models.Basurero, { foreignKey: 'idBasurero' });
};

module.exports = Notification;                          