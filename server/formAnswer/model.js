const mongoose = require('mongoose')

const FormAnswerSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    formId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Form',
        required: true,
    },
    value: Object
})

module.exports = mongoose.model('FormAnswer', FormAnswerSchema)