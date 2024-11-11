const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Ensure this path is correct
  logging: false // Optional: Disable logging
});

module.exports = sequelize;