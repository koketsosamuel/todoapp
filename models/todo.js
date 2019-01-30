const mongoose = require('mongoose')

let todoSchema = mongoose.Schema({
  todo: String
})


let Todo = mongoose.model('Todo', todoSchema)


module.exports = Todo