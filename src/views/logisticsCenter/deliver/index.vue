<template>
  <div>
    <common-index
      :showTab="m_showTab"
      :configs="layoutConfigs"
      :layoutActiveTab="v_activeName"
      @change-tab="m_changeTab">
      <transition
        name="fade-transform"
        mode="out-in"
        :duration="{
          enter: 100,
          leave: 100
        }">
        <keep-alive>
          <component
            :is="v_activeName"
            :ref="v_activeName" />
        </keep-alive>
      </transition>
    </common-index>
    <integratedQuery :dictionary="moduleList" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { layoutConfigs, listConfig, detailConfig } from './configs/index'
import indexMixins from '@/mixins/index-mixins'
import registVuexModuleMixins from './configs/registVuex-module'
// import vuexMixins from './configs/vuex-module'
import { Dictionary, Response } from '@/typings'
import apiUrl from '@/api/sale-center/sale-plain'
// import { Tools } from '@/utils/tools'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { transformFields, nest } from '@/utils'

  @Component({
    name: 'salePlain',
    components: {
      list: () => import('./list.vue'),
      detail: () => import('./detail.vue'),
      integratedQuery: () => import('@/components/integrated-query/index.vue'),
      commonIndex: () => import('@/layout-components/common-index/index.vue')
    }
  })
export default class App extends mixins(indexMixins, vuexMixins, registVuexModuleMixins) {
    layoutConfigs = layoutConfigs
    moduleList: Dictionary = {
      moduleList: [
        {
          label: '字段配置',
          value: 1,
          lang: 'plannedOrder',
          en: 'Field Configuration'
        }
      ],
      formList: [
        {
          label: 'xxx报表1',
          value: 1,
          lang: 'plannedOrder',
          en: 'Form'
        }
      ]
    }
    path: string = 'ws://192.168.9.160:10010/websocket'
    socket: WebSocket
    // created() {
    //   this.init()
    // }
    // init() {
    //   if (typeof WebSocket === 'undefined') {
    //     alert('您的浏览器不支持socket')
    //   } else {
    //     // 实例化socket
    //     this.socket = new WebSocket(this.path)
    //     // 监听socket连接
    //     this.socket.onopen = this.open
    //     // 监听socket错误信息
    //     this.socket.onerror = this.error
    //     // 监听socket消息
    //     this.socket.onmessage = this.getMessage
    //     this.send(12)
    //   }
    // }
    // open() {
    //   console.log('socket连接成功')
    // }
    // error() {
    //   console.log('连接错误')
    // }
    // getMessage(msg) {
    //   console.log(msg.data)
    // }
    // send(params) {
    //   this.socket.send(params)
    // }
    // close() {
    //   console.log('socket已经关闭')
    // }

  // destroyed() {
  //   // 销毁监听
  //   this.socket.onclose = this.close
  // }
}
</script>
<style lang="scss" scoped></style>
