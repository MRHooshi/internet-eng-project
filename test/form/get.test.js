const request = require('supertest')
const app = require('../../server/express')
const Form = require('../../server/form/model')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../server/user/model')
const config = require('../../config/config')


const adminId = new mongoose.Types.ObjectId()
const admin = {
    _id : adminId,
    name: "amir form",
    username: "amir_form",
    password: "123456789",
    type: "Admin",
    tokens : [{
        token: jwt.sign({_id : adminId} ,config.jwtSecret)
    }]
}

const formId = new mongoose.Types.ObjectId()
const form =  {
    _id : formId,
    "title":"sample form 2" , 
    // "id" : "88888888" , 
    "fields" : [
        {
            "name":"First_Name" , 
            "title" : "first name" , 
            "type" : "Text",
            "required":true
        } , 
        {
            "name":"Last_Name" , 
            "title" : "last name" , 
            "type" : "Text",
            "required":true
        } , 
        {
            "name":"Loc" , 
            "title" : "Location 1" , 
            "type" : "Location",
            "required":false
        } , 
        {
            "name":"Loc" , 
            "title" : "Location 2" , 
            "type" : "Location",
            "required":true
        } ,

        {
            "name":"Request_Type" , 
            "title" : "Request Type" , 
            "type" : "Text" , 
            "options" : [
                {"label" : "Help" , "value" : "Help"}, 
                {"label" : "Opt2" , "value" : "option2"} ,
                {"label" : "Opt3" , "value" : "option3"}
            ] 
        } , 
        {
            "name":"BLocation" , 
            "title" : "BLocation" , 
            "type" : "Location" , 
            "options" : [
                {"label" : "Base1" , "value" : {"lat" : "1.234" , "long": "5.678"}}, 
                {"label" : "Base2" , "value" : {"lat" : "9.000" , "long" : "10.000" }} 
            ] 
        } 
    ] 
}



beforeAll(async () => {
    await User.deleteMany()
    await Form.deleteMany()
    await new Form(form).save()
    await new User(admin).save()
})

beforeEach(async () => {
})

afterEach(async () => {
})

afterAll(async() =>{
    await User.deleteMany()
    await Form.deleteMany()
})


test('should get list of forms' , async  () => {
    const response  = await request(app)
    .get('/forms')
    .set('Authorization', `Bearer ${admin.tokens[0].token}`)
    .expect(200)
    expect(response.body[0].title).toBe('sample form 2')
})