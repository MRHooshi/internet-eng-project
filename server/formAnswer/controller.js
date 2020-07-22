const FormAnswer = require('./model')
const Form = require('../form/model')
const User = require('../user/model')
const areaController = require('../area/controller')

const create = async (req, res) => {
    let formAnswer = req.body
    formAnswer['userId'] = req.auth._id
    
    let formId = formAnswer.formId
    let form;
    try{
        form = await Form.findById(formId)
    } catch (err) {
        return res.status(400).json({
            error: "Form with given id is not valid"
        })
    }
    try {
        let fields = form.fields
        let result = []
        
        for await(field of fields){
            let newRecord = {'name': field.name , 'title':field.title , 'type':field.type ,'value' : {}}
            let fieldValue = formAnswer[field.name]
            newRecord.value = fieldValue

            if(newRecord.type === 'Location'){
                newRecord.value.areas = await areaController.getByCoordiantesFunction(fieldValue.lat , fieldValue.long)
                
            }
             result.push(newRecord)
        }
    
    
    console.log(result)
    const answer = new FormAnswer({
        'userId':formAnswer.userId,
        'formId':formAnswer.formId,
        'values':result
    })
    
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
            values : formAnswer.values
        })
    } catch (err) {
        return res.status(400).json({
            error: "Form with given id is not valid"
        })
    }
}


const listAnswersByFormId = async (req , res) => {
    let formId = req.query.formId
    
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