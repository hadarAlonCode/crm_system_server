// @ts-nocheck

const contactRouts = require("./server/routs/contact_routs/contactRouts.js")
const taskRouts = require("./server/routs/task_routs/taskRouts.js")
const userkRouts = require("./server/routs/user_routs/userRouts.js")
const secureRouts = require("./server/routs/secure_routs/secureRouts.js")

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let cors = require('cors')
const mongoose = require('mongoose')

// const routes = require('./server/routs');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/crmSystemDB', { useNewUrlParser: true })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

app.get('/', (req, res) => {
    res.send({ H_A: true })
})

// contactRouts(app)
// taskRouts(app)
userkRouts(app)
secureRouts(app)


// app.use('/', api)
// app.use('/', routes);
// require('./server/routs/contact_routs/contactRouts')(app);


const port = process.env.PORT || 5002

app.listen(port, function () {
    console.log(`Running on port ${port} CRM`)
})