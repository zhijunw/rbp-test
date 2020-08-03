import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'

import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate
} from 'tiny-svg'
import { customElements, customConfig } from '../../utils/index.js'
import { is } from 'bpmn-js/lib/util/ModelUtil'

const HIGH_PRIORITY = 1500

export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer, modeling) {
    super(eventBus, HIGH_PRIORITY)

    this.bpmnRenderer = bpmnRenderer
    this.modeling = modeling
  }

  canRender(element) {
    // ignore labels
    return !element.labelTarget
  }

  drawShape(parentNode, element) {
    console.log('drawShape', element)
    const type = element.type // 获取到类型
    if (customElements.includes(type)) { // or customConfig[type]
      const { url, attr } = customConfig[type]
      const customIcon = svgCreate('image', { // 在这里创建了一个image
        ...attr,
        href: url
      })
      element['width'] = attr.width // 这里我是取了巧, 直接修改了元素的宽高
      element['height'] = attr.height
      svgAppend(parentNode, customIcon)
      return customIcon
    }
    const shape = this.bpmnRenderer.drawShape(parentNode, element)
    return shape
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape)
  }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer', 'modeling']
