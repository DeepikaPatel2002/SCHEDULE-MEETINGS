
const Sequelize = require('sequelize');

const sequelize = new Sequelize('meeting_management', 'root', '987654', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;