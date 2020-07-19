const User = require('../user/model')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const config = require('../../config/config');

const login = async (req, res) => {
    try {
        let user = await User.findOne({
            "username": req.body.username
        })
        if (!user)
            return res.status('401').json({
                error: "User not found"
            })

        if (!user.authenticate(req.body.password)) {
            return res.status('401').send({
                error: "Username and password don't match."
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, config.jwtSecret)

        return res.json({
            token: token,
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                type: user.type
            }
        })

    } catch (err) {

        return res.status('401').json({
            error: "Could not login"
        })

    }
}

//middleware for auth
const loginRequired = expressJwt({
    secret: config.jwtSecret,
    algorithms: ['RS256'],
    userProperty: 'auth'
})

module.exports = {
    login,
    loginRequired
}