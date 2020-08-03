<template>
  <div class="detail">
    <!-- 操作栏 -->
    <operation
      :formData="formData.module"
      @save="save" />
    <!-- 表单列表 -->
    <formlist
      ref="formlist"
      :formList="formList"
      :formData="formData.module"
      :disabled="v_disabled"
      :status="v_status"
      class="form-module mgt-12"
      @baseModuleId="baseModuleChange">
      <template v-slot:id="{ row }">
        <el-form-item
          :label="$t(row.lang) || row.label"
          :prop="row.value"
          :rules="row.rules">
          <el-input
            v-model="moduleType"
            disabled
            size="small"
            class="small-width" />
          -
          <el-input
            v-model.number="formData.module[row.value]"
            :disabled="v_disabled"
            :placeholder="$t('form.placeholder.input', { msg: '' })"
            size="small"
            maxlength="4"
            show-word-limit
            class="medium-width" />
        </el-form-item>
      </template>
    </formlist>
    <!-- 模块属性 -->
    <div>
      <base-title
        :ref="anchorConfig[0].ref"
        :title="$t(anchorConfig[0].lang)" />
      <formlist
        :formList="modulePropFormList"
        :formData="formData.module"
        :disabled="v_disabled"
        :status="v_status">
        <!-- 发货渠道范围 -->
        <template v-slot:sendChannels="{ row }">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.value"
            :rules="row.rules">
            <multile-prop-search
              :propFilterTabs="propFilterTabs"
              :disabled="v_disabled"
              :multileConfig="row"
              :dataGroup="sendChannelsObj"
              class="multile-search"
              @confirm="confirm(row.value, $event)" />
          </el-form-item>
        </template>
        <!-- 收获渠道范围 -->
        <template v-slot:receiveChannels="{ row }">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.value"
            :rules="row.rules">
            <multile-prop-search
              :propFilterTabs="propFilterTabs"
              :multileConfig="row"
              :disabled="v_disabled"
              :dataGroup="receiveChannelsObj"
              class="multile-search"
              @confirm="confirm(row.value, $event)" />
          </el-form-item>
        </template>
        <!-- 供应商范围 -->
        <template v-slot:suppliers="{ row }">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.value"
            :rules="row.rules">
            <multile-prop-search
              :propFilterTabs="supplierFilterTabs"
              :multileConfig="row"
              :dataGroup="suppliersObj"
              :disabled="v_disabled"
              class="multile-search"
              @confirm="confirm(row.value, $event)" />
          </el-form-item>
        </template>
      </formlist>
    </div>
    <!-- 特性配置 -->
    <feature
      :ref="anchorConfig[1].ref"
      :disabled="v_disabled"
      :featureData="formData.features" />

    <base-anchor
      :anchor="anchorConfig"
      :element="$refs" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig, initFormData, propFilterTabsConfig, suppliePropFilterTab } from './configs'
