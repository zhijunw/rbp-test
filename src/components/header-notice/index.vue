<template>
  <el-dropdown
    size="small"
    placement="bottom"
    :hide-on-click="false">
    <el-button
      type="text"
      class="socket-btn"
      size="small"
      @click="clearTask">
      <el-badge :value="socketInfo.length ? socketInfo.length : ''">
        <svg-icon name="top_notice" />
      </el-badge>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <template v-if="socketInfo.length > 0">
        <el-dropdown-item
          v-for="item in socketInfo"
          :key="item.id"
          ref="socketTask"
          class="hover socket-list">
          <div class="socket-list-warrper f14">
            <div class="socket-list-info">
              <span>{{ item.taskName }}</span>
              <template v-if="item.status === 2 && item.type === 1">
                <span
                  class="color-info downlink"
                  @click="downUrl(item)">下载</span>
              </template>
              <template v-else-if="item.status === 3">
                <span
                  class="color-info downlink"
                  @click="downUrl(item)">下载失败列表</span>
              </template>
            </div>
            <span
              class="mgl-6"
              :class="getStatusClass(item.status)">{{ item.statusName }}</span>
          </div>
          <el-progress
            :percentage="getPercentage(item)"
            :format="format" />
        </el-dropdown-item>
      </template>
      <template v-else>
        <p class="f14 no-data">
          暂时没有任务
        </p>
      </template>
      <el-button
        size="small"
        type="text"
        class="more-btn"
        @click="moreSocket">
        {{ $t('commonWord.checkMore') }}
        <i class="el-icon-arrow-right el-icon--right" />
      </el-button>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { download } from '@/api/apiConfig'
import baseUrl from '@/api/baseUrl'
import SocketPlugin from '@/utils/websocket'
import { getCookie } from '@/utils/auth'

interface SocketArgsConfig {
  url: string
  callback: Function
}
@Component({
  name: 'header-notice'
})
export default class extends Vue {
  get socketInfo() {
    return this.$store.state.user.socketInfo
  }
  socket: any = null
  taskTime:any = null
  async created() {
    const socketConfig: SocketArgsConfig = {
      url: `${baseUrl.replace('http', 'ws')}/websocket/${getCookie('userId')}`,
      callback: this.getSocketMessage
    }
    this.socket = new SocketPlugin(socketConfig)
    this.socket.connect()
    // this.init()
  }
  getSocketMessage(data) {
    const { operateBy, operateTime, ...other } = data
    if (this.taskTime) clearTimeout(this.taskTime)
    this.taskTime = setTimeout(() => {
      this.$store.commit('user/PUSH_SOCKET_INFO', other)
    }, 1000)
  }
  destroyed() {
    // 销毁监听
    this.socket.close()
  }

  downUrl(item) {
    download(item.taskName, item.fileUrl)
    setTimeout(() => {
      this.$store.commit('user/DELETE_SOCKET_INFO', item)
    }, 1000)
  }
  getStatusClass(status) {
    const className = status === 1 ? 'warning' : status === 2 ? 'success' : 'danger'
    return className
  }
  getPercentage(item) {
    // var precent = 0

    if (item.status === 1) {
      return 25
    } else if (item.status === 2 || item.status === 3) {
      return 100
    }
    return 0
  }
  format(percentage) {
    return `${percentage}%`
  }
  moreSocket() {
    this.$router.push({
      name: 'socketList'
    })
  }
  clearTask() {
    this.$store.commit('user/DELETE_SOCKET_INFO_ALL', [])
    console.log(this.$store.state.user.socketInfo)
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.more-btn {
  display: block;
  width: 100%;
  text-align: center;
  color: $colorTextSecondary !important;
}
.no-data {
  width: 330px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  color: $colorTextSecondary;
}
</style>
<style lang="scss">
.socket-btn {
  padding: 0 !important;
}
.socket-list {
  width: 330px;
  margin-bottom: 20px !important;
  &-warrper {
    display: flex;
  }
  &-info {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
  .downlink {
    margin-right: 16px;
    text-decoration: underline;
  }
}
</style>
