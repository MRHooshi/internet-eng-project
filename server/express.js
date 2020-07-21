const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('../config/db')
const userRoute = require('./user/routes')
const areaRoute = require('./area/routes')
const formRoute = require('./form/routes')
const answerRoute = require('./formAnswer/routes')
const userController = require('./user/controller')
const authController = require('./auth/controller')
const { hasAuthorization } = require('./auth/controller')
//Connect to the DB
connectDB();

//define express app
const app = express()

//middleware
app.use(bodyParser.json());

app.use(authController.loginRequired.unless({path: [ '/user/register' , '/userlogin' ]}) , authController.loginRequiredError);

//Routes endpoints
app.use('/api/v1.0.0/user', userRoute)

//app.use('/api/v1.0.0/auth', authRoute)

app.use('/api/v1.0.0/admin/area',userController.isAdmin , areaRoute)

app.use('/api/v1.0.0/admin/form', hasAuthorization ,formRoute)

app.use('/api/v1.0.0/form',hasAuthorization, answerRoute)


module.exports = app