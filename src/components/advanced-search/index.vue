<template>
  <div class="high-search">
    <div class="fuzzy-box">
      <el-select
        :key="selectKey"
        v-model="selectedVal"
        :disabled="disabled"
        :clearable="clearable"
        :loading="loading"
        filterable
        remote
        collapse-tags
        :multiple="!highSearchConfig.dialogSearchConfig.isSingleSelect"
        :remote-method="remoteMethod"
        style="width:100%"
        :placeholder="$t('form.placeholder.input', { msg: '' })"
        @focus="selectFocus"
        @change="handleChange">
        <el-option
          v-for="(item, index) in optionsData"
          :key="index"
          :label="item.label"
          :value="item.value" />
      </el-select>

      <el-button
        icon="el-icon-more"
        class="box"
        :disabled="disabled"
        @click="openHighSearch" />
      <div
        v-if="hideText"
        class="hide-text"
        :class="[disabled ? 'bd-disable' : 'bd-f']">
        <p class="f12">
          高级搜索
        </p>
        <el-tooltip
          class="item"
          effect="dark"
          content="清空会删除高级搜索条件"
          placement="top-end">
          <i
            class="el-icon-circle-close close-btn hover"
            @click="close" />
        </el-tooltip>
      </div>
    </div>
    <high-search-dialog
      ref="highSearch"
      :defaultFilter="defaultFilter"
      :dialogData="highSearchConfig.dialogSearchConfig"
      :dialogObj="highSearchDialogObj"
      class="high-search"
      v-on="$listeners"
      @singleChannelChoose="singleChannelChoose"
      @confirm="confirmSearchOption" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { FuzzyConfig, Options, Response, HighSearchConfig, DialogObj } from '@/typings'
import { transformFields, formatHighSearchCascader } from '@/utils'
import { _axios } from '@/api/apiConfig'
interface FuzzyOptions {
  label: string
  value: string | number
  [propName: string]: any
}

@Component({
  name: 'advanced-fuzzy',
  components: {
    highSearchDialog: () => import('@/layout-components/vip-dialog/index.vue')
  }
})
export default class App extends Vue {
  @Prop({
    default: () => {
      return {}
    }
  }) defaultFilter: object
  @Prop({ default: true }) clearable
  @Prop({ default: false }) disabled
  @Prop({ required: true }) highSearchConfig: HighSearchConfig
  @Prop() value

  @Watch('defaultFilter', { deep: true })
  onDefaultFilterChanged(val: any, oldVal: any) {
    console.log('监测defaultFilter', val)
  }

  @Watch('value', { immediate: true })
  onValueChanged(val: any, oldVal: any) {
    this.selectedVal = val
    if (val) {
      // 如果是数组则要清空高级搜索里面的查询条件
      if (val.length === 0) {
        this.close()
      }
    }
  }
  selectedVal: any = ''
  loading: boolean = true
  hideText: boolean = false
  optionsData: any[] = []
  query: string = ''
  selectKey: number = 1
  highSearchDialogObj: DialogObj = {
    isShowDialog: false,
    title: '',
    appendToBody: true,
    modal: true,
    setShow: true
  }

  selectFocus() {
    this.getData(this.query || '')
  }
  // method
  async getData(query) {
    // 获取模糊搜索数据
    this.$emit('getFilterOptions', { query })
    const other = {};
    (Object.keys(this.defaultFilter) as any).forEach(em => {
      other[em] = this.defaultFilter[em].value
    })
    if (this.highSearchConfig.customerQuery) {
      this.$emit('getFilterOptions', { query })
      return
    }

    // console.log('query', query)
    const res: Response = await this._post({
      url: this.highSearchConfig.apiUrl!,
      data: {
        keyWord: query,
        ...other
      },
      params: {
        keyWord: query
      }
    })

    if (res.code === 0) {
      this.loading = false
      this.optionsData = transformFields(res.data, { label: 'name', value: 'id' }, true)
    }
  }

