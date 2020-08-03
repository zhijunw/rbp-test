<template>
  <div class="bpmn-container">
    <div class="designer-save-btn">
      <div class="edit-btn">
        <p class="f14 bpmn-name">
          {{ routeParams.name }}-{{ routeParams.groupName }}
        </p>
        <base-input :value.sync="bpmnName" />
      </div>
      <div class="btn-group">
        <el-button
          plain
          @click="close">
          {{ $t('layout.btns.cancel') }}
        </el-button>
        <el-button
          plain
          @click="saveXml">
          {{ $t('layout.btns.save') }}
        </el-button>
      </div>
    </div>

    <div class="containers">
      <el-container>
        <el-aside
          width="75%"
          style="border: 1px solid #DCDFE6">
          <div class="btn-group">
            <el-button
              icon="el-icon-info"
              class="watchXml"
              @click="watchXML">
              查看xml
            </el-button>
            <!-- <el-button
            icon="el-icon-download"
            @click="saveSVG">
            下载svg
          </el-button> -->
            <!-- <el-button
            icon="el-icon-download"
            @click="saveXml">
            保存
          </el-button> -->
          </div>

          <div
            ref="canvas"
            style="width: 100%;height: 100%" />
        </el-aside>
        <el-main style="border: 1px solid #DCDFE6;background-color:#FAFAFA;padding: 16px 10px;">
          <el-form
            label-width="auto"
            size="mini"
            label-position="top">
            <!-- 动态显示属性面板 -->
            <component
              :is="propsComponent"
              :key="key"
              :element="element" />
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Provide } from 'vue-property-decorator'

import BpmnModeler from 'bpmn-js/lib/Modeler'
import bpmnHelper from './js/bpmnHelper.js'
// 以下为bpmn工作流绘图工具的样式
import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css' // 右边工具栏样式
import customTranslate from './components/customTranslate/customTranslate.js'
import ElementCompantMap from './js/ElementCompantMap.js'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import customModule from './components/customer/index.js'
import BpmData from './js/BpmData.js'
import apiUrl from '@/api/audit-activity/create-activity'
import mock from './js/mock'
import { Dictionary } from '@/typings'
const activitiModdleDescriptor = require('./js/activiti.json')

// import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

@Component({
  name: 'bpmnView',
  components: {
    CommonProps: () => import('./CommonProps.vue'),
    UserTaskProps: () => import('./UserTaskProps.vue'),
    SequenceFlowProps: () => import('./SequenceFlowProps.vue'),
    StartEventProps: () => import('./StartEventProps.vue'),
    EndEventProps: () => import('./EndEventProps.vue'),
    baseInput: () => import('@/components/base-input/index.vue')
  }
})
export default class App extends Vue {
  @Provide('bpmnModelerOver') bpmnModelerOver = this.getBpmnModeler
  bpmnModeler: any = null
  propsComponent: string = 'CommonProps'
  key: string = '1'
  bpmData = new BpmData()
  element: any = null
  bpmnName: string = ''
  routeParams: Dictionary = {}

  @Watch('$route',{immediate: true})
  onRouteChange(val, newlVal) {
    console.log('bpmnView val',val)
    if (val.name === 'bpmnView' && val.params.flowType) {
      this.createNewDiagram()
    }
  }
  mounted() {
     this.$nextTick(() => {
      this.initBpmn()
    })
  }


