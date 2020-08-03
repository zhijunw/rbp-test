export default class CustomContextPad {
  constructor(config, contextPad, create, elementFactory, injector, translate, modeling, bpmnFactory) {
    this.create = create
    this.elementFactory = elementFactory
    this.translate = translate
    this.modeling = modeling
    this.bpmnFactory = bpmnFactory

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false)
    }

    contextPad.registerProvider(this) // 定义这是一个contextPad
  }

  getContextPadEntries(element) {
    const {
      autoPlace,
      create,
      elementFactory,
      translate,
      modeling,
      bpmnFactory
    } = this
    // 删除功能
    function removeElement(e) {
      modeling.removeElements([element])
    }

    function appendTask(event, element) {
      if (autoPlace) {
        const shape = elementFactory.createShape({ type: 'bpmn:Task' })
        autoPlace.append(element, shape)
      } else {
        appendTaskStart(event, element)
      }
    }

    function appendTaskStart(event) {
      const shape = elementFactory.createShape({ type: 'bpmn:Task' })
      create.start(event, shape, element)
    }

    function deleteElement() {
      return {
        group: 'edit',
        className: 'icon-custom icon-custom-delete',
        title: translate('删除'),
        action: {
          click: removeElement
        }
      }
    }

    function clickElement(e) {
      console.log('edit', element)
    }
    function editElement() { // 创建编辑图标
      return {
        group: 'edit',
        className: 'icon-custom icon-custom-edit',
        title: translate('编辑'),
        action: {
          click: clickElement
        }
      }
    }

    return {
      'append.lindaidai-task': {
        group: 'model',
        className: 'icon-custom lindaidai-task',
        title: translate('创建一个类型为lindaidai-task的任务节点'),
        action: {
          click: appendTask,
          dragstart: appendTaskStart
        }
      },
      'delete': deleteElement(),
      'edit': editElement() // 返回值加上编辑功能
    }
  }
}

CustomContextPad.$inject = [
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate',
  'modeling',
  'bpmnFactory'
]
