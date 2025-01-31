import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'
import './globals.css'

Vue.use(ElementUI)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
