<template>
  <div
    class="multiple-box"
    :class="{'disable-multiple-box':disabled }">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.label"
      :closable="!disabled"
      type="info"
      class="multiple-box__tags"
      size="mini"
      @close="handleClose(tag, index)">
      {{ tag.label }}
    </el-tag>
    <span
      v-show="tagList.length > 3"
      class="multiple-box__nums"> +{{ tagList.length - 3 }} </span>
    <button
      :disabled="disabled"
      class="multiple-box__add common-button"
      @click="addOptions">
      <i
        class="el-icon-plus hover"
        :class="{ 'disabel-icon': disabled }" />
    </button>

    <prop-filter-dialog
      :dialogObj="dialogObj"
      :propFilterTabs="propFilterTabs"
      :isSingleSelect="isSingleSelect"
      :dataGroup="dataGroup"
      @confirm="confirm" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { DialogObj, Dictionary } from '@/typings'

@Component({
  name: 'multiple-box',
  components: {
    propFilterDialog: () => import('./prop-filter-dialog.vue')

  }
})
export default class multipleBox extends Vue {
  @Prop({ default: true }) propFilterTabs: any[]
  @Prop({ default: true }) multileConfig: Dictionary<any>
  @Prop({ default: false }) isSingleSelect: Boolean
  @Prop() dataGroup: Dictionary<any>

  @Prop() disabled: boolean
  // 不需要监听对象里面数组的变化
  @Watch('dataGroup', { immediate: true })
  onDataGroupChange(val: Dictionary, old: any) {
    // console.log('dataGroup val', val, 'old', old)
    // this.tagList = []
    // if (JSON.stringify(old) === '{}' || !old) {
    // 这里只是在第一次赋值的时候才响应式的给 tagList 赋值
    this.tagList = this.getHasPorp(val)
    // }
  }

  dialogObj: DialogObj = {
    isShowDialog: false,
    title: '',
    modalAppendToBody: true,
    width: '790px'
  }

  tagList:any[] = []

  get tags() {
    return this.tagList.slice(0, 3)
  }

  handleClose(tag, index) {
    this._confirm({ content: this.$t('commonWord.deleteTag') }).then(async() => {
      // 这里是先获取到数据 这里的逻辑主要是用于 有分组的
      await this.$emit('deleteTag', tag.value)
      // 然后把该属性 已选择的值 置为空
      // this.$emit('openDialog')
      this.$set(this.dataGroup, tag.value, [])

      await this.confirm()
    })
  }

  addOptions() {
    // 这里触发的事件是为了 点击的时候去从接口中获取已选数据 如果不需要则外层不予处理事件
    this.$emit('openDialog')
    // 这里给筛选器存储对象赋值key
    this.propFilterTabs.forEach((k) => {
      if (!this.dataGroup[k.value]) {
        this.$set(this.dataGroup, k.value, [])
      }
    })
    this.dialogObj.isShowDialog = true
    this.dialogObj.title = this.$t(this.multileConfig.lang)
  }
  // 从已选值里面得到属性分类
  getHasPorp(val) {
    const currentChoose: any[] = []
    for (const k in val) {
      if (val[k].length) {
        currentChoose.push({
          label: this.propFilterTabs.find((item) => item.value === k).label,
          value: k
        })
      }
    }

    return currentChoose
  }
  confirm(selected?) {
    const obj = {}
    // const chooseData = selected ? obj[selected] = this.dataGroup[selected] : this.dataGroup
    const chooseData: any = {}
    if (selected) {
      chooseData[selected] = this.dataGroup[selected]
      // 找到选择那些属性
      this.tagList = this.getHasPorp(chooseData)
      this.$emit('confirm', chooseData, selected)
    } else {
      // 找到选择那些属性
      this.tagList = this.getHasPorp(this.dataGroup)
      this.$emit('confirm', this.dataGroup)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.multiple-box.disable-multiple-box{
    background-color: #F5F7FA;
    border-color: $borderColorBase;
    color: $colorTextPlaceholder;
    cursor: not-allowed;
}
.multiple-box {
  position: relative;
  flex: 1;
  margin: 0 10px 0 20px;
  height: 28px;
  border: 1px solid $borderColorBase;
  border-radius: 2px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  &__tags {
    margin-right: 4px;
    background: #eee;
    border: none;
    color: $colorTextRegular;
    padding: 0 6px;
    font-size: 12px;
    border-radius: 2px;
  }
  &__nums {
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    color: $colorTextRegular;
    background: #eeeeee;
    padding: 0 6px;
  }
  .disabel-icon {
    color: $colorTextPlaceholder;
    cursor: not-allowed;
  }
  &__add {
    position: absolute;
    right: 8px;
    font-size: 12px;
    color: $colorTextRegular;
  }
  /deep/.el-tag--mini {
    line-height: 20px;
  }
}
</style>
