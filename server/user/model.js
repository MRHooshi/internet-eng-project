const moongose = require('mongoose');

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
    }  
})

UserSchema.methods = {
    encryption: function(password) {
     
    },

    authenticate: function(text) {
        return this.encryption(text) === this.hashed_password
    },

    makeSalt: function() {
        return new Date().valueOf()
    }
}

module.exports = mongoose.model('User', UserSchema)