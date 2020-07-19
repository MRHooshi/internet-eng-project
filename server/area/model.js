const mongoose = require('mongoose')

const PolygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
    },
    coordinates: {
        type: [[[Number]]],
        required: true
    }
})

const FeatureSchema =  new mongoose.Schema({
    type: {
        type: String,
        enum: ['Feature'],
        required: true
    },
    name:{
        type: String,
        index: true,
        unique: true
    },
    properties: Object,
    geometry:{
        type: PolygonSchema,
        require: true
    }
})

module.exports = mongoose.model('Area', FeatureSchema)