<template>
  <el-input v-model="newTodo" @keyup.enter.native="addTodo" autofocus placeholder="今天要干啥？" size="small" clearable
    maxlength="50" show-word-limit>
    <el-button size="mini" slot="prepend" icon="el-icon-check" @click="toggleAll" />
  </el-input>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
    }
  },
  methods: {
    addTodo() {
      const value = this.newTodo.trim()
      if (!value) return
      this.$emit('add-todo', {
        id: Date.now(),
        title: value,
        completed: false,
      })
      this.newTodo = ''
    },
    toggleAll() {
      this.$emit('toggle-all')
    }
  }
}
</script>
