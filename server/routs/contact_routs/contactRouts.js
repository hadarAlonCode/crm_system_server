
// @ts-nocheck


import {NO_MORE_CONTACTS_ERROR, ROUTE_ERROR, ROUTES_ERROR_MISSING_BODY_PARAMS } from '../../tools/error'
const Contact = require('../../models/contact/Contact')


module.exports = (app) => {
    createContact(app)
    getContacts(app)
    getContactsPagination(app)
    updateContact(app)
    searchByName(app)
    getContactsFilter(app)
}


const createContact = async (app) => {
    app.post('/contact/create', async (req, res) => {

        if (req.body.email) {
            const contact = await Contact.createNew(req.body)

            if (contact) {
                res.send({ ok: true, result: contact })
            } else {
                res.send({ ok: false, result: ROUTE_ERROR })
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

            if (contact) {
                res.send({ ok: true, result: contact })
            } else {
                res.send({ ok: false, result: ROUTE_ERROR })
            }
        } else {
            res.send({ ok: false, result: ROUTES_ERROR_MISSING_BODY_PARAMS })
        }

    })
}




const getContacts = async (app) => {
    app.get('/contact/get', async (req, res) => {
        
        const contact = await Contact.getAll(req.query.user_key)

        if (contact.length > 0) {
            res.send({ ok: true, result: contact })
        } else {
            res.send({ ok: true, result: [] })
        }


    })
}


const getContactsFilter = async (app) => {
    app.get('/contact/filter/get', async (req, res) => {

        let user_key = req.query.user_key
        let key = req.query.key
        let value = req.query.value

        
        const contact = await Contact.getBy(user_key ,key, value )

        if (contact.length > 0) {
            res.send({ ok: true, result: contact })
        } else {
            res.send({ ok: true, result: [] })
        }


    })
}


const getContactsPagination = async (app) => {
    app.get('/contact/pagination/get', async (req, res) => {

        let page = req.query.page;
        let limit = req.query.limit;
        let user_key = req.query.user_key;


        const contacts = await Contact.getPagination(parseInt(limit), parseInt(page), user_key)


        if (contacts.length > 0) {
            res.send({ ok: true, result: contacts })
        } else {
            res.send({ ok: false, result: NO_MORE_CONTACTS_ERROR })
        }


    })
}


const searchByName = async (app) => {
    app.get('/contact/search/name/get', async (req, res) => {

        let keyword = req.query.keyword;
        let user_key =req.query.user_key;
        const contacts = await Contact.getAll(user_key)
        if (contacts.length > 0) {

            let char = keyword.toLowerCase()

            const p = Array.from(char).reduce((a, v, i) => `${a}[^${char.substr(i)}]*?${v}`, '');
            const re = RegExp(p);
    
            let match_contacts = contacts.filter(contact => contact.name.toLowerCase().match(re));
            
            res.send({ ok: true, result: match_contacts })
        } else {
            res.send({ ok: false, result: ROUTE_ERROR })
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


