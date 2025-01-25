<template>
  <div class="h-svh flex flex-col items-center p-12 sm:py-20 gap-5">
    <h1 class="text-2xl">Todos</h1>
    <el-card class="w-2xl" body-style="padding: 0">
      <div slot="header">
        Input
      </div>
      <div class="h-96 overflow-y-auto pl-5 pt-5">
        <div v-for="o in 100" :key="o">
          {{ 'Item ' + o }}
        </div>
      </div>
      <el-divider></el-divider>
      <div class="px-5 pb-5 flex items-center justify-between">
        <div><span class="text-red-500">10</span> items left</div>
        <div>
          <el-radio-group v-model="visibility">
            <el-radio-button label="all">All</el-radio-button>
            <el-radio-button label="active">Active</el-radio-button>
            <el-radio-button label="completed">Completed</el-radio-button>
          </el-radio-group>
        </div>
        <el-button type="text">Clear completed</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    todos: JSON.parse(localStorage.getItem("todos")) || [],
    editedTodo: null,
    visibility: "all",
  }),
  methods: {},
}
</script>
