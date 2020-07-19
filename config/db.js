const mongoose = require('mongoose')
const config = require('./config')
const connectDB = () => {
    try {
        const conn = mongoose.connect(config.mongo_uri ,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        console.log('MongoDB connected:');
    } catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB