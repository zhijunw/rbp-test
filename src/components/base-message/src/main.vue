<template>
  <transition name="el-message-fade">
    <div
      v-show="visible"
      :class="[
        'el-message',
        type && !iconClass ? `el-message--${ type }` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        dropdown ? 'is-dropdown' : '',
        customClass]"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <i
        v-if="iconClass"
        :class="iconClass" />
      <i
        v-else
        :class="typeClass" />
      <slot>
        <p
          v-if="!dangerouslyUseHTMLString"
          class="el-message__content">
          {{ message }}
        </p>
        <p
          v-else
          class="el-message__content"
          v-html="message" />
      </slot>
      <i
        v-if="dropdown"
        class="message-dropdown el-icon-caret-bottom"
        @click="dropdownShow =! dropdownShow" />
      <i
        v-if="showClose"
        class="el-message__closeBtn el-icon-close"
        @click="close" />
      <el-collapse-transition>
        <ul
          v-if="dropdown"
          v-show="dropdownShow"
          :class="['dropdown-list', `${ type }`]">
          <li
            v-for="(item, index) in dropdownList"
            :key="`dropdown${index}`"
            class="dropdown-item">
            {{ item }}
          </li>
        </ul>
      </el-collapse-transition>
    </div>
  </transition>
</template>

<script type="text/babel">
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}
export default {
  data() {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      iconClass: '',
      customClass: '',
      onClose: null,
      showClose: false,
      closed: false,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false,
      dropdownList: [], // 当dropdownList存在数据时才会出现下拉选项操作
      dropdownShow: false
    }
  },
  computed: {
    iconWrapClass() {
      const classes = ['el-message__icon']
      if (this.type && !this.iconClass) {
        classes.push(`el-message__icon--${this.type}`)
      }
      return classes
    },
    typeClass() {
      return this.type && !this.iconClass ? `el-message__icon el-icon-${typeMap[this.type]}` : ''
    },
    dropdown() {
      return !!this.dropdownList.length
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },
  mounted() {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    close() {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },
    clearTimer() {
      clearTimeout(this.timer)
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown(e) {
      if (e.keyCode === 27) {
        // esc关闭消息
        if (!this.closed) {
          this.close()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.el-message {
  max-width: 50%;
  overflow: inherit;

  &.is-closable {
    .el-message__content {
      padding-right: 16px;
    }

    .message-dropdown {
      right: 38px;
    }
  }

  &.is-dropdown {
    .el-message__content {
      padding-right: 16px;
    }
  }

  &.is-closable.is-dropdown {
    .el-message__content {
      padding-right: 41px;
    }
  }

  .el-message__content {
    word-wrap: break-word;
    word-break: break-all;
    padding-right: 48px;
  }
}

.message-dropdown {
  position: absolute;
  top: 50%;
  right: 15px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  cursor: pointer;
  color: #c0c4cc;
  font-size: 16px;
}

.dropdown-list {
  position: absolute;
  width: 100%;
  left: 0px;
  top: 100%;
  margin-top: 10px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  padding: 4px 20px;
  max-height: 380px;
  overflow: auto;

  &.danger {
    color: $danger;
    background-color: $dangerBg;
    border-color: $dangerBorder;

    .dropdown-item {
      border-color: $dangerBorder;
    }
  }

  &.success {
    color: $success;
    background-color: $successBg;
    border-color: $successBorder;

    .dropdown-item {
      border-color: $successBorder;
    }
  }

  &.warning {
    color: $warning;
    background-color: $warningBg;
    border-color: $warningBorder;

    .dropdown-item {
      border-color: $warningBorder;
    }
  }

  &.info {
    color: $info;
    background-color: $infoBg;
    border-color: $infoBorder;

    .dropdown-item {
      border-color: $infoBorder;
    }
  }
}

.dropdown-item {
  list-style-type: none;
  padding: 8px;

  &:not(:last-of-type) {
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }
}
</style>
