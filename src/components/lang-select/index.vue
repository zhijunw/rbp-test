<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage">
    <div>
      <svg-icon
        name="top_language"
        class="international-icon" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="language === 'zh'"
        command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="language === 'en'"
        command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component({
  name: 'lang-select'
})
export default class extends Vue {
  get language() {
    return this.$store.getters.language
  }
  private handleSetLanguage(lang: string) {
    this.$i18n.locale = lang
    this.$store.dispatch('app/setLanguage', lang)
    this.$message({
      message: 'Switch Language Success',
      type: 'success'
    })
  }
}
</script>
