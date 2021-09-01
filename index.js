const express = require('express')
require('dotenv').config()
console.log(process.env)
// create the server of express
const app = express()

// Public directory
app.use(express.static('public'))

// Routes
app.use('/api/auth', require('./routers/auth'))

//lisening petitions
app.listen(process.env.PORT, () => {
    console.log(`Server run in host ${process.env.PORT}`)
})
