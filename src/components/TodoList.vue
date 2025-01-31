<template>
  <div v-if="filteredTodos.length > 0" class="flex flex-col gap-1.5">
    <div v-for="todo in filteredTodos" :key="todo.id">
      <el-input v-model="todo.title" v-if="todo === editedTodo" size="small" :ref="`input-${todo.id}`"
        @blur="doneEdit(todo)" @keyup.enter.native="doneEdit(todo)" @keyup.escape.native="cancelEdit(todo)" />
      <div v-else class="flex w-full items-center gap-2 group">
        <el-checkbox v-model="todo.completed" @change="$emit('update:todos', todos)" />
        <div class="flex-1 text-sm" :class="{ 'line-through opacity-50': todo.completed }" @dblclick="editTodo(todo)">
          {{ todo.title }}
        </div>
        <el-button class="ml-auto opacity-0 group-hover:opacity-100" type="danger" icon="el-icon-delete" size="mini"
          circle @click="deleteTodo(todo)" />
      </div>
    </div>
  </div>
  <el-empty v-else description="暂无待办事项" />
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: true
    },
    visibility: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      editedTodo: null,
      beforeEditCache: ''
    }
  },
  computed: {
    filteredTodos() {
      return this.todos.filter(todo => {
        switch (this.visibility) {
          case 'active': return !todo.completed
          case 'completed': return todo.completed
          default: return true
        }
      })
    }
  },
  methods: {
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
      this.$emit('update:todos', this.todos)
    },
    cancelEdit(todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },
    deleteTodo(todo) {
      const index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
      this.$emit('update:todos', this.todos)
    }
  }
}
</script>
