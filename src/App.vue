<template>
  <div class="min-h-svh flex flex-col mx-auto w-xl py-12 gap-5">
    <el-card class="w-full">
      <div slot="header">
        <todo-header @add-todo="addTodo" @toggle-all="toggleAll" />
      </div>
      <todo-list :todos.sync="todos" :visibility="visibility" />
      <todo-footer :todos-count="todos.length" :remaining="remaining" :visibility.sync="visibility"
        @clear-completed="clearCompleted" />
    </el-card>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

const STORAGE_KEY = 'vue2-todomvc'

export default {
  components: {
    TodoHeader,
    TodoList,
    TodoFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
        { id: 1, title: '吃饭', completed: true },
        { id: 2, title: '睡觉', completed: false },
        { id: 3, title: '打豆豆', completed: false },
      ],
      visibility: 'all',
    }
  },
  watch: {
    todos: {
      handler(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
      },
      deep: true,
    },
  },
  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.completed).length
    },
  },
  methods: {
    toggleAll() {
      const allCompleted = this.todos.every(todo => todo.completed)
      this.todos.forEach((todo) => todo.completed = !allCompleted)
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed)
    },
    addTodo(todo) {
      this.todos.push(todo)
    },
  },
}
</script>
