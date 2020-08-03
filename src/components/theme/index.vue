<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetTheme">
    <div>
      <svg-icon name="top_theme" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item,index) of themeOptions"
        :key="index"
        :command="item"
        @click="selectThemeFn($event,item.value)">
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import axios from 'axios'
import apiUrl from '@/api/customer-theme'
@Component({
  name: 'theme'
})
export default class extends Vue {
  private themeOptions = [
    { label: '方案1', value: 'default', cssLink: [], themeId: '' },
    { label: '方案2', value: 'medium', cssLink: [], themeId: '' }
  ]
  selectTheme:any = ''
  private handleSetTheme(obj: any) {
    const heads = document.getElementsByTagName('head')
    const elementurl = document.getElementsByClassName('elementurl')
    const styleFileName = document.getElementsByClassName('styleFileName')
    if (obj.cssLink.length <= 0) {
      if (elementurl.length > 0 || styleFileName.length > 0) {
        heads[0].removeChild(elementurl[0])
        heads[0].removeChild(styleFileName[0])
      }
      return
    }
    this._get({ url: apiUrl.selectTheme + `?userId=1&themeId=` + obj.value, params: { userId: 1, themeId: obj.value }}).then(res => {
      if (+res.code === 0) {
        this.$message.success('切换主题成功')
      }
    })
    obj.cssLink.forEach((item, index, arr) => {
      this.getThemeFileFn(item)
    })
  }
  getThemeFileFn(obj) {
    const fileUrl = 'http://192.168.9.137:8000/webFile/'
    if (!obj.url) {
      return
    }
    const linkDom = document.getElementsByClassName(obj.name)
    if (linkDom.length > 0) {
      linkDom[0].setAttribute('href', fileUrl + obj.url)
      return
    }
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('class', obj.name)
    link.setAttribute('href', fileUrl + obj.url)
    const heads = document.getElementsByTagName('head')
    if (heads.length) {
      heads[0].appendChild(link)
    } else {
      document.documentElement.appendChild(link)
    }
  }
  getThemeList() {
    this._get({ url: apiUrl.findThemeList, params: '' }).then(res => {
      const data = res.data
      data.map(item => {
        const newObj:any = {
          label: item.themeName,
          value: item.guid,
          cssLink: [{
            name: 'elementurl',
            url: item.elementurl
          }, {
            name: 'styleFileName',
            url: item.styleFileName
          }]
        }
        this.themeOptions.push(newObj)
      })
    })
  }
  getSelectTheme() {
    this._get({ url: apiUrl.findUserTheme + `?userId=1`, params: '' }).then(res => {
      if (+res.code === 0) {
        this.selectTheme = res.data.guid
      }
    })
  }
  mounted() {
    // this.getThemeList()
    // this.getSelectTheme()
  }
}
</script>
