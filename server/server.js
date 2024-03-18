require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const eventRoutes = require('./routes/events')
const userRoutes = require('./routes/user')
const clubRoutes= require('./routes/clubs')

// Express app
const app = express()


// Middlewares
app.use(express.json())                 // json parser
app.use(morgan('dev'))         // log api calls

// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })



// routes
app.use('/api/events/',eventRoutes)
app.use('/api/user',userRoutes)
app.use('/api/clubs',clubRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        //connect to server
        const PORT = process.env.PORT || 4000
        app.listen(PORT, () => {
            console.log(`Sever is running on port ${PORT}.`)
        })

    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error.message)
    })

//console.log("israr karim fixed");