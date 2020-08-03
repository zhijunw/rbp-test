// export const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
// <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="5.1.2">
// <process id="Process_1" isExecutable="false">
//     <startEvent id="StartEvent_1y45yut" name="开始">
//     <outgoing>SequenceFlow_0h21x7r</outgoing>
//     </startEvent>
//     <task id="Task_1hcentk">
//     <incoming>SequenceFlow_0h21x7r</incoming>
//     </task>
//     <sequenceFlow id="SequenceFlow_0h21x7r" sourceRef="StartEvent_1y45yut" targetRef="Task_1hcentk" />
// </process>
// <bpmndi:BPMNDiagram id="BpmnDiagram_1">
//     <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
//     <bpmndi:BPMNShape id="StartEvent_1y45yut_di" bpmnElement="StartEvent_1y45yut">
//         <omgdc:Bounds x="152" y="102" width="36" height="36" />
//         <bpmndi:BPMNLabel>
//         <omgdc:Bounds x="160" y="145" width="22" height="14" />
//         </bpmndi:BPMNLabel>
//     </bpmndi:BPMNShape>
//     <bpmndi:BPMNShape id="Task_1hcentk_di" bpmnElement="Task_1hcentk">
//         <omgdc:Bounds x="240" y="80" width="100" height="80" />
//     </bpmndi:BPMNShape>
//     <bpmndi:BPMNEdge id="SequenceFlow_0h21x7r_di" bpmnElement="SequenceFlow_0h21x7r">
//         <omgdi:waypoint x="188" y="120" />
//         <omgdi:waypoint x="240" y="120" />
//     </bpmndi:BPMNEdge>
//     </bpmndi:BPMNPlane>
// </bpmndi:BPMNDiagram>
// </definitions>`
const getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject
export default {

  getBpmnTempate() {
    return '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://activiti.org/bpmn">' +
        '<bpmn2:process id="Process_1" isExecutable="true">' +
        '</bpmn2:process>' +
        '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
        '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
        '</bpmndi:BPMNPlane>' +
        '</bpmndi:BPMNDiagram>' +
        '</bpmn2:definitions>'
  },
  // 设置元素
  // setElement(element, vm) {
  //   if (element === undefined) {
  //     element = vm.bpmnModeler.get('canvas').getRootElement()
  //   }
  //   vm.propsComponent = this.getComponentByEleType(element.type)
  //   vm.element = element
  // },

  isImplicitRoot(element) {
    return element.id === '__implicitroot'
  },
  // 更新模型属性
  updateProperties(element, properties) {
    const bo = getBusinessObject(element)
    Object.keys(properties).forEach(key => {
      bo.set(key, properties[key])
    })
  },
  // 通过命令更新属性
  updatePropertiesByCmd(element, commandStack, properties) {
    commandStack.execute('element.updateProperties', { element: element, properties: properties })
  },
  // 获取元素的属性
  getProperties(element, propNames) {
    const bo = this.getBo(element)
    const properties = {}
    for (const propName of propNames) {
      properties[propName] = bo.get(propName)
    }
    return properties
  },
  // 获取单个元素属性
  getPropertie(element, propName) {
    const bo = this.getBo(element)
    return bo.get(propName)
  },

  // 获取元素的模型对象
  getBo(element) {
    return getBusinessObject(element)
  },
  // 通过元素类型获取相应的组件
  // getComponentByEleType(type) {
  //   return ElementCompantMap[type]
  // },
  // 创建一个元素
  createElement(vm, elementName, properties) {
    const bpmnFactory = vm.bpmn.bpmnFactory
    return bpmnFactory.create(elementName, properties)
  }
}
