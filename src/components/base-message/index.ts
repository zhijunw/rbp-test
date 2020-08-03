import Vue from 'vue'
import Message from './src/main.js'

// 全局注册vMessage
Vue.prototype.$vMessage = Message
// 单独引入vMessage : import vMessage from 'components/VMessage/src/main.js'
