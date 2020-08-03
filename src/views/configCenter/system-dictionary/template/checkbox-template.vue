<template>
  <div class="list-warrper">
    <div
      v-for="val in checkList"
      :key="val.id"
      class="check-box"
      :class="[val.status? 'is-checked': 'no-checked']">
      <el-checkbox
        :checked="val.status === 100 ? true: false"
        @change="handleChange(val)">
        {{ val.name }}
        <el-input
          v-if="val.gbCodeLength"
          v-model.number="val.gbCode"
          size="small"
          :maxlength="val.gbCodeLength"
          show-word-limit
          :placeholder="$t('form.placeholder.default')"
          @blur="handleUpdate(val)" />
      </el-checkbox>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import vuexMixins from '../configs/vuex-module'
import apiUrl from '@/api/config-center/system-dictionary'
interface checkList{
  customFieldMap?:any
  gbCode:any
  id:number
  name:string
  status:number
}
const STATUS_MAP = new Map([
  [100, [101, 'disable']],
  [101, [100, 'disable']]
])
@Component({
  name: 'checkbox-template',
  components: {
    baseTitle: () => import('@/components/base-title/index.vue')
  }
})
export default class list extends mixins(vuexMixins) {
  checkList:checkList[] = []
  flag:boolean = false

  created() {
    this.getList()
  }
  async handleChange(row) {
    const action = STATUS_MAP.get(row.status)!

    this.updateFn(row, action[0])

    //  这里有 gbCode 是国际码7位/8位 需要输入框输入规则后更新
  }
  // handleInput(value) {
  //   if (value.length > 7) {
  //     this.checkList[0].gbCode = value.slice(0, 7)
  //   }
  // }
  async handleUpdate(row) {
    this.updateFn(row, row.status)
  }
  async updateFn(row, status) {
    const { id, gbCode } = row
    const res = await this._put({ url: apiUrl.update, data: { data: { id, status: status, gbCode }}})
    if (res.code === 0) {
      this._message({ message: this.$t('commonWord.success'), type: 'success' })
      this.getList()
    }
  }
  async getList() {
    const res = await this._post({ url: apiUrl.list, data: { data: '' }})
    this.checkList = res.data
  }
}
</script>
<style lang="scss" scoped>
.list-warrper{
  .check-box{
    height: 44px;
    color:#353D51;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left:14px;
    margin-bottom: 16px;
    margin-right: 10px;
    border-radius: 4px;
    /deep/.el-checkbox__label{
      font-size: 16px;
      margin-left:5px;
    }
  }
  .is-checked{
    background: #F5F9FF;
  }
  .no-checked{
    background: #F5F5F7;
  }

}
</style>
