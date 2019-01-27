const express = require('express')
const router = express.Router()
const todoController = require('../contollers/todoController')
const mongooose = require('mongoose')

// ROUTES
router.get('/todos/:page', todoController.getAll)
router.post('/', todoController.addTodo)
router.delete('/:id', todoController.removeTodo)
router.get('/:id', todoController.getOneTodo)
router.put('/:id', todoController.updateTodo)


// EXPORTATION
module.exports = router