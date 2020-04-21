import * as express from 'express'
import * as jwt from 'jsonwebtoken'
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY
import _ from 'lodash';


const contactRouts = require("../contact_routs/contactRouts.js")
const taskRouts = require("../task_routs/taskRouts.js")


module.exports = (app) => {

    const ProtectedRoutes = express.Router()
    app.use('/secure', ProtectedRoutes)
    
    ProtectedRoutes.use((req, res, next) => {
        const token = req.headers['access-token']
        
        if (token) {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.json({ok: false , result:'INVALID TOKEN'})  
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.send({ok: false , result:'MISSING TOKEN'})
        }
    })

    
    contactRouts(ProtectedRoutes)
    taskRouts(ProtectedRoutes)
}




