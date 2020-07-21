const express = require('express');
const formController = require('./controller')
const userController = require('../user/controller')

const router = express.Router()

router.get('/:id' , formController.get)
router.delete('/:id' ,userController.isAdmin, formController.remove)
router.patch('/:id' , userController.isAdmin, formController.update)
router.post('/' ,userController.isAdmin, formController.create)
router.get('/' , formController.list)

module.exports = router