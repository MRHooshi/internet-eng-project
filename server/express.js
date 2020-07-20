const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('../config/db')
const config = require('../config/config')
const userRoute = require('./user/routes')
const authRoute = require('./auth/routes')
const areaRoute = require('./area/routes')
const formRoute = require('./form/routes')
const userController = require('./user/controller')
const authController = require('./auth/controller')
const { hasAuthorization } = require('./auth/controller')
//Connect to the DB
connectDB();

//define express app
const app = express()

//middleware
app.use(bodyParser.json());

app.use(authController.loginRequired.unless({path: ['/auth/login' , '/users']}) , authController.loginRequiredError);

//Routes endpoints
app.use('/api/v1.0.0/user', userRoute)

app.use('/api/v1.0.0/auth', authRoute)

app.use('/api/v1.0.0/admin/area',userController.isAdmin , areaRoute)

app.use('/api/v1.0.0/admin/form', hasAuthorization ,formRoute)

module.exports = app