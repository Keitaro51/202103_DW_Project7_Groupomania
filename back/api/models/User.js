const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`);

const User = sequelize.define('User', {
  id: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
    autoIncrement:true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  firstname: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  department: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  creation_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  nbr_of_msg: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
    defaultValue:0
  },
  rights: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue:1
  },
  is_connected: {
    type: DataTypes.DATE,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING(50)
  }
}, {tableName: 'users', timestamps: false});

module.exports = User;