const mongoose = require('mongoose');
const validator = require('validator')

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

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
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
    }
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
    }
}

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