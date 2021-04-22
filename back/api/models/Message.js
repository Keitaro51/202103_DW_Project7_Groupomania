// @ts-nocheck
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`);

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
    autoIncrement:true,
    primaryKey: true
  },
  creator_id: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
    reference:{
      model:'User',
      key:'id'
    }
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT('tiny')
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  parent_msg_id: {
    type: DataTypes.SMALLINT.UNSIGNED
  }
},{
  tableName: 'messages', 
  timestamps: false, 
  underscored: true,
  classMethods:{
    associate:function(models){
      models.Message.belongsTo(models.User,{
        foreignKey:{
          allowNull:false
        }
      })
  }}
});

module.exports = Message;