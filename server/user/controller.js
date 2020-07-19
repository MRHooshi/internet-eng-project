const User = require('./model')

const register = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch (err) {
        //return error message
        console.log(err)
    }
}

//check user is Admin
const isAdmin = (req , res , next) => {
    if (!req.user.type === "Admin")
        return res.status(403).json({
            error : "User is not an Admin"
        })
    next()
}

//check user is Control Agent
const isControlAgent = (req , res , next) => {
    if (!req.user.type === "ControlAgent")
        return res.status(403).json({
            error : "User is not an ControlAgent"
        })
    next()
}

//check user is Field Agent
const isFieldAgent = (req , res , next) => {
    if (!req.user.type === "FieldAgent")
        return res.status(403).json({
            error : "User is not an FieldAgent"
        })
    next()
}

module.exports={
    register,
    isAdmin,
    isControlAgent,
    isFieldAgent    
}