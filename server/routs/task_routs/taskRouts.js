
// @ts-nocheck


import { ROUTE_ERROR, ROUTES_ERROR_MISSING_BODY_PARAMS } from '../../tools/error'
const Task = require('../../models/task/Task')


module.exports = (app) => {
    createTask(app)
    getTasksPagination(app)
    updateTsak(app)
    deleteTsak(app)
}


const createTask = async (app) => {
    app.post('/task/create', async (req, res) => {

        if (req.body.text && req.body.user_key) {
            const task = await Task.createNew(req.body)

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


const updateTsak = async (app) => {
    app.post('/task/update', async (req, res) => {

        let body = req.body
       
        if (req.query._id) {
            const task = await Task.revise(body ,  req.query._id)

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



const deleteTsak = async (app) => {
    app.post('/task/delete', async (req, res) => {       

        if (req.query._id) {
            const task = await Task.destroy( req.query._id)

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



const getTasksPagination = async (app) => {
    app.get('/task/pagination/get', async (req, res) => {

        let page = req.query.page;
        let limit = req.query.limit;
        let user_key =  req.query.user_key;

        const tasks = await Task.getPagination(parseInt(limit), parseInt(page) , user_key)


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