  initBpmn() {
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas

    var customTranslateModule = {
      translate: ['value', customTranslate]
    }
    // 建模
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      // 添加控制板
      //  propertiesPanel: {
      //    parent: '#js-properties-panel'
      //  },
      additionalModules: [
        customTranslateModule
        //    customModule
        //    // 右边的属性栏
        //    propertiesProviderModule,
        //    propertiesPanelModule
      ],
      moddleExtensions: {
        activiti: activitiModdleDescriptor
      }
    })
    this.createNewDiagram()
    //  this.importBpmnXml()
  }
  close() {
    const view = {
      name: 'bpmnView',
      path: '/auditActivity/bpmnView'
    }
    this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
      this.toLastView(visitedViews, view)
    })
  }

  toLastView(visitedViews, view) {
    const auditConfigView = visitedViews.find((item) => item.name === 'auditConfig')
    let latestView: any = ''
    if (auditConfigView) {
      latestView = auditConfigView
    } else {
      latestView = visitedViews.slice(-1)[0]
    }
    // const latestView = visitedViews.slice(-1)[0]
    if (latestView) {
      this.$router.push(latestView)
    } else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (view.name === 'Dashboard') {
        // to reload home page
        this.$router.replace({ path: '/redirect' + view.fullPath })
      } else {
        this.$router.push('/')
      }
    }
  }
  saveXml() {
    const that = this
    if (!this.bpmnName) {
      this._message({ message: '请先输入工作流名称', type: 'warning' })
      return
    }
    that.bpmnModeler.saveXML({ format: true }, async function(err, xml) {
      if (err) {
        console.error('流程数据生成失败')
        console.log(err)
        return
      }
      // const modelId = '700001'
      const res = await that._post({
        url: apiUrl.create,
        data: {
          data: {
            moduleId: that.routeParams.id,
            flowType: that.routeParams.flowType,
            flowName: that.bpmnName,
            moduleFlowDetailId: that.routeParams.moduleFlowDetailId,
            resourceText: xml
          }
        }
      })
      if (res.code === 0) {
        that._message({ message: '创建成功', type: 'success' })
        setTimeout(() => {
          that.close()
        }, 1000)
      }
    })
  }

  getBpmnModeler() {
    return this.bpmnModeler
  }
  createNewDiagram() {
    //  const bpmnXml = bpmnHelper.getBpmnTempate()
    console.log('createBpmn',this.$route)
    this.routeParams = this.$route.params
    this.bpmnName = this.$route.params.flowName
    const bpmnXml = this.routeParams.xmlJson ? this.routeParams.xmlJson : bpmnHelper.getBpmnTempate()

    //  const bpmnXml = mock.getBpmnTempate()
    this.transformCanvas(bpmnXml)
  }
  transformCanvas(bpmnXmlStr) {
    // 将字符串转换成图显示出来
    this.bpmnModeler.importXML(bpmnXmlStr, (err) => {
      if (err) {
        console.log('bpmn文档导入失败')
      } else {
        this.success()
      }
      // 让图能自适应屏幕
      var canvas = this.bpmnModeler.get('canvas')
      canvas.zoom('fit-viewport')
    })
  }
  success() {
    // console.log('创建成功!')
    // const elementRegistry = this.bpmnModeler.get('elementRegistry')
    // const shape = elementRegistry.get('Process_1')
    // this.element = shape
    //    给图绑定事件
    //  this.addBpmnListener()
    //    添加事件是为了根据对应的 shape.type 去显示右边的面板
    //    监听modeler并绑定事件
    this.addModelerListener()
    //    element 点击事件
    this.addEventBusListener()
    // 调控左侧工具栏
    this.adjustPalette()
  }
  //  查看 xml
  watchXML() {
    this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
      if (err) {
        console.log(err)
        return
      }
      console.log(xml)
    })
  }
  saveSVG() {}
  addModelerListener() {
    const bpmnjs = this.bpmnModeler
    const that = this
    // 这里我是用了一个forEach给modeler上添加要绑定的事件
    // shape.added 新增模型 move.end 模型移动 connect 线的移动
    const events = ['shape.added', 'shape.move.end', 'shape.removed', 'connect.end', 'connect.move']
    events.forEach(function(event) {
      that.bpmnModeler.on(event, (e) => {
        //    var elementRegistry = bpmnjs.get('elementRegistry')
        var shape = e.element ? that.getShape(e.element.id) : e.shape
        if (event === 'shape.added') {
          that.key = e.element.id.replace('_label', '')
          that.propsComponent = ElementCompantMap[shape.type]
          console.log('新增了shape propsComponent', that.propsComponent, 'key', that.key)
          that.element = e.element
        } else if (event === 'shape.move.end') {
          that.key = e.element.id.replace('_label', '')
          that.propsComponent = ElementCompantMap[shape.type]
          console.log('移动了shape propsComponent', that.propsComponent, 'key', that.key)
          that.element = e.element
        } else if (event === 'shape.removed') {
          console.log('删除了shape')
          //  that.propsComponent = 'CommonProps'
        }
      })
    })
  }

  addEventBusListener() {
    const that = this
    const eventBus = this.bpmnModeler.get('eventBus') // 需要使用eventBus
    //    const elementRegistry = this.bpmnModeler.get('elementRegistry')
    const eventTypes = ['element.click', 'element.changed'] // 需要监听的事件集合
    eventTypes.forEach(function(eventType) {
      eventBus.on(eventType, function(e) {
        //  跟节点的点击不予处理
        //    if (!e || e.element.type === 'bpmn:Process') return
        if (eventType === 'element.changed') {
          console.log('element.changed 改变了')
          that.elementChanged(e)
        } else if (eventType === 'element.click') {
          var shape = e.element ? that.getShape(e.element.id) : e.shape
          console.log('点击了element', shape)
          //  这里是触发了根节点
          if (!e || e.element.type === 'bpmn:Process') {
            that.key = '1'
            that.propsComponent = 'CommonProps'
            that.element = e.element
          } else {
            // 展示新增图形的属性
            that.key = e.element.id
            that.propsComponent = ElementCompantMap[shape.type] || 'CommonProps'
            that.element = e.element
          }
        }
      })
    })
  }
  // 调整左侧工具栏排版
  adjustPalette() {
    try {
      // 获取 bpmn 设计器实例
      const canvas: any = this.$refs.canvas
      const djsPalette = canvas.children[0].children[1].children[4]
      const djsPalStyle = {
        width: '130px',
        padding: '5px',
        background: 'white',
        left: '20px',
        borderRadius: 0
      }
      for (var key in djsPalStyle) {
        djsPalette.style[key] = djsPalStyle[key]
      }
      const palette = djsPalette.children[0]
      const allGroups = palette.children
      console.log('adjustPalette allGroups', allGroups)
      allGroups[0].style['display'] = 'none'
      allGroups[4].style['display'] = 'none'
      allGroups[5].style['display'] = 'none'
      allGroups[6].style['display'] = 'none'
      allGroups[7].style['display'] = 'none'
      // 修改控件样式
      for (var gKey in allGroups) {
        const group = allGroups[gKey]
        for (var cKey in group.children) {
          const control = group.children[cKey]
          const controlStyle = {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            padding: '5px'
          }
          if (control.className && control.dataset && control.className.indexOf('entry') !== -1) {
            const controlProps = this.bpmData.getControl(control.dataset.action)
            control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:15px;'>${controlProps['title']}</div>`
            for (var csKey in controlStyle) {
              control.style[csKey] = controlStyle[csKey]
            }
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  elementChanged(e) {
    var shape = this.getShape(e.element.id)
    if (!shape) {
      // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
      console.log('无效的shape')
      // 上面已经用 shape.removed 检测了shape的删除, 要是删除shape的话这里还会被再触发一次
      console.log('删除了shape和connect')
      return
    }
    if (!this.isInvalid(shape.type)) {
      if (this.isSequenceFlow(shape.type)) {
        console.log('改变了线')
      } else {
        console.log('面板值更新了')
        this.setDefaultProperties()
      }
    }
  }
  setDefaultProperties() {
    const that = this
    const { element } = that
    if (element) {
      // 这里可以拿到当前点击的节点的所有属性
      const { type, businessObject } = element
      console.log('setDefaultProperties, businessObject', businessObject, type)
      const { name } = businessObject
      if (that.verifyIsEvent(type)) {
        const eventType = businessObject.eventDefinitions
          ? businessObject.eventDefinitions[0]['$type']
          : ''
        console.log('setDefaultProperties eventType', eventType)
      } else if (this.verifyIsTask(type)) {
        const taskType = type
        console.log('setDefaultProperties taskType', taskType)
      }
      that.element['name'] = name || ''
    }
  }
  verifyIsEvent(type) {
    return type.includes('Event')
  }
  verifyIsTask(type) {
    return type.includes('Task')
  }
  getShape(id) {
    var elementRegistry = this.bpmnModeler.get('elementRegistry')
    return elementRegistry.get(id)
  }
  isInvalid(param) {
    // 判断是否是无效的值
    return param === null || param === undefined || param === ''
  }
  isSequenceFlow(type) {
    // 判断是否是线
    return type === 'bpmn:SequenceFlow'
  }

  //  addBpmnListener() {
  //    const that = this
  //    // 给图绑定事件，当图有发生改变就会触发这个事件
  //    this.bpmnModeler.on('commandStack.changed', function() {
  //      // eslint-disable-next-line handle-callback-err
  //      that.saveDiagram(function(err, xml) {
  //        //    console.log(xml) // 这里获取到的就是最新的xml信息
  //      })
  //    })
  //  }
}
</script>

<style lang="scss">
@import 'css/app.scss';
</style>
<style lang="scss" scoped>
@import 'css/app.scss';

.designer-save-btn {
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid #eee;
  margin-bottom: 6px;
  background: #fff;
  margin: 8px;
  padding: 8px 12px;
  border-radius: 4px;
}
.bpmn-name{
    margin-right: 10px;
    padding-left: 5px;
    border-left: 3px solid #186CFF;
}
.edit-btn {
  display: flex;
  align-items: center;
}

.containers {
  display: flex;
  width: calc(100vw-188px);
  height: 90vh;
  margin: 8px;
  background: white;
  box-shadow: 0px 2px 8px 0px rgba(166, 167, 173, 0.5);
  border-radius: 4px;
  padding: 16px;
  .btn-group {
    display: block;
    text-align: right;
    padding: 6px;
  }
}
.canvas {
  width: 100%;
  height: 100%;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}
</style>
