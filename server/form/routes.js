const express = require('express');
const formController = require('./controller')

const router = express.Router()

router.get('/:id' , formController.get)
router.delete(':id' , formController.remove)
router.post('/' , formController.create)
router.get('/' , formController.list)

module.exports = router