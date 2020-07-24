const request = require('supertest')
const app = require('../server/express')
const User = require('../server/user/model')



beforeAll(async () => {
    await User.deleteMany()
})


test('should register successfully' , async () => {
    await request(app).post('/users').send({
        "name": "ali alavi",
        "username": "ali_alavi",
        "password": "123456789",
        "type": "FieldAgent" 
    }).expect(200)

})

test('should be failed cause required field is empty' , async () => {
    await request(app).post('/users').send({
        "name": "",
        "username": "",
        "password": "123456789",
        "type": "FieldAgent" 
    }).expect(400)

})
