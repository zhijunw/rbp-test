<template>
  <div class="list-prop f14">
    <div class="list-prop__title flex-space">
      <div class="list_title_icon">
        <svg-icon
          name="module"
          className="w20 h20 mgr-6" />
        {{ $t('menuConfig.module') }}
      </div>
      <div class="list_title_btn">
        <base-input
          :inputProps="{
            placeholder: 'form.placeholder.fieldsPlaceholder',
            prefixIcon: 'el-icon-search'
          }"
          class="list-input"
          :value.sync="inputValue"
          @enter="inputEnter" />
        <el-button
          id="btn_g_d_blue"
          class="mgl-10"
          @click="addToMenu">
          {{ $t('menuConfig.addToMenu') }}
        </el-button>
      </div>
    </div>
    <div class="list-prop__box">
      <base-table
        key="moduleTable"
        :colunmData="moduleTableHeader"
        :tableData="moduleData"
        class="module-table"
        :tableConfig="{
          isMultiSelect: true,
          isIndex: false
        }"
        @select="selectModule"
        @viewDetail="viewDetail">
        <template v-slot="{ scope }">
          <el-button
            id="btn_t_blue"
            type="text"
            size="mini"
            @click="viewDetail(scope.row)">
            {{ $t('menuConfig.addToMenu') }}
          </el-button>
        </template>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Dictionary } from '@/typings'
import { menuConfig } from './configs'
import apiUrl from '@/api/config-center/menu-config'
@Component({
  name: 'module-list',
  components: {
    baseTable: () => import('@/components/base-table/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue')
  }
})
export default class App extends Vue {
  @Prop({ required: true }) currentModuleData: Dictionary
  inputValue: string = ''
  moduleTableHeader = menuConfig.moduleTableHeader
  moduleData: any[] = []
  selectModuleArr: string[] = []
  mounted() {
    this.getModuleList()
  }
  async getModuleList() {
    const res = await this._post({
      url: apiUrl.getModuleList,
      data: {
        data: this.inputValue
      }
    })
    if (res.code === 0) {
      this.moduleData = res.data
    }
  }
  inputEnter() {
    this.getModuleList()
  }
  selectModule({ section, formatSection }) {
    this.selectModuleArr = section
  }
  addToMenu() {
    if (this.selectModuleArr.length === 0) {
      this._message({ message: '请先勾选模块', type: 'warning' })
      return
    }
    this.addToMenuFn(this.selectModuleArr)
  }
  viewDetail(row) {
    this.addToMenuFn([row])
  }
  async addToMenuFn(modules) {
    if (!this.currentModuleData.id) {
      this._message({ message: '请选择要添加到的菜单分类！', type: 'warning' })
      return
    }
    if (this.currentModuleData.depth === 3 || this.currentModuleData.moduleId) {
      this._message({ message: '模块只能添加到分类里', type: 'warning' })
      return
    }
    const res = await this._post({
      url: apiUrl.addModuleToMenu,
      data: {
        data: {
          menuId: this.currentModuleData.id,
          modules
        }
      }
    })
    if (res.code === 0) {
      this._message({ message: '添加成功', type: 'success' })
      this.getModuleList()
      this.$emit('refresh')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.module-table {
  /deep/.cell {
    padding: 0 !important;
  }
}
.list_title_btn {
  display: flex;
}
.list-prop {
  width: 450px;
  margin-left: 12px;
  &__title {
    height: 48px;
    color: $colorTextRegular;
  }
  &__box {
    height: calc(100vh - 146px) !important;

    border-radius: 2px;
    /deep/.module-table {
      height: calc(100vh - 146px) !important;
      max-height: calc(100vh - 146px) !important;
    }

  }
}
</style>
