const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('../config/db')
const userRoute = require('./user/routes')
const authRoute = require('./auth/routes')

//Connect to the DB
connectDB();

//define express app
const app = express()

//middleware
app.use(bodyParser.json());

//Routes endpoints
app.use('/users', userRoute)

app.use('/auth', authRoute)

app.post('/user' , (req,res) =>  res.send(req.body))

module.exports = app