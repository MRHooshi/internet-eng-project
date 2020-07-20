const FormAnswer = require('./model')
const Form = require('../form/model')
const User = require('../user/model')

const create = async (req, res) => {
    let formAnswer = req.body
    formAnswer['userId'] = req.auth._id
    
    let formId = formAnswer.formId
    try{
        await Form.findById(formId)
    } catch (err) {
        return res.status(400).json({
            error: "Form with given id is not valid"
        })
    }
    const answer = new FormAnswer(formAnswer)
    try {
        await answer.save()
        return res.status(200).json({
            message: "FormAnswer Successfully Created"
        })
    } catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }
}


const get = async (req, res) => {
    let formAnswerId = req.params.id
    
    try{
        let formAnswer = await FormAnswer.findById(formAnswerId)
        let owner = await User.findById(formAnswer.userId)
        let form = await Form.findById(formAnswer.formId)
        res.json({
            name: owner.name ,
            formTitle : form.title,
            value : formAnswer.value
        })
    } catch (err) {
        return res.status(400).json({
            error: "Form with given id is not valid"
        })
    }
    const answer = new FormAnswer(formAnswer)
    try {
        await answer.save()
        return res.status(200).json({
            message: "FormAnswer Successfully Created"
        })
    } catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }
}


const listAnswersByFormId = async (req , res) => {
    let formId = req.params.formId
    
    try{
        await Form.findById(formId)
    } catch (err) {
        return res.status(400).json({
            error: "Form with given id is not valid"
        })
    }

    try{
        let formAnswers = await FormAnswer.find({formId : formId})
        res.json(formAnswers)
    } catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }
    
}

module.exports = {
    create,
    listAnswersByFormId,
    get
}