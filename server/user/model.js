const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const config = require('../../config/config');
const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },

    username: {
        type: String,
        trim: true,
        unique: 'Username already exists',
        required: 'Username is required'
    },

    hashed_password: {
        type: String,
        required: "Password is required"
    },
    
    salt: String,

    updated_at: Date,

    created_at: {
        type: Date,
        default: Date.now
    },

    type: {
        type: String,
        enum: ['Admin', 'ControlAgent', 'FieldAgent'],
        default: 'FieldAgent'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods = {
    encryption: function (password) {
        return password + this.salt
    },

    authenticate: function (text) {
        return this.encryption(text) === this.hashed_password
    },

    makeSalt: function () {
        return new Date().valueOf()
    },

    generateAuthToken : async function(){
        const user = this
        const token = jwt.sign({_id: user._id.toString() }, config.jwtSecret)
        user.tokens = user.tokens.concat({ token })
        await user.save()    
    }
}
// userSchema.methods.generateAuthToken = async function () {
//     const user = this
//     const token = jwt.sign({_id: user._id.toString() }, config.jwtSecret)
//     user.tokens = user.tokens.concat({ token })
//     await user.save()    
//     return token
// }

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryption(password)
    })
    .get(function () {
        return this._password
    })

module.exports = mongoose.model('User', UserSchema)