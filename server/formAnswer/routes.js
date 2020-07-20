const express = require('express');
const formAnswerController = require('./controller')
const userController = require('../user/controller')

const router = express.Router()

router.get('/:id', userController.isControlAgent, formAnswerController.get)
router.post('/' ,userController.isFieldAgent, formAnswerController.create)
router.get('/' , userController.isControlAgent, formAnswerController.listAnswersByFormId)

module.exports = router