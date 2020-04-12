


import { CONTACT_ERROR, ROUTES_ERROR_MISSING_BODY_PARAMS } from '../../tools/error'
const Contact = require('../../models/contact/Contact')


module.exports = (app) => {
    createContact(app)
    getContacts(app)
    getContactsPagination(app)
    updateContact(app)
    searchByName(app)
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


const updateContact = async (app) => {
    app.post('/contact/update', async (req, res) => {

        let body = req.body
       

        if (req.query._id) {
            const contact = await Contact.revise(body ,  req.query._id)
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


const getContactsPagination = async (app) => {
    app.get('/contact/pagination/get', async (req, res) => {

        let page = req.query.page;
        let limit = req.query.limit;

        const contacts = await Contact.getPagination(parseInt(limit), parseInt(page))


        if (contacts.length > 0) {
            res.send({ ok: true, result: contacts })
        } else {
            res.send({ ok: false, result: CONTACT_ERROR })
        }


    })
}


const searchByName = async (app) => {
    app.get('/contact/name/search/get', async (req, res) => {

        let name = req.body.name;

        console.log(name);
        


        const contacts = await Contact.searchByName(name)


        if (contacts.length > 0) {
            res.send({ ok: true, result: contacts })
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


