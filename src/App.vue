<template>
  <div class="min-h-svh flex flex-col mx-auto w-xl py-12 gap-5">
    <el-card class="w-full">
      <div slot="header">
        <el-input v-model="newTodo" @keyup.enter.native="addTodo" autofocus placeholder="今天要干啥？" size="mini" clearable
          maxlength="50" show-word-limit>
          <el-button size="mini" slot="prepend" icon="el-icon-check" @click="toggleAll" />
        </el-input>
      </div>
      <div v-if="filteredTodos.length > 0" class="flex flex-col gap-1">
        <div v-for="todo in filteredTodos" :key="todo.id">
          <el-input v-model="todo.title" v-if="todo === editedTodo" size="mini" :ref="`input-${todo.id}`"
            @blur="doneEdit(todo)" @keyup.enter.native="doneEdit(todo)" @keyup.escape.native="cancelEdit(todo)" />
          <div v-else class="flex w-full items-center gap-2 group">
            <el-checkbox v-model="todo.completed" />
            <div class="flex-1 text-sm" :class="{ 'line-through opacity-50': todo.completed }"
              @dblclick="editTodo(todo)">
              {{ todo.title }}
            </div>
            <el-button class="ml-auto opacity-0 group-hover:opacity-100" type="danger" icon="el-icon-delete" size="mini"
              circle @click="deleteTodo(todo)"></el-button>
          </div>
        </div>
      </div>
      <el-empty v-else description="暂无待办事项" />
      <div v-if="todos.length > 0">
        <el-divider></el-divider>
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="6" class="text-left">
            <el-tag size="mini">还有 {{ remaining }} 项待办</el-tag>
          </el-col>
          <el-col :span="12" class="text-center">
            <el-radio-group v-model="visibility" size="mini">
              <el-radio-button label="all">全部</el-radio-button>
              <el-radio-button label="active">未完成</el-radio-button>
              <el-radio-button label="completed">已完成</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="6" class="text-right">
            <el-button type="text" size="mini" @click="clearCompleted" v-show="todos.length > remaining">
              清除已完成
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
const STORAGE_KEY = 'vue2-todomvc'

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed),
}

export default {
  data: () => ({
    todos: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
      { id: 1, title: '吃饭', completed: false },
      { id: 2, title: '睡觉', completed: false },
      { id: 3, title: '打豆豆', completed: false },
    ],
    editedTodo: null,
    visibility: 'all',
    newTodo: '',
    beforeEditCache: '',
  }),
  watch: {
    todos: {
      handler(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
      },
      deep: true,
    },
  },
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return filters.active(this.todos).length
    },
  },
  methods: {
    toggleAll() {
      const allCompleted = this.todos.every(todo => todo.completed)
      this.todos.forEach((todo) => todo.completed = !allCompleted)
    },
    clearCompleted() {
      this.todos = filters.active(this.todos)
    },
    addTodo() {
      const value = this.newTodo.trim()
      if (!value) return
      this.todos.push({
        id: this.todos.length + 1,
        title: value,
        completed: false,
      })
      this.newTodo = ''
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
      this.$nextTick(() => {
        this.$refs[`input-${todo.id}`][0].focus()
      })
    },
    doneEdit(todo) {
      if (!this.editedTodo) return
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.deleteTodo(todo)
      }
    },
    cancelEdit(todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
  },
}
</script>
