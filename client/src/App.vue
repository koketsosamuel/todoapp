<template>
  <div id="app">
    <todo msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>


import todo from './components/todo'

export default {
  name: 'app',
  components: {
    todo
  }
}
</script>