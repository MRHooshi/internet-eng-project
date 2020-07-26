const request = require('supertest')
const app = require('../server/express')
const Form = require('../server/form/model')
const FormAnswer = require('../server/formAnswer/model')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../server/user/model')
const config = require('../config/config')


const formId = new mongoose.Types.ObjectId()
const form = {
    _id:formId,
    title:"sample form 2" , 
    fields : [
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


const userId = new mongoose.Types.ObjectId()
const user = {
    _id : userId,
    name: "amir formAnswer",
    username: "amir_formAnswer",
    password: "123456789",
    type: "FieldAgent",
    tokens : [{
        token: jwt.sign({_id : userId} ,config.jwtSecret)
    }]
}

beforeAll(async () => {
    await User.deleteMany()
    await Form.deleteMany()
    await new User(user).save()
    await new Form(form).save()
})

beforeEach(async () => {
    await FormAnswer.deleteMany()
})

afterEach(async () => {
    FormAnswer.deleteMany()
})

afterAll( async () => {
    await User.deleteMany()
    await Form.deleteMany()
})


test('should failed to create new formAnswer' , async  () => {
    await request(app)
    .post('/forms')
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send({      
        "Loc": { "lat": 51.99005126953125, "long": 34.6015631772409 },
        "First_Name": "aa",
        "Request_Type": "Help",
        "Base_Location": { "lat": 35.70018493475579, "long": 51.33878232789042 }
    } )
    .expect(400)
})
