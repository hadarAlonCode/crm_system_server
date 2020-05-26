// @ts-nocheck

const userRoutes = require("./server/routs/user_routs/userRouts.js")
const secureRoutes = require("./server/routs/secure_routs/secureRouts.js")
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/crmSystemDB', { useNewUrlParser: true })

app.use(bodyParser.json()) // tells the system that you want json to be used.
app.use(bodyParser.urlencoded({ extended: false })) //  parsing that can deal with nested objects 

app.use(cors())

app.get('/', (req, res) => {
    res.send({ H_A: true })
})

userRoutes(app)
secureRoutes(app)

const port = process.env.PORT || 5002


app.listen(port, function () {
    console.log(`Running on port ${port} CRM`)
})