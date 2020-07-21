const User = require('./model')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const config = require('../../config/config');

const register = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch (err) {
        //return error message
        res.status(400).json({
            error: "Username already exists"
        })
    }
}


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
        }, config.jwtSecret, { expiresIn: 18000 })
        
        return res.json({
            status:"ok",
            token: token,
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                type: user.type,
                email: user.email
            }
        })

    } catch (err) {

        return res.status('401').json({
            error: "Could not login"
        })

    }
}




//check user is Admin
const isAdmin = (req , res , next) => {
    if (!req.auth.type === "Admin")
        return res.status(403).json({
            error : "User is not an Admin"
        })
    next()
}

//check user is Control Agent
const isControlAgent = (req , res , next) => {
    if (!req.auth.type === "ControlAgent")
        return res.status(403).json({
            error : "User is not a ControlAgent"
        })
    next()
}

//check user is Field Agent
const isFieldAgent = (req , res , next) => {
    if (!req.auth.type === "FieldAgent")
        return res.status(403).json({
            error : "User is not a FieldAgent"
        })
    next()
}

module.exports={
    register,
    login,
    isAdmin,
    isControlAgent,
    isFieldAgent    
}