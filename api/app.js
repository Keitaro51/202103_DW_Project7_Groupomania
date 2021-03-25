const express = require('express');
const app = express();
const path = require('path');

const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');

const helmet = require('helmet');
console.log(process.env.PORT)

//connection to database
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`);
console.log(sequelize.config)
//pool?

async function test() {
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}}
test();

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


module.exports = app;