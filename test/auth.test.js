const request = require('supertest')
const app = require('../server/express')
const User = require('../server/user/model')
const config = require('../config/config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const adminId = new mongoose.Types.ObjectId()
const admin = {
    _id : adminId,
    name: "amir login",
    username: "amir_login",
    password: "123456789",
    type: "Admin",
    tokens : [{
        token: jwt.sign({_id : adminId} ,config.jwtSecret)
    }]
}


beforeAll(async () => {
    await User.deleteMany()
    await new User(admin).save()
})

afterAll( async() =>{
    await User.deleteMany()
})

test('should login successfully' , async () => {
    await request(app)
    .post('/auth/login')
    .send({   
        username: "amir_login",
        password: "123456789"
    })
    .expect(200)
})

test('should failed because username and pass dont match' , async () => {
    await request(app)  
    .post('/auth/login')
    .send({   
        username: "amir_login",
        password: "its_amir"
    })
    .expect(401)
})

test('should failed because required filed is empty ' , async () => {
    await request(app)  
    .post('/auth/login')
    .send({   
        username: "",
        password: "5545555"
    })
    .expect(401)
})
