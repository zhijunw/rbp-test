<template>
  <div class="dataset">
    <div class="dataset-group">
      <slot name="title" />
      <el-card
        v-for="(item, index) in datasetGroup"
        :key="index"
        class="box-card">
        <div
          slot="header"
          class="box-card__header">
          <span class="f14">{{ item.groupName }}</span>
          <el-button
            class="right"
            type="text"
            icon="el-icon-plus"
            :disabled="disabled"
            @click="add(item)">
            {{ $t('commonWord.add') }}
          </el-button>
        </div>
        <template v-if="item.list.length">
          <div
            v-for="(k, listId) in item.list"
            :key="listId"
            class="box-card__item">
            <span class="f14">{{ $t('datasetPermission.detailTabs.group') }}{{ listId +1 }}</span>
            <multile-prop-search
              :propFilterTabs="item.propTabs"
              :multileConfig="{lang: item.lang}"
              :dataGroup="k.formdata"
              :disabled="v_disabled"
              class="multile-search"
              @openDialog="openDialog(item,k)"
              @deleteTag="deleteTag(item,k,$event)"
              @confirm="confirm(item,k,$event)" />
            <button
              :disabled="disabled"
              class="common-button"
              @click="deleteItem(item.list, listId)">
              <i
                class="rbp-operate_delete iconfont hover"
                :class="{'disabel-icon': disabled }" />
            </button>
          </div>
        </template>
        <template v-else>
          <div class="box-card__empty">
            <p class="f12 color-placeholde">
              {{ $t('datasetPermission.detailTabs.noData') }}
            </p>
            <el-button
              id="btn_g_d_blue"
              class="mgt-14"
              plain
              icon="el-icon-plus"
              :disabled="disabled"
              @click="add(item)">
              {{ $t('datasetPermission.detailTabs.addOptions') }}
            </el-button>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { tabsConfig } from '../configs/index'
import { DialogObj, Dictionary, CommonConfig } from '@/typings'
import { Prop } from 'vue-property-decorator'
import { Tools } from '@/utils/tools'
import { transformFields, nest } from '@/utils'
import apiUrl from '@/api/permission/dataset'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import commonApi from '@/api/common-api/index'

interface AddListConfig {
  // label: string
  value: string
  choose: any[],
  groupNo: string | number
  categoryChoose: {}
}
@Component({
  name: 'dataset-group',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    multilePropSearch: () => import('@/components/multile-prop-search/index.vue')

  }
})
export default class datasetGroup extends mixins(vuexMixins) {
  @Prop({ default: false }) disabled: boolean

  datasetGroup = tabsConfig.datasetGroup
  groupsData: any = {
    mainChannelList: [],
    minorChannelList: [],
    supplierList: [],
    goodsList: []
  } // 这里是保存所有分组已选的数据

  recordDelteGroup: Dictionary = {}
  memoizedAdd: any
  mounted() {
    this.getChannelDialogSelect()
  }

  // 把各个渠道下面的条件组的已选分类 和数据相关联
  getDatasetGroupData(list) {
    for (const k in list) {
      this.datasetGroup.forEach((group, index) => {
        if (group.groupId === k) {
          if (!list[k].length) {
            group.list = []
            this.groupsData[k] = []
            return
          }
          const groupList = list[k]
            .sort((a, b) => a.groupNo - b.groupNo)
            .reduce((k, m) => {
              const obj: any = {}
              obj.dataId = m.dataId
              obj.groupNo = m.groupNo
              obj.groupId = group.groupId
              this.$set(obj, 'formdata', {})
              const index = k.findIndex((item) => item.groupNo === m.groupNo)
              if (index > -1) {
                // 这里只是填充一下数据 让 内部组件能够知道哪些属性是选择了的
                k[index].formdata[m.conditionKey] = [1]
              } else {
                obj.formdata[m.conditionKey] = [1]
                k.push(obj)
              }
              return k
            }, [])
          this.$set(this.datasetGroup[index], 'list', groupList)
        }
      })
    }
  }

  // 获取 渠道范围弹窗下拉框值
  async getChannelDialogSelect() {
    const [channel, supplier, goods] = await Promise.all([
      this._get({ url: commonApi.propFilterSelect }),
      this._get({ url: commonApi.supplierPropFilterSelect }),
      this._get({ url: commonApi.goodsPropFilterSelect })
    ])
    const actions = new Map<any, any>([
      [['areaTree', 'organizationTree'], (val, keys) => {
        const nestResult = nest(val, 0, 'parentId', false) || []
        Tools.setValueAndName(nestResult)
        Tools.setOptions(nestResult, keys, this.datasetGroup[0].propTabs, 'treeOptions')
        Tools.setOptions(nestResult, keys, this.datasetGroup[1].propTabs, 'treeOptions')
        Tools.setOptions(nestResult, keys, this.datasetGroup[2].propTabs, 'treeOptions')
      }],
      [['channelBusinessFormat', 'channelBalanceType', 'brand', 'fundAccount', 'supplierNature', 'supplerType', 'type', 'series', 'year'],
        (val, keys) => {
          Tools.setValueAndName(val)
          this.datasetGroup.forEach((item) => {
            Tools.setOptions(val, keys, item.propTabs)
          })
        }],
      ['default', () => {}]
    ])
    if (channel.code === 0) {
      const mergeData = Object.assign({}, channel.data, supplier.data, goods.data)
      for (const k in mergeData) {
        actions.forEach((value, keys) => {
          const action: any = keys.includes(k) ? value : actions.get('default')
          action.call(this, mergeData[k], k)
        })
      }
    }
  }
  add(item) {
    const add = {
      // label: `条件组${item.list.length + 1}`,
      value: item.list.length + 1 + '',
      groupNo: new Date().getTime(),
      dataId: '',
      formdata: {}
    }
    item.list.push(add)
  }

