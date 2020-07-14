const app = require('./express')
const config = require('../config/config')

app.listen(config.port,() => console.log('listen on port ' + config.port))