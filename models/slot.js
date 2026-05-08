
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const Slot = sequelize.define('slot', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    time: { type: DataTypes.STRING, allowNull: false },
    available: { type: DataTypes.INTEGER, defaultValue: 4 } //
});

module.exports = Slot;