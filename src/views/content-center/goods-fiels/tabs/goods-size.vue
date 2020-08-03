<template>
  <div class="goods-insideL">
    <base-title
      :title="$t('goodsFiels.detail.anchorConfig.goodsSize')" />
    <el-row class="mgb-16">
      <el-col :span="12">
        <p class="f12 mgb-6">
          尺码类别
        </p>
        <base-select
          :value.sync="form.Goods.sizeClassId"
          :disabled="v_disabled"
          :item="{options:sizeTypeOptions}"
          :selectProps="{
            clearable: false
          }" />
      </el-col>
      <el-popover
        v-model="sizeLimitVisible"
        placement="bottom-start"
        trigger="manual"
        :disabled="!form.Goods.sizeClassId || v_disabled">
        <div class="limit-content">
          <div class="limit-content-header">
            <p class="f16">
              尺码限制
            </p>
            <i
              class="el-icon-close hover"
              @click="sizeLimitVisible=false" />
          </div>
          <p class="f14 mgb-8 mgt-20">
            尺码类型: {{ sizeTypeLabel }}
          </p>
          <base-table
            :colunmData="sizeLimitHeader"
            :tableData="sizeLimitData"
            class="base-table"
            :tableConfig="{
              isMultiSelect: false,
              isShowOpera: false,
            }">
            <template v-slot:tableCell="{ scope: { row, item, $index } }">
              <template v-if="item.type === 'checkbox'">
                <el-checkbox
                  v-model="row[item.value]"
                  @change="checkboxChange($event,$index,item.value)" />
              </template>
              <template v-else>
                {{ row[item.value] }}
              </template>
            </template>
          </base-table>
          <div class="limit-content-btn">
            <el-button @click="reset">
              {{ $t('layout.btns.reset') }}
            </el-button>
            <el-button
              type="primary"
              @click="confirm">
              {{ $t('layout.btns.sure') }}
            </el-button>
          </div>
        </div>
        <el-button
          slot="reference"
          plain
          class="size-limit-btn"
          :disabled="!form.Goods.sizeClassId || v_disabled"
          @click="sizeLimit">
          尺码限制
        </el-button>
      </el-popover>
    </el-row>
    <el-row class="mgb-16">
      <el-col :span="12">
        <p class="f12 mgb-6">
          号型
        </p>
        <base-select
          v-model="form.Goods.modelClassId"
          :disabled="v_disabled"
          :item="{options:sizeOptions}"
          :selectProps="{
            clearable: false
          }" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { TableHeaderConfig } from '@/typings'
import { scalarArrayEquals, deepCopy, transformFields } from '@/utils'
import { Dictionary, Options } from '@/typings'
import vuexMixins from '../configs/vuex-module'
import apiUrl from '@/api/content-center/goods-fiels'

@Component({
  name: 'goods-size',
  components: {
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue')
  }
})

export default class App extends mixins(vuexMixins) {
  @Prop() form: Dictionary
  @Prop() disabled: boolean

  @Watch('form.Goods.sizeClassId', { deep: true })
  async onsizeTypeChanged(val: string | number, oldVal: string | number) {
    // console.log('val',val,'this.sizeTypeOptions',this.sizeTypeOptions)
    if (val) {
      const current:any = this.sizeTypeOptions.find(item => item.value === val)!

      this.sizeTypeLabel = current.label
      // 如果新数据与旧数据不同 则重新计算表头
      if (val !== oldVal) {
        this.sizeArr = current.sizeDetailList
        //  保存选择尺码id 对应的 keys 数组
        this.$store.commit(`${this.m_moduleId}/SET_SIZE_KEY_DATA`, current.sizeDetailList)
        this.sizeLimitHeader = this.concatHeader(current.sizeDetailList)
      }
    }
  }
  @Watch('v_status', { immediate: true, deep: true })
  onv_statusChange(val, oldval) {
    if (['add', 'cancel'].includes(val)) this.reset()
  }

  get sizeOptions() {
    return this.v_detailConfig.modelClassId
  }

  get sizeTypeOptions() {
    return transformFields(this.v_detailConfig.sizeClassId, { label: 'name', value: 'id', sizeDetailList: 'detailList' })
  }

