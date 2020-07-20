const Area = require('./model')
const geojsonValidation = require('geojson-validation')

const create = async (req, res) => {
    const area = new Area(req.body)
    try {
        await area.save()
        return res.status(200).json({
            message: "Area Successfully Created"
        })
    } catch (err) {
        return res.status(400).json({
            error: "Area already exists"
        })
    }
}

const list = async (req, res) => {
    try {
        let areas = await Area.find().select('name properties geometry')
        res.json(areas)
    } 
    catch (err) {
        return res.status(400).json({
            error: "Something goes wrong"
        })
    }
}

const remove = async (req , res) => {
    try {
        let areaName = req.query.name
        let area = await Area.findOne({name : areaName})
        if (!area){
            return res.status('400').json({
                error: "Area not found"
            })
        }

        let deletedArea = await area.remove()
        res.json(deletedArea)
    } catch (err) {
        return res.status(400).json({
            error: "delete failed"
        })
      }
}

const get = async (req , res) => {
    try {
        let areaName = req.query.name
        let area = await Area.findOne({name : areaName})
        if (!area){
            return res.status('400').json({
                error: "Area not found"
            })
        }

        res.json(area)
    } catch (err) {
        return res.status(400).json({
            error: err
        })
      }  
}

const update = async (req , res) => {
    try {
        let geojsonObject = req.body
        let areaName = geojsonObject.name
        let area = await Area.findOne({name : areaName})
        if (!area){
            return res.status('400').json({
                error: "Area not found"
            })
        }
        await area.remove()
        let newArea = new Area(geojsonObject)
        await newArea.save()
        res.json(area)
    } catch (err) {
        return res.status(400).json({
            error: "Get area failed"
        })
      }  
}
//check right area
const isPolygon = (req , res , next) => {
    geojsonObject = req.body
    if(!geojsonValidation.isPolygon(geojsonObject.geometry)){
        res.status(400).json({
            error:"not a valid Polygon"
        })
    }
    else {
        next()
    }
    
}

module.exports = {
    create,
    list,
    remove,
    get,
    update,
    isPolygon,
}