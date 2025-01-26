<template>
  <div class="h-svh flex flex-col mx-auto w-2xl py-12 sm:py-20 gap-5">
    <div class="flex justify-between">
      <h1 class="text-2xl">{{ $t('app.title') }}</h1>
      <el-select v-model="$i18n.locale" size="small">
        <el-option label="English" value="en"></el-option>
        <el-option label="中文" value="zh"></el-option>
      </el-select>
    </div>
    <el-card class="w-full" body-style="padding: 0">
      <div slot="header">
        aaa
      </div>
      <div class="h-96 overflow-y-auto pl-5 pt-5">
        bbb
      </div>
      <el-divider></el-divider>
      <div class="px-5 pb-5 flex items-center justify-between">
        <div>{{ $t('app.itemsLeft', { count: 10 }) }}</div>
        <el-radio-group v-model="visibility">
          <el-radio-button label="all">{{ $t('app.filter.all') }}</el-radio-button>
          <el-radio-button label="active">{{ $t('app.filter.active') }}</el-radio-button>
          <el-radio-button label="completed">{{ $t('app.filter.completed') }}</el-radio-button>
        </el-radio-group>
        <el-button type="text">{{ $t('app.clearCompleted') }}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    editedTodo: null,
    visibility: 'all',
  }),
}
</script>
