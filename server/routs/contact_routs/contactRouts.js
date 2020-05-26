
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
    countBy(app)
    deleteContact(app)
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

const deleteContact = async (app) => {
    app.post('/contact/delete', async (req, res) => {
       
        if (req.query._id) {
            const contact = await Contact.destroy(  req.query._id)

            if (contact) {
                res.send({ ok: true, result: contact })
            } else {
                res.send({ ok: false, result: ROUTE_ERROR })
            }
        } else {
            res.send({ ok: false, result: "ROUTES_ERROR_MISSING_CONTACT_ID" })
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


const countBy = async (app) => {
    app.get('/contact/group/count/get', async (req, res) => {

        let match_key = req.query.user_key;
        let group = req.query.group;
        let match_status = req.query.match_status ? req.query.match_status : undefined ;

        let count_result
        if(match_status){         //user_key - match 1   //filter group   // match 2
             count_result = await Contact.countBy(match_key, group, match_status)

        }else{
             count_result = await Contact.countBy(match_key, group)

        }

        if(count_result){
            res.send({ ok: true, result: count_result })
        }else{
            res.send({ ok: false, result: "500_ERROR" })

        }
    })
}

