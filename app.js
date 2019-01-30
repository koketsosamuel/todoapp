const express = require('express')
const bodyParse = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

// MY MODULES
const todoRoutes = require('./routes/todoRoutes')

// MONGOSE CONECTION
mongoose.connect(' mongodb://127.0.0.1:27017/todoapp', { useNewUrlParser: true })

const app = express()


// MIDDLEWARE
app.use(cors())
app.use(bodyParse.json())

// ROUTES
app.use('/todo', todoRoutes)


app.listen(3000)