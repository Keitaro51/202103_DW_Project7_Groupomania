const express = require('express');
const app = express();
const path = require('path');
const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');
const helmet = require('helmet');
//const messageRoutes = require('./routes/message');
//const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

//connection to database
//pool?

(async function() {
  try {
    const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`);
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}})()


//secure app 
app.use(helmet());

//avoid CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//extract JSON object from request body
app.use(express.json()); 

//api routes
//app.use('/api/message', messageRoutes);
app.use('/api/auth', authRoutes);
//app.use('/api/user', userRoutes);

module.exports = app;