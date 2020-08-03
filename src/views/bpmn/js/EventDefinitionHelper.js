'use strict'
var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject
var is = require('bpmn-js/lib/util/ModelUtil').is

var EventDefinitionHelper = {}

module.exports = EventDefinitionHelper

EventDefinitionHelper.getEventDefinition = function(element, eventType) {
  var bo = getBusinessObject(element)
  var eventDefinition = null

  if (bo.eventDefinitions) {
    // forEach(bo.eventDefinitions, function(event) {
    //   if (is(event, eventType)) {
    //     eventDefinition = event
    //   }
    // })
    bo.eventDefinitions.forEach((event) => {
      if (is(event, eventType)) {
        eventDefinition = event
      }
    })
  }

  return eventDefinition
}
// 定时事件
EventDefinitionHelper.getTimerEventDefinition = function(element) {
  return this.getEventDefinition(element, 'bpmn:TimerEventDefinition')
}
// 消息事件
EventDefinitionHelper.getMessageEventDefinition = function(element) {
  return this.getEventDefinition(element, 'bpmn:MessageEventDefinition')
}
// 信号事件
EventDefinitionHelper.getSignalEventDefinition = function(element) {
  return this.getEventDefinition(element, 'bpmn:SignalEventDefinition')
}
// 错误事件
EventDefinitionHelper.getErrorEventDefinition = function(element) {
  return this.getEventDefinition(element, 'bpmn:ErrorEventDefinition')
}
// 升级事件
EventDefinitionHelper.getEscalationEventDefinition = function(element) {
  return this.getEventDefinition(element, 'bpmn:EscalationEventDefinition')
}
// 补偿启动事件
EventDefinitionHelper.getCompensateEventDefinition = function(element) {
  return this.getEventDefinition(element, 'bpmn:CompensateEventDefinition')
}
// 链接事件
EventDefinitionHelper.getLinkEventDefinition = function(element) {
  return this.getEventDefinition(element, 'bpmn:LinkEventDefinition')
}
// 条件启动事件
EventDefinitionHelper.getConditionalEventDefinition = function(element) {
  return this.getEventDefinition(element, 'bpmn:ConditionalEventDefinition')
}
