const app = require('./express')
const config = require('../config/config')

let port = config.port;
if (port == null || port == "") {
  port = 8000;
}

app.listen(config.port,() => console.log('Listening on port ' + config.port))