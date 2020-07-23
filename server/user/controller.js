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
        res.status(400).json({
            error: "Username already exists"
        })
    }
}

//check user is Admin
const isAdmin = async (req , res , next) => {

    const user = await User.findById({_id:req.auth._id})
    if (user && user.type !== "Admin")
        return res.status(403).json({
            error : "User is not an Admin"
        })
    next()
}

//check user is Control Agent
const isControlAgent = async(req , res , next) => {
    const user = await User.findById({_id:req.auth._id})
    if (user && user.type !== "ControlAgent")
        return res.status(403).json({
            error : "User is not a ControlAgent"
        })
    next()
}

//check user is Field Agent
const isFieldAgent = async(req , res , next) => {
    const user = await User.findById({_id:req.auth._id})
    if (user && user.type !== "FieldAgent")
        return res.status(403).json({
            error : "User is not a FieldAgent"
        })
    next()
}

module.exports={
    register,
    isAdmin,
    isControlAgent,
    isFieldAgent    
}