  remoteMethod(query) {
    // 模糊搜索
    this.query = query.trim()
    if (this.query !== '') {
      const f = this._debounce(() => {
        this.getData(this.query)
      }, 500)
      f()
    }
  }

  handleChange(value) {
    const valueArr = Array.isArray(value) ? value : [value]
    const matchValArr = this.optionsData.filter((item) => valueArr.includes(item.value))
    //   这里只是做 模糊搜索 的话  直接更新数据
    this.$emit('update:value', value)
    this.$emit('fuzzyChange', { value, matchValArr })
  }
  // 打开高级搜索弹窗
  openHighSearch() {
    this.highSearchDialogObj.isShowDialog = true
    this.highSearchDialogObj.width = this.highSearchConfig.dialogSearchConfig.dialogWidth || '970px'

    // console.log('title',this.highSearchConfig)
    this.highSearchDialogObj.title = this.$t(this.highSearchConfig.dialogSearchConfig.title)
  }
  // 清除 高级搜索的条件值 并且清空高级搜索弹窗的条件
  close() {
    this.hideText = false
    // 清空条件值
    this.$emit('updateAdvancedSearchValue', '')
    // 清空弹窗里面的条件
    ;(this.$refs.highSearch as any).reset()
  }

  upDateOptionsData(arr, value?) {
    this.optionsData = arr
    setTimeout(() => {
      this.$nextTick(() => {
        value && (this.selectedVal = value)
        console.log(this.optionsData)
      })
    }, 500)
    // this.selectKey += 1
    // console.log('this.selectedVal', this.selectedVal)
    // this.getData(this.selectedVal)
  }

  // 多选渠道的选择
  confirmSearchOption(queryFormData) {
    // 如果 筛选条件中 有级联的 则需要对其数据进行处理 只取 选择的最后一个的 id
    // 找到 有级联的 筛选条件
    const formlist = this.highSearchConfig.dialogSearchConfig.formList
    const cascaderVal = {}
    for (var k in queryFormData) {
      cascaderVal[k] = Object.assign(
        {},
        queryFormData[k],
        // 匹配到级联字段则对值 进行处理 如 [ [1,2], [3,4] ] => [ 2,4 ]
        formatHighSearchCascader(formlist, queryFormData[k])
      )
    }
    // 这里是 高级搜索 则 手动去外层组件 更新数据
    // this.$emit('update:value', queryFormData)
    this.$emit('updateAdvancedSearchValue', cascaderVal)

    this.hideText = true
  }

  // 用于绑定弹窗选择
  singleChannelChoose(value) {
    if (this.highSearchConfig.dialogSearchConfig.singleSelectFunction) {
      this.$nextTick(() => {
        this.upDateOptionsData([{ label: value.row.name, value: value.row.id }])
      })
      this.$nextTick(() => {
        this.selectedVal = value.row.id
      })
    }
  }
}
</script>

<style scoped lang="scss">
.fuzzy-box {
  display: flex;
  align-items: center;
  /deep/.el-input__inner {
    border-radius: 2px 0 0 2px;
  }
}
.hide-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // background: #fff;
  position: absolute;
  left: 10px;
  width: 84%;
  height: 24px;
  line-height: 24px;
  top: 2px;
  padding: 0 4px;
  font-size: 12px;
  z-index: 1000;
}
.bd-disable {
  background: #f5f7fa;
}
.bd-f {
  background: #fff;
}
.close-btn {
  display: inline-block;
  padding: 2px;
}
.box {
  width: 32px;
  height: 26px;
  border: 1px solid #d7d7d7;
  border-radius: 0px 2px 2px 0px;
  border-left: none;
  background: #f7f8fa !important;
  // text-align: center;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // &:hover {
  //   cursor: pointer;
  // }
  .radis {
    display: inline-block;
    border: 2px solid #a6a7ad;
    border-radius: 100%;
    margin-right: 2px;
  }
}
</style>
