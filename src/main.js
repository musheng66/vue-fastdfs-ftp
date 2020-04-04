import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element-ui/element.js' // 引入 element-ui

import './permission' // 权限

import '@/styles/index.scss' // 全局 css

import '@/assets/icons' // svg-icon
import i18n from './locales/i18n'

// import './errorLog' // error log

// 框选插件
import vueDragSelectPro from 'vue-drag-select-pro'
import 'vue-drag-select-pro/lib/vueDragSelectPro.css'
Vue.use(vueDragSelectPro)

/**
 * If you don't want to use mock-server
 * you want to use mockjs for request interception
 * you can execute:
 *
 * import { mockXHR } from '../mock'
 * mockXHR()
 */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
