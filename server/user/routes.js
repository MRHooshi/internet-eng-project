const express = require('express');
const userController = require('./controller')

const router = express.Router()

router.route('users')
    .post(userController.register)