import { Dictionary, AnchorConfig, Response, DialogObj } from '@/typings'
import { Watch } from 'vue-property-decorator'
import apiUrl from '@/api/config-center/module-config'
import { transformFields, nest } from '@/utils'
import { Tools } from '@/utils/tools'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import detailMixins from '@/mixins/detail-mixins'
// const SHOW_TYPE = {
//     '1': 'input',
//     '2': 'number',
//     '3': 'datePick',
//     '4': 'checkbox',
//     '5': 'select',
//     '6': 'mulitSelect'
// }
@Component({
  name: 'module-detail',
  components: {
    baseAnchor: () => import('@/components/base-anchor/index.vue'),
    baseTitle: () => import('@/components/base-title/index.vue'),
    operation: () => import('./operation.vue'),
    feature: () => import('./tabs/feature.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    multilePropSearch: () => import('@/components/multile-prop-search/index.vue')
    // propFilterDialog: () => import('./componetns/propfilter.vue')
  }
})
export default class App extends mixins(vuexMixins, detailMixins) {
  // 观察 ID
  @Watch('v_id', { immediate: true })
  onv_idChange(val) {
    if (val) {
      this.viewDetail(val.split('_')[0])
    }
  }
  // 观察模块业务类型 获取 code 值
  @Watch('formData.module.type')
  onTypeChange(val) {
    if (val) {
      const options = this.formList.find((item) => item.value === 'type')!.options!
      if (options.length) {
        this.moduleType = options.find((item) => item.value === val)!.code
      }
    }
  }

  @Watch('v_status', { immediate: true })
  onv_statusChange(val, oldval) {
    if (['add', 'cancel'].includes(val)) this.reset()
  }

  formList = detailConfig.formList
  anchorConfig = detailConfig.anchorConfig
  modulePropFormList = detailConfig.moduleProp
  propFilterTabs = propFilterTabsConfig
  supplierFilterTabs = suppliePropFilterTab
  moduleType: string | number = ''

  sendChannelsObj: Dictionary<any> = {}
  receiveChannelsObj: Dictionary<any> = {}
  suppliersObj: Dictionary<any> = {}

  formData: Dictionary<any> = initFormData()

  mounted() {
    this.getChannelDialogSelect()
  }
  // 获取详情
  async viewDetail(id) {
    const res = await this._get({ url: `${apiUrl.detail}/${id}` })
    if (res.code === 0) {
      const { features, receiveChannels, suppliers, sendChannels, id, ...other } = res.data
      console.log(res.data)
      other.id = id.slice(2)
      // 需要对特性值的下拉框格式化
      this.formatFeatureSelect(features || [])
      this.sendChannelsObj = this.arrayToObj(sendChannels)
      this.suppliersObj = this.arrayToObj(suppliers)
      this.receiveChannelsObj = this.arrayToObj(receiveChannels)

      this.formData = Object.assign(
        {},
        { module: other },
        { receiveChannels, features: features || [], suppliers, sendChannels }
      )
      // 0 禁用 => 10 ,1 启用 => 11
      // const status = other.enableStatus ? '11' : '10'
      this.$store.dispatch(`${this.m_moduleId}/v_setBtnsAuth`, other.status)
    }
  }
  //  对返回的渠道范围 供应商范围的值进行处理
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
  // 根据基础模块的 id  获取特性值
  baseModuleChange({ val }) {
    if (val) {
      this.getFeatures(val)
    }
  }
  // 获取特性值
  async getFeatures(val) {
    // getFeatures
    const [getFeatures, getCustomFlag] = await Promise.all([
      this._get({ url: `${apiUrl.getFeatures}/${val}` }),
      this._get({ url: `${apiUrl.getCustomFlag}/${val}` })
    ])
    // const res = await this._get({ url: `${apiUrl.getCustomFlag}/${val}` })
    if (getFeatures.code === 0) {
      const data = getFeatures.data
      this.formatFeatureSelect(data)
      this.formData.features = data
    }
    if (getCustomFlag.code === 0) {
      this.getFeaturesStatus(getCustomFlag.data)
    }
  }
  getFeaturesStatus(data) {
    const map = new Map([
      ['businessTypes', 'businessTypeFlag'],
      ['mainChannelType', 'mainChannelTypeFlag'],
      ['preBusinessTypes', 'preBusinessTypeFlag'],
      ['priceTypes', 'priceTypeFlag'],
      ['receiveChannels', 'receiveChannelFlag'],
      ['sendChannels', 'sendChannelFlag'],
      ['subjectId', 'subjectFlag'],
      ['suppliers', 'supplierFlag']
    ])
    if (data) {
      this.$nextTick(() => {
        this.modulePropFormList.forEach((item, index) => {
          if (map.get(item.value as string)) {
            Vue.set(this.modulePropFormList[index], 'disabled', !data[map.get(item.value as string) as string])
            // item.disabled = !data[map.get(item.value as string) as string]
          }
        })
      })
    }
  }
  formatFeatureSelect(data) {
    data.forEach((item) => {
      if (item.itemList) {
        item.itemList = transformFields(item.itemList, { label: 'title', value: 'id' })
        // 如果是多选的则需要用逗号分割 并且转换位数字
        item.value =
          item.dataType === 6 ? item.value.split(',').map((k) => Number(k)) : Number(item.value)
      }
    })
  }
  // 获取 渠道范围弹窗下拉框值
  async getChannelDialogSelect() {
    const [channel, supplier] = await Promise.all([
      this._get({ url: apiUrl.propFilterSelect }),
      this._get({ url: apiUrl.supplierPropFilterSelect })
    ])
    const actions = new Map<any, any>([
      [
        ['areaTree', 'organizationTree'],
        (val, keys) => {
          const nestResult = nest(val, 0, 'parentId', false) || []
          Tools.setValueAndName(nestResult)
          Tools.setOptions(nestResult, keys, propFilterTabsConfig, 'treeOptions')
          Tools.setOptions(nestResult, keys, suppliePropFilterTab, 'treeOptions')
        }
      ],
      [
        [
          'channelBusinessFormat',
          'channelBalanceType',
          'brand',
          'fundAccount',
          'supplierNature',
          'supplerType'
        ],
        (val, keys) => {
          Tools.setValueAndName(val)
          Tools.setOptions(val, keys, propFilterTabsConfig)
          Tools.setOptions(val, keys, suppliePropFilterTab)
        }
      ],
      ['default', () => {}]
    ])
    if (channel.code === 0) {
      const mergeData = Object.assign({}, channel.data, supplier.data)
      for (const k in mergeData) {
        actions.forEach((value, keys) => {
          const action: any = keys.includes(k) ? value : actions.get('default')
          action.call(this, mergeData[k], k)
        })
      }
    }
  }
  // 发货渠道范围 供应商范围 收获渠道范围 条件值赋值
  confirm(type, form) {
    const data: any[] = []
    for (const key in form) {
      if (form[key].length) {
        data.push({
          // moduleId: this.formData.module.id,
          conditionKey: key,
          conditionValues: form[key]
        })
      }
    }
    this.formData[type] = data
  }
  // 重置
  reset() {
    this.formData = initFormData()
  }
  // 这里渠道范围 供应商 table 类型的 数据需要格式化 只保留id
  formatTable(arr: any[]) {
    return arr.map((item) => item.id)
  }

  // 保存
  async save() {
    // 校验表头字段
    await (this.$refs.formlist as any).saveTable()
    const confirmText = this.$t('dialogPrompt.save')

    const { module, features, sendChannels, receiveChannels, suppliers } = this.formData
    this._confirm({ content: confirmText })
      .then(async() => {
        // 这里需要 对 特性值 features 多选框赋值
        features.forEach((item) => {
          if (item.dataType === 6) {
            // 如果是多选的则需要用逗号分割 并且转换位数字
            item.value = item.value.join(',')
          }
        })

        // 这里渠道范围 供应商 table 类型的 数据需要格式化 只保留id
        const sendTableIndex = sendChannels.findIndex((item) => item.conditionKey === 'channelCode')
        const receiveTableIndex = receiveChannels.findIndex(
          (item) => item.conditionKey === 'channelCode'
        )
        const suppliersTableIndex = suppliers.findIndex(
          (item) => item.conditionKey === 'supplierCode'
        )

        if (sendTableIndex > -1) {
          sendChannels[sendTableIndex].conditionValues = this.formatTable(
            sendChannels[sendTableIndex].conditionValues
          )
        }

        if (receiveTableIndex > -1) {
          receiveChannels[receiveTableIndex].conditionValues = this.formatTable(
            receiveChannels[receiveTableIndex].conditionValues
          )
        }

        if (suppliersTableIndex > -1) {
          suppliers[suppliersTableIndex].conditionValues = this.formatTable(
            suppliers[suppliersTableIndex].conditionValues
          )
        }
        module.id = this.moduleType + module.id

        const saveData = {
          data: Object.assign({}, module, { features, sendChannels, receiveChannels, suppliers })
        }
        const url = this.v_status === 'add' ? apiUrl.create : apiUrl.update
        const res = await this[this.v_status === 'add' ? '_post' : '_put']({ url, data: saveData })
        if (res.code === 0) this.m_dealSaveAction(res)
      })
      .catch(() => {})
  }
}
</script>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.detail {
  background: #fff;
  .small-width {
    display: inline-block;
    width: 46px;
  }
  .medium-width {
    display: inline-block;
    width: calc(100% - 60px);
  }
  .multile-search {
    margin: 0;
  }
}
</style>
