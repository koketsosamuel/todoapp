const mongoose = require('mongoose')

let todoSchema = mongoose.Schema({
  todo: String
})


let Todos = mongoose.model('Todos', todoSchema)


module.exports = Todos