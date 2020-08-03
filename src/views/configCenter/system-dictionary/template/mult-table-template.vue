<template>
  <div class="mult-table">
    <div class="color-group">
      <base-title :title="$t('goodsConfig.title.colorGroup')" />
      <with-Add-table
        ref="color-group"
        :tableHeader="colorGroupHeader"
        :apiUrl="apiObj.colorGroup"
        @tableDataChange="tableDataChange" />
    </div>
    <div class="color">
      <div class="color-box">
        <base-title :title="$t('goodsConfig.title.color')" />
        <base-input
          :value="searchValue"
          :inputProps="{
            placeholder: 'form.placeholder.keywordPlaceholder',
            prefixIcon: 'el-icon-search'
          }"
          class="right search-input"
          @enter="handleSearch" />
      </div>
      <with-Add-table
        ref="color"
        :tableHeader="colorHeader"
        :apiUrl="apiObj.color"
        :tableConfig="tableConfig">
        <template v-slot:addBtn="{scope}">
          <el-button
            id="btn_t_gray"
            type="text"
            size="mini"
            @click="update(scope)">
            <!-- {{ scope.status === 100 ? $t('layout.btns.disable') : $t('layout.btns.batchEnable') }} -->
            {{ $t('layout.btns')[scope.status === 100 ? 'disable' : 'batchEnable' ] }}
          </el-button>
        </template>
      </with-add-table>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import vuexMixins from '../configs/vuex-module'
import { templateConfig } from '../configs'
import { TableHeaderConfig, Dictionary } from '@/typings'
import { transformFields } from '@/utils'
import apiUrl from '@/api/config-center/system-dictionary'
type Apikey = 'templateColor'
const TEMPLATE_ARR = ['templateColor']
const STATUS_MAP = new Map([
  [100, [101, 'disable']],
  [101, [100, 'disable']]
])
@Component({
  name: 'mult-table-template',
  components: {
    withAddTable: () => import('../module-component/with-add-table.vue'),
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue')

  }
})
export default class App extends mixins(vuexMixins) {
  // 观察当前 tab
  @Watch('v_activeTab', { immediate: true })
  onActiveTabChange(val: string, oldval: string) {
    if (val) {
      const config = templateConfig[val]
      if (TEMPLATE_ARR.includes(config.apiKey)) {
        this.colorGroupHeader = config.colorGroupHeader
        this.colorHeader = config.colorHeader
        this.apiObj = apiUrl[config.apiKey]
      }
    }
  }

  colorGroupHeader: TableHeaderConfig[] = []
  colorGroupData: any[] = []
  colorHeader: TableHeaderConfig[] = []
  // colorData: any[] = []
  searchValue: string = ''
  apiObj: any = {}
  tableConfig: Dictionary<any> = {
    groupId: []
  }
  apiKey: Apikey

  handleSearch(val) {
    ;(this.$refs.color as any).getList(val)
  }

  async update(row) {
    const action = STATUS_MAP.get(row.status)!
    // const lang = row.status ? 'disable' : 'enable'
    const res = await this._put({
      url: this.apiObj.color.update,
      data: {
        data: { id: row.id, status: action[0] }
      }
    })
    if (res.code === 0) {
      this._message({
        message: this.$t('commonWord.actionSuccess', { action: this.$t('operationGroup.btns')[action[1]] }),
        type: 'success'
      })
      ;(this.$refs.color as any).getList()
    }
  }
  // 列表数据发生变化
  tableDataChange(val) {
    const options = transformFields(val, { label: 'name', value: 'id' })
    // this.tableConfig.groupId = options
    this.$set(this.tableConfig, 'groupId', options)
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.color-box{
  display: flex;
  align-items: center;
}
.color-group{
  /deep/.base-title {
    margin:0 0 16px 0;
  }
}
.color{
  margin-top: 30px;
  /deep/.base-title {
    margin:0 0 0 0;
  }
  &-box{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
}
</style>
