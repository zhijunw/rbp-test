<template>
  <div class="set-permission">
    <p class="f16 mgb-12">
      {{ currentMoudleData.label }}
    </p>
    <el-checkbox
      :value="checkAllGlobal"
      :indeterminate="indeterminateGlobal"
      class="mgb-24"
      :disabled="disabled"
      @change="setAllFn">
      {{ $t('commonWord.allSelect') }}
    </el-checkbox>
    <!-- 页面权限 -->
    <div class="right-page mgb-24">
      <p class="common-tag mgb-12 f12">
        {{ $t('rolesPermission.page') }}
      </p>
      <div class="page-box">
        <el-checkbox
          v-if="page && page.length > 0"
          v-model="checkAllPage"
          :indeterminate="pageIndeterminate"
          :disabled="disabled"
          @change="handleCheckAllPageChange">
          {{ $t('commonWord.allSelect') }}
        </el-checkbox>
        <p
          v-else
          class="tips">
          {{ $t('commonWord.noData') }}
        </p>
        <div class="page-list">
          <div
            v-for="(item, index) in page"
            :key="index"
            class="page-item">
            <base-checkbox
              ref="pagePermission"
              :checkAllText="item.name"
              :checkGroupList="item.authValue"
              :checkList.sync="item.choose"
              :selectProps="{ isLine: true }"
              :disabled="disabled" />
          </div>
        </div>
      </div>
    </div>
    <!-- 操作权限 -->
    <div class="right-operation mgb-24">
      <p class="common-tag mgb-12 f12">
        {{ $t('rolesPermission.operation') }}
      </p>
      <div class="checkbox">
        <base-checkbox
          v-if="operation && operation.list.length > 0"
          ref="operationPermission"
          :checkGroupList="operation.list"
          :checkList.sync="operation.choose"
          :selectProps="{ isLine: true }"
          :disabled="disabled" />
        <p
          v-else
          class="tips">
          {{ $t('commonWord.noData') }}
        </p>
      </div>
    </div>
    <!-- 字段权限 -->
    <div class="right-fildes common-bd">
      <p class="common-tag mgb-12 f12">
        {{ $t('rolesPermission.fields') }}
      </p>
      <template v-if="fields.list.length > 0">
        <el-row>
          <el-col :span="16">
            <el-table
              :data="fields.data"
              size="mini"
              border
              :style="{width:TableWidth}">
              <el-table-column
                prop="index"
                :label="$t('reportCommonWord.index')"
                width="60"
                align="center" />
              <el-table-column
                prop="name"
                :label="$t('reportCommonWord.fields')"
                width="80"
                align="center" />
              <el-table-column
                v-for="item in fields.list"
                :key="item.value"
                :prop="item.value"
                :label="item.label"
                :min-width="100"
                align="center">
                <template
                  slot="header"
                  slot-scope="scope"
                  align="center">
                  <span class="mgr-10">{{ scope.column.label }}</span>
                  <el-checkbox
                    :value="isCheckAllKey(item,'fields', 'data')"
                    :disabled="disabled"
                    :indeterminate="fields.data.every((k) => k[item.value] === false) ? false : !isCheckAllKey(item,'fields', 'data')"
                    @change="(value) => changeHeaderBox(value, scope, item.value)" />
                </template>
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row[item.value]"
                    :disabled="disabled"
                    @change="(value) => changeCheckbox(value, item.value, scope)" />
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <p
          class="tips">
          {{ $t('commonWord.noData') }}
        </p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { tabsConfig } from '../configs/index'
import { Dictionary } from '@/typings'
import { Watch, Prop } from 'vue-property-decorator'

@Component({
  name: 'permission-group',
  components: {
    baseCheckbox: () => import('@/components/base-checkbox/index.vue')
  }
})
export default class App extends Vue {
  @Prop({ required: true }) currentMoudleData: Dictionary
  @Prop({ required: true }) page: Dictionary
  @Prop({ required: true }) operation: Dictionary
  @Prop({ required: true }) fields: Dictionary
  @Prop({ default: false }) disabled: boolean

  checkAllPage: boolean = false
  pageIndeterminate: boolean = false

  // permission全选状态
  get checkAllGlobal(): boolean {
    const checkAllPage = this.checkAllPage
    const checkAllOperate = (this.operation.choose.length > 0) && this.operation.list.length === this.operation.choose.length
    const checkAllFields = this.fields.list.every(k => this.isCheckAllKey(k, 'fields', 'data'))
    return checkAllPage && checkAllOperate && checkAllFields
  }

  // permission不确定状态
  get indeterminateGlobal(): boolean {
    const emptyPage = this.page.every(k => k.choose.length === 0)
    const emptyOperate = this.operation.choose.length === 0
    const emptyFields = this.fields.list.every(k => this.isNotCheckAllKey(k, 'fields', 'data'))
    return (emptyPage && emptyOperate && emptyFields) ? false : !this.checkAllGlobal
  }

  get TableWidth() {
    if (this.fields.list.length >= 10) {
      return '100%'
    } else {
      return (this.fields.list.length + 2) * 100 + 'px'
    }
  }

  @Watch('page', { deep: true, immediate: true })
  onPageChanged(val) {
    let countOperate = 0
    let countChoose = 0

    val.forEach(e => {
      countOperate = countOperate + e.authValue.length
      countChoose = countChoose + e.choose.length
    })

    this.checkAllPage = countOperate === countChoose
    this.pageIndeterminate = countChoose > 0 && countChoose < countOperate
  }

  setAllFn(val) {
    this.handleCheckAllPageChange(val)
    ;(this.$refs.operationPermission as any).handleCheckAllChange(val)

    // 获取到可选的字段权限操作
    const fieldsAction: string[] = this.fields.list && this.fields.list.map((item) => {
      // 把 表头全选字段 勾选
      item.checked = val
      return item.value
    })
    this.fields.data.forEach((item) => {
      for (const action of fieldsAction) {
        item[action] = val
      }
    })
  }

  // 字段权限的 表头 动作 全选
  changeHeaderBox(value, scope, action) {
    this.fields.data.forEach((item, index) => {
      this.$set(this.fields.data[index], action, value)
    })
  }

  // 字段权限的 子集 选择
  changeCheckbox(value, action, row) {
    this.fields.list.forEach((item) => {
      if (item.value === action) {
        // 如果有一个未选择 则 checked 为 false 全部选择 为 true
        item.checked = this.fields.data.every((k) => k[action] === true)
      }
    })
  }

  /**
   * 页面权限全选操作
   */
  handleCheckAllPageChange(val: boolean) {
    this.page.forEach((item) => {
      this.$set(item, 'choose', val ? item.authValue.map((page) => page.value) : [])
    })
  }

  /**
   * 是否复选框列表每行的key都勾选上了
   **/
  isCheckAllKey(item, group, key) : boolean {
    return this[group][key].every((k) => k[item.value] === true)
  }
  /**
   * 是否复选框列表每行的key都没勾选
   **/
  isNotCheckAllKey(item, group, key) : boolean {
    return this[group][key].every((k) => k[item.value] === false)
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.set-permission {
  .tips {
    font-size: 12px;
    color: #7C7E85
  }

  .common-tag {
    color: $basic;
    text-indent: 6px;
    height: 14px;
    line-height: 14px;
    border-left: 4px solid $basic;
  }

  .page-box {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    .page-list {
      margin-left: 20px
    }
  }
}
</style>