  sizeLimitData: any[] = []
  sizeArr: any[] = []
  sizeTypeLabel: string = ''
  sizeLimitVisible: boolean = false
  limitBtnIsClick: boolean = false
  sizeLimitHeader: TableHeaderConfig[] = []
  deepCopyLimitData: any[] = []

  sizeLimit() {
    if (this.sizeLimitVisible) return
    this.sizeLimitVisible = true
    this.makeUpLimitData()
    // 如果从传入的 formData 有尺码限制数据
    const sizeLimit = this.form.sizeDisableList
    if (sizeLimit.length) {
      this.sizeLimitData.forEach((item) => {
        for (const k in item) {
          if (typeof item[k] === 'boolean') {
            const index = sizeLimit.findIndex((size) => size.colorId === item.colorId && size.longId === item.longId)
            if (index > -1) {
              const sizeData = sizeLimit[index].sizeData
              const id = this.sizeArr.find((item) => item.fieldName === k).id
              const value = sizeData.find((size) => size.id === id).value
              item[k] = value
            }
            // obj.sizeData.push({id:this.sizeArr.find((item) => item.fieldName === k).id, value: true})
          }
        }
      })
    }
  }
  makeUpLimitData() {
    const colorOptions = this.form.colorList
    const insideLengthOption = this.form.Goods.goodsLongList
    const sizeTypeOption = this.sizeArr
    this.sizeLimitData = []
    for (const colors of colorOptions) {
      for (const inside of insideLengthOption) {
        const obj: any = {
          colorName: colors.colorName || colors.name,
          colorId: colors.colorId,
          insideLength: this.v_detailConfig.goodsLongList.find((item) => item.value === inside).label,
          longId: inside
        }
        for (const size of sizeTypeOption) {
          // 从深拷贝的数据中 获取到当前选择的 size 数据
          // obj.id = size.id
          obj[size.fieldName] = this.deepCopyLimitData.findIndex((item) => {
            return item.color === colors.name && item.insideLength === inside && obj[size.fieldName]
          }) > -1
        }
        this.sizeLimitData.push(obj)
      }
    }
    this.deepCopyLimitData = deepCopy(this.sizeLimitData)
  }
  // 计算尺码限制的表头
  concatHeader(arr: any[]) {
    const insideLengthOption = this.form.Goods.goodsLongList
    const sizeLimitHeader:TableHeaderConfig[] = [{
      label: '颜色',
      value: 'colorName'
    }]
    if (insideLengthOption) {
      const insideRow = {
        label: '内长',
        width: '80px',
        value: 'insideLength'
      }
      sizeLimitHeader.push(insideRow)
    }
    arr.forEach(item => {
      sizeLimitHeader.push({
        label: item.name,
        value: item.fieldName,
        type: 'checkbox',
        width: '80px'
      })
    })
    return sizeLimitHeader
  }
  // checkbox 的变化
  checkboxChange(value, index, name) {
    this.deepCopyLimitData[index][name] = value
  }
  // 重置 把选择的数据清空
  reset() {
    this.deepCopyLimitData = []
    this.makeUpLimitData()
  }
  confirm() {
    this.sizeLimitVisible = false
    // 这里要整理传给后端的数据
    const arr: any[] = []
    this.sizeLimitData.forEach((item) => {
      const obj:any = {
        colorId: item.colorId,
        longId: item.longId,
        sizeData: [],
        goodsId: '',
        id: ''
      }
      for (const k in item) {
        if (item[k] === true) {
          obj.sizeData.push({ id: this.sizeArr.find((item) => item.fieldName === k).id, value: true })
        }
      }
      if (obj.sizeData.length > 0) arr.push(obj)
    })
    this.form.sizeDisableList = arr
  }
}
</script>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.size-limit-btn{
  margin:18px 0 0 10px;
}
.limit-content{
  max-width: 500px;
  &-header{
    display: flex;
    justify-content: space-between;
    padding: 0 12px 12px 12px;
    border-bottom: 1px solid #eee;
    margin: 0 -12px;
  }
  &-btn{
    text-align:right;
    margin-top:20px;
  }
}
</style>
