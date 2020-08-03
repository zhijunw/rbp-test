export default {
  getBpmnTempate() {
    return '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">' +
          '<bpmn2:process id="Process_1" isExecutable="true">' +
            '<bpmn2:startEvent id="Event_1v5mu2i">' +
              '<bpmn2:outgoing>Flow_1211slk</bpmn2:outgoing>' +
            '</bpmn2:startEvent>' +
            '<bpmn2:endEvent id="Event_0modof4">' +
              '<bpmn2:incoming>Flow_1ur31w6</bpmn2:incoming>' +
            '</bpmn2:endEvent>' +
            '<bpmn2:sequenceFlow id="Flow_1211slk" sourceRef="Event_1v5mu2i" targetRef="Activity_10330to" />' +
            '<bpmn2:sequenceFlow id="Flow_17rgzas" sourceRef="Activity_10330to" targetRef="Activity_0yo5eza" activiti:condition="${(quantity&#60;=1)}">' +
              '<bpmn2:conditionExpression xsi:type="bpmn2:tFormalExpression">${(quantity&lt;=1)}</bpmn2:conditionExpression>' +
            '</bpmn2:sequenceFlow>' +
            '<bpmn2:sequenceFlow id="Flow_1ur31w6" sourceRef="Activity_0yo5eza" targetRef="Event_0modof4" />' +
            '<bpmn2:userTask id="Activity_10330to" name="12" activiti:candidateGroups="admin">' +
              '<bpmn2:incoming>Flow_1211slk</bpmn2:incoming>' +
              '<bpmn2:outgoing>Flow_17rgzas</bpmn2:outgoing>' +
            '</bpmn2:userTask>' +
            '<bpmn2:userTask id="Activity_0yo5eza" activiti:candidateGroups="admin">' +
              '<bpmn2:incoming>Flow_17rgzas</bpmn2:incoming>' +
              '<bpmn2:outgoing>Flow_1ur31w6</bpmn2:outgoing>' +
            '</bpmn2:userTask>' +
          '</bpmn2:process>' +
          '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
            '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
              '<bpmndi:BPMNEdge id="Flow_1211slk_di" bpmnElement="Flow_1211slk">' +
                '<di:waypoint x="308" y="190" />' +
                '<di:waypoint x="364" y="190" />' +
                '<di:waypoint x="364" y="130" />' +
                '<di:waypoint x="420" y="130" />' +
              '</bpmndi:BPMNEdge>' +
              '<bpmndi:BPMNEdge id="Flow_17rgzas_di" bpmnElement="Flow_17rgzas">' +
                '<di:waypoint x="470" y="140" />' +
                '<di:waypoint x="470" y="185" />' +
                '<di:waypoint x="480" y="185" />' +
                '<di:waypoint x="480" y="230" />' +
              '</bpmndi:BPMNEdge>' +
              '<bpmndi:BPMNEdge id="Flow_1ur31w6_di" bpmnElement="Flow_1ur31w6">' +
                '<di:waypoint x="530" y="270" />' +
                '<di:waypoint x="676" y="270" />' +
                '<di:waypoint x="676" y="170" />' +
                '<di:waypoint x="822" y="170" />' +
              '</bpmndi:BPMNEdge>' +
              '<bpmndi:BPMNShape id="Event_1v5mu2i_di" bpmnElement="Event_1v5mu2i">' +
                '<dc:Bounds x="272" y="172" width="36" height="36" />' +
              '</bpmndi:BPMNShape>' +
              '<bpmndi:BPMNShape id="Event_0modof4_di" bpmnElement="Event_0modof4">' +
                '<dc:Bounds x="822" y="152" width="36" height="36" />' +
              '</bpmndi:BPMNShape>' +
              '<bpmndi:BPMNShape id="Activity_1j0f4sp_di" bpmnElement="Activity_10330to">' +
                '<dc:Bounds x="420" y="60" width="100" height="80" />' +
              '</bpmndi:BPMNShape>' +
              '<bpmndi:BPMNShape id="Activity_1o6sxrp_di" bpmnElement="Activity_0yo5eza">' +
                '<dc:Bounds x="430" y="230" width="100" height="80" />' +
              '</bpmndi:BPMNShape>' +
            '</bpmndi:BPMNPlane>' +
          '</bpmndi:BPMNDiagram>' +
        '</bpmn2:definitions>'
  }
}
