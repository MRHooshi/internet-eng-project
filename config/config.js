const dotenv = require('dotenv')
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongo_uri: process.env.MONGO_URI,
  jwtSecret: process.env.JWTSECRET,
  //base_uri: '/api/v1.0.0'
}

module.exports = config