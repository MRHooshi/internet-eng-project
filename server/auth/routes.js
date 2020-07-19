const express =require('express')
const authController = require('./controller')

const router = express.Router()

router.route('/login')
    .post(authController.login)

module.exports = router