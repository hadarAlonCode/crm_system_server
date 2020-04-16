import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import * as _ from 'lodash'
require('dotenv').config()
const API_KEY = process.env.API_KEY
// import { sendErrorMail } from '../../tools/error_tools'
// import { failedBody } from '../../tools/routing_tools'
// import somerouts from './somerouts'
// import somerouts from './somerouts'
// import somerouts from './somerouts'

const contactRouts = require("../contact_routs/contactRouts.js")
const taskRouts = require("../task_routs/taskRouts.js")


module.exports = (app) => {

    const ProtectedRoutes = express.Router()
    app.use('/secure', ProtectedRoutes)
    
    ProtectedRoutes.use((req, res, next) => {
        const token = req.headers['access-token']
        console.log(token, "sssssssssssssssssssssss");
        
        if (token) {
            jwt.verify(token, API_KEY, (err, decoded) => {
                if (err) {
                    return res.json({ok: false , result:'invalid token'})  
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.send({ok: false , result:'missing token'})
        }
    })

    
    contactRouts(ProtectedRoutes)
    taskRouts(ProtectedRoutes)
}




