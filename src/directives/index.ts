import Vue from 'vue'
import focus from './focus'

const directives = {
  focus
}

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

