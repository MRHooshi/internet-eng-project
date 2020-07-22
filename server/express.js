const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('../config/db')
const userRoute = require('./user/routes')
const authRoute = require('./auth/routes')
const areaRoute = require('./area/routes')
const formRoute = require('./form/routes')
const answerRoute = require('./formAnswer/routes')
const userController = require('./user/controller')
const authController = require('./auth/controller')
const areaController = require('./area/controller')
const { hasAuthorization } = require('./auth/controller')
//Connect to the DB
connectDB();

//define express app
const app = express()

//middleware
app.use(bodyParser.json());

app.use(authController.loginRequired.unless({path: ['/auth/login' , '/users']}) , authController.loginRequiredError);

//Routes endpoints
app.get('/areas/getByPoint' , hasAuthorization , areaController.getByCoordiantes)

app.use('/users', userRoute)

app.use('/auth', authRoute)

app.use('/areas',hasAuthorization,userController.isAdmin , areaRoute)

app.use('/forms', hasAuthorization ,formRoute)

app.use('/answers',hasAuthorization, answerRoute)


module.exports = app