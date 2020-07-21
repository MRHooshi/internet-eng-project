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
            error: err.message
        })
      }  
}

const list = async (req , res) => {
    try {
        let forms = await Form.find().select('_id title')
        res.json.status(200)(forms)

    } catch (err) {
        return res.status(400).json({
            error: err.message
        })
      }  
}


const update = async(req , res) => {
    try{
        let formId = req.param.id
        let form = await Form.findOne({_id : formId})
        if (!form){
            return res.status('400').json({
                error : "Form not found"
            })
        }
        if (req.body.title != null) {
            res.form.title = req.body.title
        }
        if (req.body.fields != null) {
            res.form.fields = req.body.fields
        }
        const updatedForm = await res.form.save()
        res.json(updatedForm)
    }
    catch(err) {
        return res.status(400).json({
            error: "update failed"
        })
    }

}

module.exports = {
    create,
    remove,
    get,
    list,
    update
}