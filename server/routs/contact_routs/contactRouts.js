


import { CONTACT_ERROR, ROUTES_ERROR_MISSING_BODY_PARAMS } from '../../tools/error'
const Contact = require('../../models/contact/Contact')


module.exports = (app) => {
    createContact(app)
    getContacts(app)
}


const createContact = async (app) => {
    app.post('/contact/create', async (req, res) => {

        if (req.body.email) {
            const contact = await Contact.createNew(req.body)
            console.log(contact);

            if (contact) {
                res.send({ ok: true, result: contact })
            } else {
                res.send({ ok: false, result: CONTACT_ERROR })
            }
        } else {
            res.send({ ok: false, result: ROUTES_ERROR_MISSING_BODY_PARAMS })
        }

    })
}




const getContacts = async (app) => {
    app.get('/contact/get', async (req, res) => {

        const contact = await Contact.getAll()

        if (contact.length > 0) {
            res.send({ ok: true, result: contact })
        } else {
            res.send({ ok: false, result: CONTACT_ERROR })
        }


    })
}


//create paginate !

// const createUser = (app: any) => {
//     app.post('/auth/create-user', async (req: any, res: any) => {
//         if(isUser(req.body)) {
//                 const user = await User.register(req.body)
//                 if(user) {
//                     if(typeof user !== 'string') {
//                         const { email, password } = user
//                         const token = await User.login(email, req.body.password)
//                         res.send(successfulBody(token))
//                     } else {
//                         res.send(failedBody(USER_ERROR_USER_ALREADY_EXISTS))
//                     }
//                 } else {
//                     res.send(failedBody(ROUTES_ERROR_MODEL_CREATION_FAILED('user')))
//                 }
//         } else {
//             res.send(failedBody(ROUTES_ERROR_MISSING_BODY_PARAMS))
//         }
//     })
// }


