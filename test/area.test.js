const request = require('supertest')
const app = require('../server/express')
const Area = require('../server/area/model')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../server/user/model')
const config = require('../config/config')


const adminId = new mongoose.Types.ObjectId()
const admin = {
    _id : adminId,
    name: "amir area",
    username: "amir_area",
    password: "123456789",
    type: "Admin",
    tokens : [{
        token: jwt.sign({_id : adminId} ,config.jwtSecret)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await Area.deleteMany()
    await new User(admin).save()
})

afterAll(async () => {
    await User.deleteMany()
    Area.deleteMany()
})

test('should failed to create new area' , async  () => {
    await request(app)
    .post('/areas')
    .set('Authorization', `Bearer ${admin.tokens[0].token}`)
    .send({
        type:"polygon"
    })
    .expect(400)
})

test('should create new area' , async  () => {
    await request(app)
    .post('/areas')
    .set('Authorization', `Bearer ${admin.tokens[0].token}`)
    .send(
        {
             "type": "Feature",
             "name":"tehran",
             "geometry": {
               "type": "Polygon",
               "coordinates": [
                 [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
                   [100.0, 1.0], [100.0, 0.0] ]
                 ]
             }
    })
    .expect(200)
})
