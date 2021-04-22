const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`);

const Right = sequelize.define('Right', {
  id: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  role: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  }
}, {tableName: 'rightos', timestamps: false, underscored: true});

module.exports = Right;