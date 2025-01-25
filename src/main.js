import ElementUI from "element-ui"
import Vue from "vue"
import "element-ui/lib/theme-chalk/index.css"
import App from "./App.vue"
import "./globals.css"
import locale from "element-ui/lib/locale/lang/en"

Vue.use(ElementUI, { locale })

new Vue({
  el: "#app",
  render: (h) => h(App),
})
