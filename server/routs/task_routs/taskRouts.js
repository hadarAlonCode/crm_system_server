
// @ts-nocheck


import { ROUTE_ERROR, ROUTES_ERROR_MISSING_BODY_PARAMS } from '../../tools/error'
const Task = require('../../models/task/Task')


module.exports = (app) => {
    createTask(app)
    getTasksPagination(app)
}


const createTask = async (app) => {
    app.post('/task/create', async (req, res) => {

        if (req.body.email) {
            const task = await Task.createNew(req.body)
            console.log(task);

            if (task) {
                res.send({ ok: true, result: task })
            } else {
                res.send({ ok: false, result: ROUTE_ERROR })
            }
        } else {
            res.send({ ok: false, result: ROUTES_ERROR_MISSING_BODY_PARAMS })
        }

    })
}


// const updateContact = async (app) => {
//     app.post('/contact/update', async (req, res) => {

//         let body = req.body
       

//         if (req.query._id) {
//             const contact = await Task.revise(body ,  req.query._id)
//             console.log(contact);

//             if (contact) {
//                 res.send({ ok: true, result: contact })
//             } else {
//                 res.send({ ok: false, result: ROUTE_ERROR })
//             }
//         } else {
//             res.send({ ok: false, result: ROUTES_ERROR_MISSING_BODY_PARAMS })
//         }

//     })
// }




// const getContacts = async (app) => {
//     app.get('/contact/get', async (req, res) => {

//         const contact = await Task.getAll()

//         if (contact.length > 0) {
//             res.send({ ok: true, result: contact })
//         } else {
//             res.send({ ok: false, result: ROUTE_ERROR })
//         }


//     })
// }


const getTasksPagination = async (app) => {
    app.get('/task/pagination/get', async (req, res) => {

        let page = req.query.page;
        let limit = req.query.limit;

        const tasks = await Task.getPagination(parseInt(limit), parseInt(page))


        if (tasks.length > 0) {
            res.send({ ok: true, result: tasks })
        } else {
            res.send({ ok: false, result: ROUTE_ERROR })
        }


    })
}


// const searchByName = async (app) => {
//     app.get('/contact/search/name/get', async (req, res) => {

//         let keyword = req.query.keyword;

//         const contacts = await Task.getAll()
//         if (contacts.length > 0) {

//             let char = keyword.toLowerCase()

//             const p = Array.from(char).reduce((a, v, i) => `${a}[^${char.substr(i)}]*?${v}`, '');
//             const re = RegExp(p);
    
//             let match_contacts = contacts.filter(contact => contact.name.toLowerCase().match(re));
            
//             res.send({ ok: true, result: match_contacts })
//         } else {
//             res.send({ ok: false, result: ROUTE_ERROR })
//         }


//     })
// }





