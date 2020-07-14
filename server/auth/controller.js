const User = require('../user/model')
const jwt = require('jsonwebtoken')

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
                email: user.email
            }
        })

    } catch (err) {

        return res.status('401').json({
            error: "Could not login"
        })

    }
}