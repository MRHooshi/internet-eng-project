const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('../config/db')
const userRoute = require('./user/routes')
const authRoute = require('./auth/routes')
const areaRoute = require('./area/routes')

//Connect to the DB
connectDB();

//define express app
const app = express()

//middleware
app.use(bodyParser.json());

//Routes endpoints
app.use('/users', userRoute)

app.use('/auth', authRoute)

app.use('/areas' , areaRoute)

module.exports = app