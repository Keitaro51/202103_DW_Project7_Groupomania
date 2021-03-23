const express = require('express');
const app = express();

const path = require('path');

const helmet = require('helmet');
require("dotenv").config();

//connection to database

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