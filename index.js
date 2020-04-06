// import contactRouts from "./server/routs/contact_routs/contactRouts"

const contactRouts = require("./server/routs/contact_routs/contactRouts.js")
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

contactRouts(app)
// app.use('/', api)
// app.use('/', routes);
// require('./server/routs/contact_routs/contactRouts')(app);


const port = process.env.PORT || 5000

app.listen(port, function () {
    console.log(`Running on port ${port} CRM`)
})