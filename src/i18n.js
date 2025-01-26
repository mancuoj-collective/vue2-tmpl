import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    app: {
      title: 'Todos',
      itemsLeft: '{count} items left',
      filter: {
        all: 'All',
        active: 'Active',
        completed: 'Completed',
      },
      clearCompleted: 'Clear completed',
    },
  },
  zh: {
    ...zhLocale,
    app: {
      title: '待办事项',
      itemsLeft: '剩余 {count} 项',
      filter: {
        all: '全部',
        active: '进行中',
        completed: '已完成',
      },
      clearCompleted: '清除已完成',
    },
  },
}

export const i18n = new VueI18n({
  locale: 'en',
  messages,
})
