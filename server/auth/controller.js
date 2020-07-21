const User = require('../user/model')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const config = require('../../config/config');


//middleware for auth
const loginRequired = expressJwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    userProperty: 'auth',
    credentialsRequired: false
})

const loginRequiredError = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({
          error: err
      });
    }
}

const hasAuthorization = (req, res, next) => {
    const authorized = req.auth
    if (!(authorized)) {
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
  }

module.exports = {
    loginRequired,
    loginRequiredError,
    hasAuthorization
}