import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/common.less'
import '@/assets/iconfont/iconfont.css'

// 全部导入
// import Vant from 'vant'
// import 'vant/lib/index.css'

// Vue.use(Vant)
// 按需
// import { Button, Switch } from 'vant'
// Vue.use(Button)
// Vue.use(Switch)
// Vue.config.productionTip = false
import '@/utils/vant-ui.js'
// 全局使用toast
// import { Toast } from 'vant'
// Toast('hello')
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
