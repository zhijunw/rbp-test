<template>
  <div class="app-container-warrper">
    <div class="fixed-bar" />
    <div class="global-config app-container">
      <div class="btn-group">
        <el-button type="primary" @click="save">
          {{ $t('layout.btns.save') }}
        </el-button>
        <el-button plain @click="close">
          {{ $t('layout.btns.close') }}
        </el-button>
        <base-input
          ref="baseInput"
          :inputProps="listConfig.InputConfig"
          class="list-input right"
          :value="inputValue"
          @enter="inputEnter"
        />
      </div>
      <div class="config-list">
        <div class="config-list-header bg-e">
          <span class="common-placeholder" />
          <span class="flex-1 pdl-10 border-r-1">配置项</span>
          <span class="flex-1 pdl-10">值</span>
        </div>
        <template v-if="configList.length">
          <tree-folder ref="treeFolders" :configList="configList" :formData="formData" />
        </template>
        <template v-else>
          <div class="no-data">
            <img src="@/assets/common/nosearch.png" class="no-data-img" alt="暂无数据" />
            <p class="f12">
              无匹配结果
            </p>
          </div>
        </template>
      </div>
    </div>

    <base-anchor :anchor="anchorConfig" :element="treeFoldersNode" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import apiUrl from '@/api/config-center/global-config'
import { globalConfig } from './configs/index'
import { AnchorConfig, Dictionary } from '@/typings'
import { ITagView } from '@/store/modules/tags-view'
import { transformFields } from '@/utils'
const SHOW_TYPE = {
  '1': 'input',
  '2': 'number',
  '3': 'datePick',
  '4': 'checkbox',
  '5': 'select',
  '6': 'mulitSelect'
}
@Component({
  name: 'router-100004',
  components: {
    listOperation: () => import('@/layout-components/list-operation/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    baseAnchor: () => import('@/components/base-anchor/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue'),
    baseCheckbox: () => import('@/components/base-checkbox/index.vue'),
    baseDatePicker: () => import('@/components/base-datePicker/index.vue'),
    treeFolder: () => import('./tree-folder.vue')
  }
})
export default class App extends Vue {
  configList: any[] = []
  listConfig = globalConfig
  anchorConfig: AnchorConfig[] = []
  formData: Dictionary = {}
  selectData: Dictionary = {}
  treeFoldersNode: any = null
  inputValue = ''
  created() {
    this.$nextTick(() => {
      this.getList()
    })
  }

  async getList() {
    const res = await this._post({ url: apiUrl.getList, data: { data: this.inputValue, user: '' } })
    if (res.code === 0) {
      this.configList = res.data
      this.$nextTick(() => {
        setTimeout(() => {
          this.treeFoldersNode = (this.$refs.treeFolders as any).$refs
        }, 10)
      })

      this.formatTreeList(this.configList)
      this.anchorConfig = res.data.map((item) => {
        const { name, keyCode } = item
        return {
          label: name,
          value: keyCode,
          ref: keyCode
        }
      })
    }
  }
  formatTreeList(arr) {
    arr.forEach((item) => {
      if (item.childSystemSetting) {
        item.childSystemSetting.forEach((child) => {
          // 如果有下拉框 则格式化下拉框 形成 label value 键值对
          if (child.systemSettingValues) {
            child.systemSettingValues.forEach((values, index) => {
              if (values === 'true') {
                child.systemSettingValues[index] = true
              }
              if (values === 'false') {
                child.systemSettingValues[index] = false
              }
            })
          }
          // 这里是存放下拉框选项的值
          if (child.systemSettingDataLists) {
            // 需要将 ID 转换为 字符串
            child.systemSettingDataLists = transformFields(child.systemSettingDataLists, {
              label: 'title',
              value: 'id'
            }).map((item) => {
              item.value = item.value.toString()
              return item
            })
          }
          // systemSettingValues 的初始值是 [] 因为后端是用数组去接受值
          this.$set(this.formData, child.keyCode, child.systemSettingValues)
          child.dataType = SHOW_TYPE[child.dataType.toString()]
          this.formatTreeList(child.childSystemSetting)
        })
      }
    })
  }

  async save() {
    const systemSettingValues: any[] = []
    for (const k in this.formData) {
      // systemSettingValues = [...systemSettingValues, ...this.formData[k]]
      systemSettingValues.push({
        keyCode: k,
        values: this.formData[k] || []
      })
    }
    const res = await this._put({ url: apiUrl.update, data: { data: systemSettingValues } })
    if (res.code === 0) {
      this._message({ message: '保存成功', type: 'success' })
    }
  }

  close() {
    const view = {
      name: `router-100004`,
      meta: {
        moduleId: '100004'
      }

      // path: '/configCenter/globalConfig'
    }
    this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
      this.$nextTick(() => {
        // 关闭路由页面的时候需要卸载掉store
        setTimeout(() => {
          if (this.$store.state[view.meta.moduleId]) {
            this.$store.unregisterModule(view.meta.moduleId)
          }
        }, 10)
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    })
  }
  private isActive(route) {
    return route.meta.moduleId === this.$route.meta.moduleId
  }
  private toLastView(visitedViews: ITagView[], view: ITagView) {
    const latestView: ITagView = visitedViews.slice(-1)[0]
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
  inputEnter(value) {
    this.inputValue = value
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.app-container-warrper {
  .fixed-bar {
    height: 8px;
    background: $moduleBg;
    position: sticky;
    z-index: 1002;
    top: 68px;
  }
  .app-container {
    background: #fff;
    border-radius: 4px 4px 0 0;
    margin: 0 8px 8px 8px;
    padding-bottom: 8px;
    box-shadow: 0px 2px 8px 0px rgba(166, 167, 173, 0.5);
  }
}
.btn-group {
  display: block;
  height: 52px;
  line-height: 52px;
  padding: 0 16px;
  box-shadow: 0px 0px 6px 0px rgba(36, 40, 63, 0.1);
}
@media (min-width: 1200px) {
  .config-list {
    min-height: calc(100vh - 220px);
  }
}
/* 大屏幕 ：大于等于1200px*/
@media (min-width: 1440px) {
  .config-list {
    min-height: calc(100vh - 148px);
  }
}
.tree-list {
  border-bottom: 1px solid #eee;
}
.config-list {
  padding: 12px 16px;
  // min-height: calc(100vh - 148px);
  &-box {
    height: auto;
    transition: height 0.5s ease;
  }
  &-header {
    height: 28px;
    line-height: 28px;
    display: flex;
    font-size: 12px;
    border: 1px solid #eee;
    border-bottom: none;
  }
  .common-placeholder {
    width: 32px;
    line-height: 28px;
    text-align: center;
    transition: all 0.5s;
  }
  .bg-e {
    background: #eee;
  }
}
.no-data {
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: min-content; */
  color: $colorTextPlaceholder;
  flex: 1;
  border: 1px solid #eee;
  &-img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
}

.tooltip-text {
  line-height: 1.5;
  font-size: 12px;
}
</style>
