<template>
  <div>
    <i
      v-if="isAdmin && errorLogUrl"
      class="el-icon-link error-icon"
      @click="goErrorLogUrl" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getCookie } from '@/utils/auth'

@Component({
  name: 'errorlog'
})
export default class extends Vue {
  get isAdmin() {
    return getCookie('userNo') === 'admin'
  }
  errorLogUrl: string = ''
  mounted() {
    this.getErrorLogUrl()
  }
  async getErrorLogUrl() {
    const res = await this._get({ url: 'system/systemSetting/globalSetting' })
    this.errorLogUrl = res.data.elkUrl
  }
  goErrorLogUrl() {
    window.open(this.errorLogUrl)
  }
}
</script>
<style lang="scss" scoped>
.error-icon{
    font-size: 16px;
    vertical-align: middle;
    font-weight: bold;
}
</style>
