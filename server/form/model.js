const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    } ,
    fields:{
        type : [{
            name:{
                type: String,
                required: true
            },   
            title:{
                type: String,
                required: true
            },    
            type:{
                type: String,
                enum:['Text', 'Number' ,'Date' , 'Location', //without option
                       'Texts', 'Numbers', 'Dates', 'Locations'//for handling options
                     ],
                required: true
            },
            required:{
                type: Boolean,
                required: true
            },
            options : {
                type: [{
                    label: {
                        type:String,
                        required: true
                    },
                    value: Object
                }]
            }
        }],
        required: true
    }
})

module.exports = mongoose.model('Form', FormSchema)