const express = require('express');
const areaController = require('./controller');

const router = express.Router()

router.post('/'  ,areaController.isPolygon,areaController.create)

router.get('/' , areaController.list)

router.delete('/' , areaController.remove)

router.put('/' , areaController.isPolygon ,areaController.update)

module.exports = router