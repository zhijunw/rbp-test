import Inform from './inform.vue'
import Vue from 'vue'
import { InformConfig } from '@/typings'
const InformSample = Vue.extend(Inform)
const InformInstance: any = {}

InformInstance.newInstance = (properties: object) => {
  const props = properties || {}

  const Instance = new InformSample({
    data: props
  })

  const component:any = Instance.$mount()

  document.body.appendChild(component.$el)

  return {
    add(item: InformConfig) {
      component.add(item)
    },
    confirm() {
      return component.confirm()
    }
  }
}

export default InformInstance
