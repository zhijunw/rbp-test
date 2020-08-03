<template>
  <base-dialog
    :dialog-obj="dialogObj"
    class="base-dialog"
    @confirm="confirm">
    <div
      slot="content"
      class="box">
      <slot name="header">
        <div class="box-header">
          <div class="box-header-name">
            <p class="mgb-6">
              <span class="color-red">*</span>
              {{ $t('commonWord.name') }}
            </p>
            <el-input
              v-model="config.name"
              :placeholder="$t('form.placeholder.default')"
              size="small" />
          </div>
          <!-- 编辑状态下不显示 -->
          <el-checkbox
            v-show="!config.viewId && isAdmin"
            v-model="saveAsView">
            {{ $t('reportCommonWord.SaveSystemView') }}
          </el-checkbox>
        </div>
      </slot>

      <div class="box-list mgt-12">
        <div class="box-list__fields  border-base-1 mgr-18">
          <div class="search-box">
            <span>{{ $t('commonWord.optionalField') }}</span>
            <base-input
              :value="filterFields"
              :inputProps="{
                prefixIcon: 'el-icon-search'
              }"
              @change="inputChange" />
          </div>
          <div class="fileds-item-warrper">
            <div
              v-for="(item, index) in config.fields"
              :key="index"
              class="fileds-item">
              <el-checkbox
                v-model="item.checkAll"
                class="lineheight-36 border-b-base-1 pdlr-10 flex-align box-shadow"
                :indeterminate="
                  config.choose.length > 0 && config.choose.length < item.children.length
                "
                @change="handleCheckAllChange($event, item)">
                {{ item.kindName }}
              </el-checkbox>
              <base-checkbox
                :check-group-list="item.children"
                :check-list.sync="config.choose"
                :select-props="{ showCheckAll: false }"
                class="checkbox" />
            </div>
          </div>
        </div>
        <div class="box-list__choose ">
          <!-- 已选字段排序 -->
          <div class="choose-item border-base-1 flex-3">
            <p class="f14 lineheight-48 border-b-base-1 pdlr-10 box-shadow">
              {{ $t('commonWord.selectedFields') }}({{ chooseList.length }})
            </p>
            <draggable
              :list="config.choose"
              class="choose-list"
              ghost-class="ghost">
              <div
                v-for="item in chooseList"
                :key="item.value"
                class="item lineheight-36 f12 flex-space pdlr-12  border-b-base-1">
                <div class="hover-move flex-1 flex-align text-over">
                  <svg-icon
                    name="sort_btn"
                    class-name="w12 h12" />
                  <el-tooltip
                    :disabled="$t(item.lang).length < 18"
                    :content="$t(item.lang)"
                    placement="top"
                    effect="dark">
                    <span class="mgl-4 text-over flex-1">{{ $t(item.lang) || item.label }}</span>
                  </el-tooltip>
                </div>
                <i
                  v-if="!item.disabled"
                  class="el-icon-close hover"
                  @click="delItem(item.value)" />

                <el-tooltip
                  effect="dark"
                  content="点击将字段加入到排序规则设置中进行字段内数值的排序设置"
                  placement="top-start">
                  <div
                    slot="content"
                    class="info-content">
                    点击将字段加入到排序规则设置中进行字段内数值的排序设置
                  </div>
                  <el-button
                    icon="el-icon-circle-plus-outline"
                    class="hover mgl-6 btn-icon"
                    size="small"
                    type="text"
                    @click="addSort(item)" />
                </el-tooltip>
              </div>
            </draggable>
          </div>
          <div
            v-if="!config.isSortRules"
            class="choose-item border-base-1 mgt-10 flex-2">
            <p class="f14 lineheight-48 border-b-base-1 pdlr-10 box-shadow">
              排序规则设置
            </p>
            <draggable
              :list="config.choose"
              class="sort-list"
              ghost-class="ghost">
              <div
                v-for="item in sortChoose"
                :key="item.value"
                class="item lineheight-36 f12 flex-space pdlr-12  border-b-base-1">
                <div class="hover-move flex-1 flex-align text-over">
                  <svg-icon
                    name="sort_btn"
                    class-name="w12 h12" />
                  <el-tooltip
                    :disabled="$t(item.lang).length < 18"
                    :content="$t(item.lang)"
                    placement="top"
                    effect="dark">
                    <span class="mgl-4 text-over flex-1">{{ $t(item.lang) || item.label }}</span>
                  </el-tooltip>
                </div>
                <i
                  class="el-icon-sort-down sort-icon"
                  :class="{ activeClass: !item.sortType || item.sortType === 1 }"
                  @click="sort('aesc', item)" />
                <i
                  class="el-icon-sort-up sort-icon"
                  :class="{ activeClass: item.sortType === 2 }"
                  @click="sort('desc', item)" />
                <i
                  class="el-icon-close hover mgl-6"
                  @click="delSortChoose(item.value)" />
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </base-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Options, Dictionary, DialogObj } from '@/typings'
import { Tools } from '@/utils/tools'
import draggable from 'vuedraggable'
import { getCookie } from '@/utils/auth'
import it from 'element-ui/src/locale/lang/it'
interface TableHeaderFieldsConfig {
  fields: any[]
  choose: string[]
  name: string
  isSortRules?: boolean
  viewId?: number
  noCommit?: boolean
}
@Component({
  name: 'tableheader-config',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    baseCheckbox: () => import('@/components/base-checkbox/index.vue'),
    draggable
  }
})
export default class tableheaderConfig extends Vue {
  @Prop() config: TableHeaderFieldsConfig
  @Prop() dialogObj: DialogObj
  saveAsView: boolean = false
  filterFields: string | number = ''
  sortChoose: any[] = []

