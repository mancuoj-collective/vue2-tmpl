<template>
  <div v-if="todosCount > 0">
    <el-divider />
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="6" class="text-left">
        <el-tag>还有 {{ remaining }} 项待办</el-tag>
      </el-col>
      <el-col :span="12" class="text-center">
        <el-radio-group :value="visibility" size="small" @input="$emit('update:visibility', $event)">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="active">未完成</el-radio-button>
          <el-radio-button label="completed">已完成</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-button type="text" size="small" @click="$emit('clear-completed')" v-show="todosCount > remaining">
          清除已完成
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    todosCount: {
      type: Number,
      required: true
    },
    remaining: {
      type: Number,
      required: true
    },
    visibility: {
      type: String,
      required: true
    }
  }
}
</script>
