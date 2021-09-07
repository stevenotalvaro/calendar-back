const express = require('express')
const {dbConnection} = require('./database/config')
require('dotenv').config()
const cors = require('cors')

// create the server of express
const app = express()

//create database
dbConnection()

//CORS
app.use(cors())

// Public directory
app.use(express.static('public'))

//reading and parseo of body
app.use(express.json())

// Routes
app.use('/api/auth', require('./routers/auth'))
app.use('/api/events', require('./routers/event'))

//lisening petitions
app.listen(process.env.PORT, () => {
    console.log(`Server run in host ${process.env.PORT}`)
})
