const express = require('express');
const formAnswerController = require('./controller')

const router = express.Router()

router.get('/:id', formAnswerController.get)
router.post('/' , formAnswerController.create)
router.get('/' , formAnswerController.listAnswersByFormId)

module.exports = router