  get chooseList() {
    const currentChoose: string[] = this.config.choose
    return currentChoose.map((fields) => {
      return Tools.withChildrenFlattenNoParent(this.config.fields).find(
        (item) => item.value === fields
      )
    })
  }
  get isAdmin() {
    return getCookie('userNo') === 'admin'
  }

  inputChange(value) {
    this.config.fields.forEach(item => {
      item.children.forEach(em => {
        em.hideElement = em['label'].indexOf(value) === -1
      })
    })
  }
  // 删除右边列表子项
  delItem(value) {
    const current = this.config.choose
    current.splice(current.indexOf(value), 1)
    this.delSortChoose(value)
  }
  // 添加到排序规则
  addSort(item) {
    if (this.sortChoose.findIndex((sort) => sort.value === item.value) === -1) {
      this.sortChoose.push(item)
    }
  }
  // 删除匹配规则设置
  delSortChoose(value) {
    this.sortChoose.splice(
      this.sortChoose.findIndex((item) => item.value === value),
      1
    )
  }
  // 匹配规则的排序
  sort(type, item) {
    const sortType = type === 'aesc' ? 1 : 2
    item.sortType = sortType
  }
  handleCheckAllChange(val, item) {
    this.$set(this.config, 'choose', val ? this.selectAll(item) : this.cancelSelectAll(item))
  }
  // 全选
  selectAll(item) {
    const currentChoose = this.config.choose
    const allFieldsId = item.children.map((k) => k.value)
    return Array.from(new Set([...currentChoose, ...allFieldsId]))
  }
  // 那些必选字段 必须保存
  cancelSelectAll(item) {
    return item.children
      .map((k) => {
        return k.requiredFlag ? k.value : ''
      })
      .filter((j) => j)
  }
  confirm() {
    if (!this.config.name) {
      this._message({ message: this.$t('reportCommonWord.placeInputViewName'), type: 'warning' })
      return
    }
    const reportViewColumnList = this.chooseList.map((item) => {
      const obj = this.sortChoose.find((sort) => sort.columnKey === item.columnKey) || {}
      return {
        columnKey: item.columnKey || item.columnName,
        columnName: item.columnName,
        columnTitle: item.columnTitle,
        customFlag: item.customFlag,
        sizeFlag: item.sizeFlag,
        customType: item.customType,
        baseArchivesName: item.baseArchivesName,
        reportSizeTypeName: item.reportSizeTypeName,
        id: item.id,
        kindName: item.kindName,
        sortType: obj.sortType || item.sortType || 0
      }
    })
    // 如果从输出字段进来的则不需要新建或者更新

    if (this.config.noCommit) {
      this.$set(this.dialogObj, 'isShowDialog', false)
      this.$emit('updateViewChoose', {
        reportViewColumnList,
        viewName: this.config.name,
        saveAsView: this.saveAsView
      })
    } else {
      this.$emit('confirmView', {
        reportViewColumnList,
        viewName: this.config.name,
        saveAsView: this.saveAsView
      })
    }
  }
  cancel() {}
}
</script>
<style lang="scss">
.base-dialog {
  .el-dialog__body {
    padding: 10px 16px;
  }
}
</style>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.checkbox {
  padding: 10px 20px;
  background: $baseTableBg;
  /deep/.el-checkbox {
    margin-bottom: 20px;
    width: 25%;
    margin-right: 0;
    padding-right: 20px;
    box-sizing: border-box;
  }
  /deep/.el-checkbox__label {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.base-dialog {
  .el-icon-close {
    width: 16px;
    height: 16px;
    vertical-align: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: 100% 50%;

    &:before {
      transform: scale(0.6);
      display: inline-block;
      vertical-align: -3px;
    }

    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
  .choose-list {
    height: 215px;
    overflow: auto;
  }
  .sort-list {
    height: 144px;
    overflow: auto;
  }

  .box-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }
  .box-list {
    display: flex;

    .fileds-item-warrper {
      max-height: 45vh;
      overflow: auto;
    }
    &__fields {
      flex: 1;
      .search-box {
        display: flex;
        justify-content: space-between;
        height: 48px;
        /* line-height: 48px; */
        padding: 0 10px;
        border-bottom: 1px solid #d7d7d7;
        align-items: center;
        font-size: 14px;
      }
    }
    &__choose {
      width: 240px;
      display: flex;
      flex-direction: column;
      height: calc(45vh + 48px);
      overflow: auto;
    }

    .choose-list,
    .sort-list {
      height: calc(100% - 48px);
      overflow: auto;
    }
  }

  .sort-icon {
    font-size: 12px;
    display: inline-block;
    margin-right: -4px;
  }
  .activeClass {
    color: $basic;
  }
  .info-content {
    width: 200px;
  }
}
</style>