  // 打开属性筛选的时候需要去获取数据
  async openDialog(parent, groups) {
    // console.log('item',item,'k',k)
    if (Object.keys(groups.formdata).some((v) => JSON.stringify(groups.formdata[v]) === '[1]')) {
      const res = await this._post({
        url: apiUrl.getAuthDataValue,
        data: { user: '', data: {
          dataType: groups.groupId.slice(0, groups.groupId.indexOf('List')),
          dataId: groups.dataId,
          groupNo: groups.groupNo }}
      })
      if (res.code === 0) {
        const data = res.data
        groups.formdata = this.arrayToObj(data)
      }
    }
  }
  // 删除属性标签
  async deleteTag(parent, groups, tag) {
    console.log('parent', parent, 'groups', groups, 'tag', tag)
    await this.openDialog(parent, groups)
    groups.formdata[tag] = []
  }
  arrayToObj(arr: any[]) {
    const obj = {}
    arr.forEach((item) => {
      obj[item.conditionKey] = obj[item.conditionKey] || []
      if (item.listModule) {
        obj[item.conditionKey].push(item.listModule)
      } else {
        obj[item.conditionKey].push(Number(item.conditionValue))
      }
    })
    return obj
  }
  confirm(parent, groups, form) {
    console.log('parent', parent, 'groups', groups, 'form', form)
    const tableKey = ['channelCode', 'goodsCode', 'supplierCode']
    if (this.groupsData[parent.groupId].length) {
      this.groupsData[parent.groupId] = this.groupsData[parent.groupId].filter((item) => item.groupNo !== groups.groupNo)
    }
    // 这里在添加数据
    for (const key in form) {
      if (form[key].length) {
        this.groupsData[parent.groupId].push({
          conditionKey: key,
          conditionValues: tableKey.includes(key) ? form[key].map((item) => item.id) : form[key],
          dataId: groups.dataId || '',
          // conditionDesc:
          groupNo: groups.groupNo,
          id: ''
        })
      }
    }
  }

  save() {
    // 这里也要把删除的数据放入进数据里面
    for (const k in this.groupsData) {
      const deleteItem = this.recordDelteGroup[k] || []

      this.groupsData[k] = [...this.groupsData[k], ...deleteItem]
    }
    return this.groupsData
  }

  // 删除某个渠道下面的条件组
  deleteItem(crrentList, index) {
    const deleteItem = crrentList.splice(index, 1)[0]
    // 如果是删除已保存的则要 记录下来 更新的时候也需要传给后端
    if (deleteItem.groupId) {
      this.recordDelteGroup[deleteItem.groupId] = this.recordDelteGroup[deleteItem.groupId] || []
      this.recordDelteGroup[deleteItem.groupId].push({
        dataId: deleteItem.dataId,
        groupNo: deleteItem.groupNo,
        conditionValues: []
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';

.dataset-group {
  max-width: 940px;
  margin-top: 24px;
  &__title {
    position: relative;
    font-size: 16px;
    color: $basic;
    font-weight: 500;
    margin: 0 0 16px 0;
    &::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 20px;
      background: #186cff;
      margin-right: 8px;
      vertical-align: middle;
    }
  }
  .box-card {
    display: inline-block;
    width: 460px;
    height: 250px;
    box-sizing: border-box;
    margin: 0 16px 16px 0;
    &:nth-child(2n + 1) {
      margin-right: 0;
    }
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 36px;
      // line-height: 36px;
    }
    &__item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      justify-content: space-around;
      /deep/.select-popper {
        display: none;
      }
    }

    &__select {
      flex: 1;
      margin: 0 10px 0 16px;
    }
    &__empty {
      padding-top: 64px;
      text-align: center;
    }
  }
  /deep/.el-card__header {
    padding: 0 16px;
    box-shadow: 0px 0px 6px 0px rgba(36, 40, 63, 0.1);
  }
}
.dataset-dialog {
  /deep/.el-dialog__body {
    padding: 16px;
  }
  .active {
    color: $basic;
  }
  &__content {
    display: flex;
  }
  .choose-area {
    height: 380px;
    padding: 12px 12px 0 12px;
    /deep/.el-input--small {
      width: 276px;
    }
  }
  .tabs-box {
    height: 380px;
    &__export {
      height: 32px;
      line-height: 32px;
      border: 1px solid #d7d7d7;
      border-top: none;
      box-shadow: 0px -2px 6px 0px rgba(238, 238, 238, 1);
      padding-left: 16px;
    }
    &__checkbox {
      /deep/.el-checkbox {
        margin-bottom: 6px;
      }
      /deep/.el-checkbox-group {
        display: flex;
        flex-direction: column;
      }
    }
  }
  .tabs__item {
    height: 42px;
    line-height: 42px;
    // &:last-child{
    //   border-bottom: none;
    // }
  }
}
.empty-option {
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  color: $colorTextPlaceholder;
  &:hover {
    cursor: pointer;
  }
}
</style>
