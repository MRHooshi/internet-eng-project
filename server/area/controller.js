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



let pointInPolygon = function (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];        
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};


const getByCoordiantes = async (req, res) => {
    try{
        let result = []


        let lat = req.query.lat
        let long = req.query.long 
        let areas =  await Area.find().select('name geometry')
        for (area of areas){
            if(pointInPolygon([lat , long], area.geometry.coordinates[0])){
                result.push(area.name)
            }
        }

        res.status(200).send(result)    
    }catch (err){
        res.status(400).json({
            error: "get by coordinates failed"
        })
    }
}

const getByCoordiantesFunction = async (lat , long) => {
    try{
        let result = []
        let areas =  await Area.find().select('name geometry')
        for (area of areas){
            if(pointInPolygon([lat , long], area.geometry.coordinates[0])){
                result.push(area.name)
            }
        }
        
        return result
    }catch (err){
        console.log(err)
    }
    return []
}

module.exports = {
    create,
    list,
    remove,
    get,
    update,
    isPolygon,
    getByCoordiantesFunction,
    getByCoordiantes
}