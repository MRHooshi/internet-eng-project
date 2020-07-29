const Form = require('./model')

const create = async (req, res) => {
    const form = new Form(req.body)
    try {
        await form.save()
        return res.status(200).json({
            message: "Form Successfully Created"
        })
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}

const remove = async (req , res) => {
    try {
        let formId = req.params.id
        let form = await Form.findOne({_id : formId})
        if (!form){
            return res.status('400').json({
                error: "Form not found"
            })
        }

        let deletedForm = await form.remove()
        res.json(deletedForm)
    } catch (err) {
        return res.status(400).json({
            error: "delete failed"
        })
      }
}

const get = async (req , res) => {
    try {
        let formId = req.params.id
        let form = await Form.findOne({_id : formId})
        if (!form){
            return res.status('400').json({
                error: "Form not found"
            })
        }

        res.json(form)
    } catch (err) {
        return res.status(400).json({
            error: err
        })
      }  
}

const list = async (req , res) => {
    try {
        let forms = await Form.find().select('_id title')
        res.status(200).json(forms)

    } catch (err) {
        return res.status(400).json({
            error: err
        })
      }  
}

module.exports = {
    create,
    remove,
    get,
    list
}