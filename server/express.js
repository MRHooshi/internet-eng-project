const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('../config/db')
const userRoute = require('./user/routes')
const authRoute = require('./auth/routes')
const areaRoute = require('./area/routes')
const formRoute = require('./form/controller')
const userController = require('./user/controller')
const authController = require('./auth/controller')
//Connect to the DB
connectDB();

//define express app
const app = express()

//middleware
app.use(bodyParser.json());

app.use(authController.loginRequired.unless({path: ['/auth/login' , '/users']}) , authController.loginRequiredError);

//Routes endpoints
app.use('/users', userRoute)

app.use('/auth', authRoute)

app.use('/areas',userController.isAdmin , areaRoute)

app.use('/forms', formRoute)

module.exports = app