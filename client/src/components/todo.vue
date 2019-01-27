<template>

  <div>
    
    <div class="container">
    <div v-if="singleTodoUpdate != ''" class="modalBackground" @click="resetV"></div>
      <div v-if="singleTodoUpdate != ''" class="dialog bg-dark boder border-white p-4">
        <input type="text" v-model="singleTodoUpdate" class="form-control mb-4">
        <button class="btn-primary btn mr-2" @click="update(updateValues)">Update</button> <button class="btn btn-danger" @click="resetV()">Cancel</button>
      </div>

      <h1 class="display-1">Todos</h1>

      <input type="text" v-model="singleTodo" @keydown.enter="addTodo()" class="form-control my-4">

      <div class="list-group my-4">

        <p class="list-group-item bg-dark text-primary"
        @dblclick="removeTodo(todo)"
        v-for="todo in todos.todos"
        v-bind:key="todo._id"
        >
        {{todo.todo}}
        <button class="btn btn-primary float-right"
          @click="updateView(todo)"
        >EDIT</button>
        </p>

      </div>

      <nav aria-label="Page navigation" v-if="todos.pages > 1">
        <ul class="pagination pagination-md">
          <li class="page-item" id="prevNav">
            <a class="page-link" href="javascript: void(0)" @click="getTodos(Number(todos.page)-1)">
              <span>&laquo; PREV</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>

          <li class="page-item disabled">
            <a class="page-link" href="javascript: void(0)">
              <span>{{todos.page}} of {{todos.pages}}</span>
           
            </a>
          </li>
          
          
        


          <li class="page-item" id="nextNav">
            <a class="page-link" href="javascript: void(0)" aria-label="Next"  @click="getTodos(Number(todos.page)+1)">
              <span aria-hidden="true">NEXT &raquo; </span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>


    </div>
  </div>

</template>

<script>
import todoService from '../services/todoService'
import axios from 'axios'
import { async } from 'q';

export default {

  data() {
    return {

      todos: {},
      pages: [],
      singleTodo: '',
      updateValues: {},
      singleTodoUpdate: ''

    }
  },

  async created() {

      this.getTodos()
    
  },

  methods: {
    addTodo () {
      axios.post('http://localhost:3000/todo/', {todo: this.singleTodo})
        .then(async  () => {
          this.getTodos()
          this.singleTodo = ''
        })

    },

    removeTodo (todo) {
      
      axios.delete(`http://localhost:3000/todo/${todo._id}`)
        .then(() => {

          this.getTodos(1)
         
        })
    },

    updateView (todo) {

      axios.get(`http://localhost:3000/todo/${todo._id}`)
        .then(async (res) => {
          this.updateValues = res.data
          this.singleTodoUpdate = res.data.todo
        })
    },

    update (todo) {
      axios.put(`http://localhost:3000/todo/${todo._id}`, {todo: this.singleTodoUpdate})
        .then(async () => {
          this.getTodos(this.todos.page)
          this.resetV()
        })
    },

    resetV () {
      this.singleTodoUpdate = ''
      this.updateValues = {}
    },

    getTodos(pageNo) {
      let url = `http://localhost:3000/todo/todos/${pageNo || 1}`

      axios.get(url).then(async (data) => {

          // DATA ASSIGNMENT
          this.pages = []
          this.todos = await data.data

          // PAGINATION NAVS
          let prevNav = document.getElementById('prevNav')
          let nextNav = document.getElementById('nextNav')

          prevNav.classList.remove('disabled')
          nextNav.classList.remove('disabled')

          if(this.todos.page == this.todos.pages) {
            
            nextNav.classList.add('disabled')

          } else if(this.todos.page == 1) {
            
            prevNav.classList.add('disabled')

          } else {

            prevNav.classList.remove('disabled')
            nextNav.classList.remove('disabled')

          }
          
          

        }
      )

  }
}
}   
  
</script>

<style>

  * {
    transition: all 0.3s;
  }

  .dialog {
    width: 600px;
    height: 150px;
    margin: 20%;
    position: fixed;
    z-index: 99;
    border: #fff 3px solid;
  }

  .modalBackground {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: #09f;
    opacity: 0.3;
    z-index: 98;
    top: 0;
    left: 0;
  }
</style>

