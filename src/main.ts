import Vue from 'vue'
import App from './App.vue'
import store from '@/store/index'
import router from './router/index'
import Element from 'element-ui'
// import ECharts from 'vue-echarts'
import i18n from '@/lang/index' // Internationalization

import 'normalize.css'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/theme/index.css'
import '@/styles/index.scss' // global css
import '@/styles/theme/common-theme.scss' // global css

import '@/plugin/error-log' // error log

import '@/iconfont/iconfont.css' // iconfont css

import '@/svg-icon/index' // icon
import '@/permission' // permission control
import '@/components/base-message/index' // vMessage
import '@/components/base-inform' // vInform
import '@/plugin/global'
import '@/directives/index'

// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/tooltip'

// Vue.component('chart', ECharts)
// set ElementUI lang to EN
Vue.use(Element, {
  size: 'medium',
  i18n: (key: string, value: string) => i18n.t(key, value)
})
Vue.config.devtools = true
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})
