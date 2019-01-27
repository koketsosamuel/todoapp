const Todo = require('../models/todos')

module.exports.getAll = (req, res) => {
 
  let perPage = 5
  let page = req.params.page || 1

  Todo
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, todos) {
          Todo.countDocuments().exec(function(err, count) {
              if (err) return next(err)

              let results = {
                todos: todos,
                page: page,
                pages: Math.ceil(count / perPage)

              }

              res.json(
                  results
              )
          })
      })

}


module.exports.getOneTodo = (req, res) => {

  Todo.findOne({_id: req.params.id}, (err, todo) => {
    if (err) throw err
    res.json(todo)
  })

}


module.exports.removeTodo = (req, res) => {

  Todo.findOneAndRemove({_id: req.params.id}, err => {
    if (err) throw err
    res.sendStatus(201)
  })

}


module.exports.addTodo = (req, res) => {

  let todo = new Todo({
    todo: req.body.todo
  })

  todo.save(err => {
    if (err) throw err
    res.sendStatus(201)
  })

}


module.exports.updateTodo = (req, res) => {

  Todo.findOneAndUpdate({_id: req.params.id}, {todo: req.body.todo}, err => {
    if (err) throw err
    res.sendStatus(202)
  })

}