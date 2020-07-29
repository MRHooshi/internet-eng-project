const request = require('supertest')
const app = require('../../server/express')
const Area = require('../../server/area/model')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../server/user/model')
const config = require('../../config/config')


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

const areaId =new mongoose.Types.ObjectId()
const area =  {
    _id : areaId,
    "type": "Feature",
    "name":"tehran",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
          [100.0, 1.0], [100.0, 0.0] ]
        ]
    }
}



beforeAll(async () =>{
    await User.deleteMany()
    await Area.deleteMany()
    await new User(admin).save()
    await new Area(area).save()
})

// beforeEach(async () => {
//     await Area.deleteMany()
// })

// afterEach(async () => {
//     await Area.deleteMany()
// })

afterAll(async () => {
    await User.deleteMany()
    await Area.deleteMany()
})

test('should get list of template forms' , async () =>{
    const response  = await request(app)
    .get('/areas')
    .set('Authorization', `Bearer ${admin.tokens[0].token}`)
    .expect(200)
    expect(response.body[0].name).toBe('tehran')
})

test('should get an area by name' , async () =>{
    const response  = await request(app)
    .get('/areas/tehran')
    .set('Authorization', `Bearer ${admin.tokens[0].token}`)
    .expect(200)
    expect(response.body[0].name).toBe('tehran')
})