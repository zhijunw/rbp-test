<template>
  <div class="inform">
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :append-to-body="true"
      width="360px"
      @closed="dialogClosed">
      <div
        slot="title"
        class="inform__title">
        <svg-icon
          class="inform__title__svgIcon"
          :name="iconName" /> {{ title }}
      </div>
      <div
        class="inform__content"
        v-html="firstInform.content" />
      <div
        v-if="!!firstInform.detail"
        class="inform__detail">
        <svg-icon
          class="inform__detail__arrowIcon"
          :name="isShowDetail ? 'closeup' : 'Pulldown'"
          @click="setDetailStatus" />
        <div
          v-if="isShowDetail"
          class="inform__detail__area">
          <p v-html="firstInform.detail" />
          <el-button
            class="copyBtn"
            plain
            size="mini"
            :data-clipboard-text="firstInform.detail"
            @click="copy">
            {{ $lang('inform.copyBtn') }}
          </el-button>
        </div>
      </div>
      <div
        slot="footer"
        class="inform__footer">
        <el-button
          type="primary"
          @click="handleAction('confirm', firstInform.id)">
          {{ confirmButtonText }}
        </el-button>
        <el-button
          v-if="firstInform.isConfirm"
          plain
          @click="handleAction('cancel', firstInform.id)">
          {{ cancelButtonText }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import i18n from '@/lang/index'

export default {
  data() {
    return {
      dialogVisible: false, // 弹窗的显示隐藏
      informList: [], // 通知列表
      firstInform: {}, // 通知列表的第一个通知
      seed: 0, // 用于生成UUID
      isShowDetail: false, // 是否显示详情
      promiseStatus: null // confirm的回调状态
    }
  },
  computed: {
    // 弹窗标题
    title() {
      const titleList = new Map([
        ['success', this.$lang('inform.titleSuccess')],
        ['error', this.$lang('inform.titleError')],
        ['info', this.$lang('inform.titleInfo')],
        ['warning', this.$lang('inform.titleWarning')]
      ])
      const type = this.firstInform.type
      return titleList.get(type) || titleList.get('info')
    },
    // 弹窗图标
    iconName() {
      const iconList = new Map([
        ['success', 'Popup_success'],
        ['error', 'Popup_fail'],
        ['info', 'Popup_tips'],
        ['warning', 'Popup_warning']
      ])
      const type = this.firstInform.type
      return iconList.get(type) || iconList.get('info')
    },
    // 确认按钮名称
    confirmButtonText() {
      const confirmButtonText = this.firstInform.confirmButtonText
      const isConfirm = this.firstInform.isConfirm
      if (confirmButtonText) {
        return confirmButtonText
      } else {
        return isConfirm ? this.$lang('inform.confirmBtn') : this.$lang('inform.singleConfirmBtn')
      }
    },
    // 取消按钮名称
    cancelButtonText() {
      const cancelButtonText = this.firstInform.cancelButtonText
      if (cancelButtonText) {
        return cancelButtonText
      } else {
        return this.$lang('inform.cancelBtn')
      }
    }
  },
  watch: {
    informList: {
      handler(val) {
        // 获取通知列表的第一个通知
        this.firstInform = val[0] || {}
      }
    }
  },
  methods: {
    // 多语言
    $lang(value) {
      return i18n.t(value)
    },
    /**
     * 获得一个唯一码（用于给每条信息）
     */
    getUuid() {
      this.seed = this.seed + 1
    },

    /**
     * 向通知列表添加新的通知到尾部
     * @item 加入的一条通知
     */
    add(item) {
      const id = this.getUuid()
      const _item = Object.assign(
        {
          id: id
        },
        item
      )
      this.informList.push(_item)
      this.dialogVisible = true
    },

    /**
     * 通知列表移除通知
     */
    remove(id) {
      const informList = this.informList

      // 弹窗彻底关闭后，才能删除最后一个通知，否则在关闭动画期间，显示会异常
      if (informList.length > 1) {
        for (let i = 0; i < informList.length; i++) {
          if (informList[i].id === id) {
            this.informList.splice(i, 1)
            break
          }
        }
      } else {
        this.dialogVisible = false
      }

      this.isShowDetail = false
    },

    /**
     * 弹窗彻底关闭后，再删除最后一个通知，提前删除在关闭动画期间，显示会异常
     */
    dialogClosed() {
      this.informList.pop()
    },

    /**
     * confirm的回调
     */
    confirm() {
      return new Promise((resolve, reject) => {
        this.promiseStatus = { resolve, reject }
      })
    },

    /**
     * 弹窗确认取消按钮
     */
    handleAction(action, id) {
      this.remove(id)
      if (action === 'confirm') {
        this.promiseStatus && this.promiseStatus.resolve()
      } else if ((action = 'cancel')) {
        this.promiseStatus && this.promiseStatus.reject()
      }
    },

    /**
     * 设置详情的展开状态
     */
    setDetailStatus() {
      this.isShowDetail = !this.isShowDetail
    },

    /**
     * 复制详情到剪贴板
     */
    copy() {
      const clipboard = new Clipboard('.copyBtn')
      clipboard.on('success', (e) => {
        this.$message({
          message: this.$lang('inform.copySuccess'),
          type: 'success'
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        // 不支持复制
        this.$message({
          message: this.$lang('inform.copyFail'),
          type: 'error'
        })
        // 释放内存
        clipboard.destroy()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.inform {
  font-size: 100;
  &__title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &__svgIcon {
      margin-right: 12px;
    }
  }
  &__content {
    margin-top: 15px;
    font-size: 14px;
    line-height: 18px;
  }
  &__detail {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    box-sizing: border-box;
    width: 100%;

    &__arrowIcon {
      margin-bottom: 5px;
      cursor: pointer;
    }

    &__area {
      width: inherit;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      box-sizing: border-box;
      font-size: 12px;
      line-height: 16px;
      padding: 6px;
      border: 1px solid #dddddd;
      border-radius: 2px;
      p {
        width: 100%;
        min-height: 60px;
        overflow-y: auto;
      }
    }
  }
}

/deep/ .el-dialog__body {
  padding: 0 30px 0 30px !important;
}

/deep/ .el-dialog__footer {
  padding: 20px 32px 32px !important;
}
</style>
