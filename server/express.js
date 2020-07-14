const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('../config/db')

//Connect to the DB
connectDB();

//middleware
app.use(bodyParser.json());


const app = express()

module.exports = app