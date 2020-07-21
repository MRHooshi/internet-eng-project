const express = require('express');
const areaController = require('./controller');
const userController = require('../user/controller')

const router = express.Router()

router.post('/'  ,userController.isAdmin,areaController.isPolygon,areaController.create)

router.get('/' , areaController.list)

router.delete('/' , userController.isAdmin,areaController.remove)

router.patch('/' ,userController.isAdmin ,areaController.isPolygon ,areaController.update)

router.get('/:lat/:long', areaController.getByCoordiantes)

router.get('/name', areaController.getByName)




module.exports = router