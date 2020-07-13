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
    }
}

module.exports={
    register    
}