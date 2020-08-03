<template>
  <el-dialog
    class="CustomCPM"
    :visible.sync="visibleSync"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :append-to-body="true"
    :width="width || '500px'">
    <template slot="title">
      <span style="font-size: 14px;font-weight: bold">
        <i
          class="el-icon-info"
          style="color: #4666ff;font-size: 18px" />
        {{ title||'系统提醒' }}
      </span>
    </template>
    <template>
      <slot
        :name="slotName || 'default'"
        :data="data">
        <div class="content">
          {{ content }}
        </div>
      </slot>
    </template>
    <template slot="footer">
      <div v-if="!hideCancel || !hideConfirm">
        <el-button
          v-if="!hideCancel"
          class="footer-button"
          @click="buttonEvent(false)">
          {{ cancelText||'取消' }}
        </el-button>
        <el-button
          v-if="!hideConfirm"
          class="footer-button"
          type="primary"
          @click="buttonEvent(true)">
          {{ confirmText||'继续' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'

  @Component({
    name: 'Message'
  })
export default class App extends Vue {
    data: any = null
    visibleSync: boolean = false
    width: any = null
    content: string = ''
    callback: any = null
    hideTitle: boolean = false
    title: string = ''
    slotName: string = ''
    cancelText: string = ''
    confirmText: string = ''
    hideCancel: boolean = false
    hideConfirm: boolean = false
    showClose: boolean = false

    $ViewMessage(object) {
      const key = ['width', 'hideTitle', 'title', 'callback', 'slotName', 'content', 'cancelText', 'confirmText', 'hideCancel', 'hideConfirm', 'showClose', 'data']
      this.visibleSync = true
      key.forEach(item => {
        object[item] && object[item].toString().length > 0 && (async() => {
          if (!~['symbol', 'function'].indexOf(typeof object[item])) {
            this.$data[item] = await this.structuralClone(object[item])
          } else {
            this.$data[item] = object[item]
          }
        })()
      })
    }

    async buttonEvent(boolean) {
      const data = await this.structuralClone(this.data)
      this.callback && this.callback(boolean, data)
      this.visibleSync = !this.visibleSync
      // 初始化组件
      Object.assign(this.$data, (this.$options as any).data())
    }

    structuralClone(obj) {
      return new Promise(resolve => {
        const { port1, port2 } = new MessageChannel()
        port2.onmessage = ev => resolve(ev.data)
        port1.postMessage(obj)
      })
    }
}
</script>
<style scoped lang="scss">
    .content {
        min-height: 60px;
        padding-left: 20px;
    }

    .footer-button {
        height: 30px;
        width: 80px;
    }
</style>
<style lang="scss">
    .CustomCPM {
        .el-dialog__footer {
            padding: 8px;
        }
    }

</style>
