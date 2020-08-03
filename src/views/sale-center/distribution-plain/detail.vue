<template>
  <div class="detail">
    <!-- 操作栏 -->
    <operation
      :formData="formData.noticeBill"
      @save="save"
      @import="importGoods" />
    <!-- 表单列表 -->
    <div
      class="formlist-box"
      :class="[toggleFlag ? 'height-auto' : 'fix-height']">
      <formlist
        ref="formlist"
        :formList="formList"
        :formData="formData.noticeBill"
        :disabled="v_disabled"
        :status="v_status"
        :showAllForm="false"
        class="form-module mgt-12"
        @priceTypeId="priceTypeIdChangeHock"
        @toggle="toggle">
        <template v-slot:channelId="{ row, formData }">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.value"
            :rules="row.rules">
            <channel-high-search
              :ref="`channelHighSearch${row.value}`"
              :highSearchConfig="row.highSearchConfig"
              :value.sync="formData[row.value]"
              :disabled="v_disabled"
              @fuzzyChange="channelIdChangeHock"
              @singleChannelChoose="(value)=>{singleChannelChoose(value,row.value)}" />
          </el-form-item>
        </template>
        <template v-slot:toChannelId="{ row, formData }">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.value"
            :rules="row.rules">
            <channel-high-search
              :ref="`channelHighSearch${row.value}`"
              :highSearchConfig="row.highSearchConfig"
              :value.sync="formData[row.value]"
              :disabled="row.disabled || v_disabled"
              @fuzzyChange="toChannelIdChangeHock"
              @singleChannelChoose="(value)=>{singleChannelChoose(value,row.value)}" />
          </el-form-item>
        </template>
        <template v-slot:salePlanBillId="{ row, formData }">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.value"
            :rules="row.rules">
            <advanced-search
              :ref="`channelHighSearch${row.value}`"
              :highSearchConfig="row.highSearchConfig"
              :value.sync="formData[row.value]"
              :disabled="row.disabled || v_disabled"
              @fuzzyChange="salePlanBillIdChangeHock"
              @singleChannelChoose="(value)=>{singleChannelChoose(value,row.value)}" />
          </el-form-item>
        </template>
      </formlist>
      <div
        ref="totalInfo"
        class="total-info total-hover"
        @mouseleave="leaveImage"
        @mouseenter.prevent="enterImage($event)">
        <div
          v-for="(item,index) in totalInfo"
          :key="item.id"
          class="total-info-box">
          <template v-if="index===0?!!salePlanBillId:true">
            <p class="f12">
              {{ item.label }}
            </p>
            <span
              class="f18 bold"
              :class="item.class">{{ item.value }}
            </span>
          </template>
        </div>
      </div>
    </div>
    <common-tabs
      id="tabBox"
      ref="commonTab"
      :tabMapOptions="tabMapOptions"
      :activeName.sync="activeName"
      class="mgt-10">
      <template v-slot:goodsDetail>
        <goods-detail
          id="goodsDetail"
          ref="goodsDetail"
          :salePlanBillId="salePlanBillId"
          :salePlanArray="salePlanArray"
          :formData="formData" />
      </template>
      <template v-slot:freightInfo>
        <freight-info
          ref="freightInfo"
          :formData="formData" />
      </template>
    </common-tabs>
    <systemDialog ref="systemDialog" />
    <importGoodsDialog ref="importGoodsDialog" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { detailConfig, initFormData } from './configs'
import { Dictionary, AnchorConfig, Response } from '@/typings'
import { Watch } from 'vue-property-decorator'
import apiUrl from '@/api/sale-center/distribution-plain'
import vuexMixins from '@/mixins/vuex-modulel-mixins'

import detailMixins from '@/mixins/detail-mixins'
import { Tools } from '@/utils/tools'
// 需要固定列
const FIX_PROPS_TABS = {
  'bill_main': 'formList'
}
// let priceTypeOption :any[] = [];
@Component({
  name: 'distributionPlain-detail',
  components: {
    importGoodsDialog: () => import('./components/importGoods.vue'),
    systemDialog: () => import('./components/system-dialog.vue'),
    operation: () => import('./operation.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    commonTabs: () => import('@/layout-components/common-tabs/index.vue'),
    goodsDetail: () => import('./tabs/productDetail.vue'),
    freightInfo: () => import('./tabs/freight.vue'),
    billHighSearch: () => import('@/components/advanced-search/index.vue'),
    channelHighSearch: () => import('@/components/advanced-search/index.vue'),
    advancedSearch: () => import('@/components/advanced-search/index.vue')
  }
})
export default class App extends mixins(vuexMixins, detailMixins) {
  // 观察 ID
  @Watch('v_id', { immediate: true })
  onv_idChange(val, oldval) {
    if (val && val !== oldval) {
      Tools.debounce(this.viewDetail(val.split('_')[0]), 50)
    }
  }
  @Watch('v_status', { immediate: true })
  onv_statusChange(val, oldval) {
    if (['add', 'cancel'].includes(val)) this.reset()
  }
  @Watch('formData.billGoodsList', { immediate: true, deep: true })
  onGoodsListChange(val, oldval) {
    let total = 0
    let totalPrice = 0
    let own = 0
    val.forEach((item) => {
      if (item.quantity) {
        total += item.quantity
      }
      if (item.totalPrice) {
        totalPrice = totalPrice + Number(item.totalPrice)
      }
      if (item.oweQuantity) {
        own += Number(item.own)
      }
    })
    this.totalInfo[0].value = own
    this.totalInfo[1].value = total
    this.totalInfo[2].value = `${totalPrice}`
  }
  // 销售计划更改事件
  salePlanBillIdChangeHock(target, callback) {
    const { value, matchValArr } = target
    // 不一致才执行
    value !== this.salePlanBillId && (() => {
      // 销售计划已有选择
      if (this.salePlanBillId) {
        (this.$refs['systemDialog'] as any).message('修改销售计划单将清空下方货名明细，是否继续？', (status) => {
          if (status) {
            // 清空货品明细
            this.salePlanBillId = value
            this.salePlanRelationCheck({ row: matchValArr[0], boolean: true })
            this.formData.billGoodsList = []
            this.salePlanBillId && (this.$refs['importGoodsDialog'] as any).showImportGoodsDialog(value, function(selectRow, array) {
              this.salePlanGoodsListReadIntoTable(selectRow, array)
              callback && callback()
            }.bind(this))
          } else {
            // 还原
            this.formData.noticeBill.salePlanBillId = this.salePlanBillId
          }
        })
      } else {
        this.salePlanBillId = value
        this.salePlanRelationCheck({ row: matchValArr[0], boolean: true })
        this.formData.billGoodsList = [];
        (this.$refs['importGoodsDialog'] as any).showImportGoodsDialog(value, (selectRow, array) => {
          this.salePlanGoodsListReadIntoTable(selectRow, array)
          callback && callback()
        })
      }
    })()
  }

  // 价格类型更改事件
  priceTypeIdChangeHock({ val }) {
    if (!this.salePlanBillId) {
      if (val !== this.priceType && this.formData.billGoodsList.length > 0) {
        (this.$refs['systemDialog'] as any).message('修改价格类型将重新计算货品明细的折扣和结算价，是否继续？', (status) => {
          if (status) {
            // 确认修改
            this.priceType = val;
            (this.$refs['goodsDetail'] as any).updateGoodsByChannelIdOrPriceType(this.toChannelId, this.priceType)
          } else {
            // 取消还原
            this.formData.noticeBill.priceTypeId = this.priceType
          }
        })
      }
    }
  }

  // 收货渠道更改事件
  toChannelIdChangeHock(target, callback) {
    const { value } = target
    if (value === this.formData.noticeBill.channelId && value.toString().length > 0) {
      this.$message.warning(`收货渠道与发货渠道一致,请重新选择`)
      this.$nextTick(() => {
        this.formData.noticeBill.toChannelId = this.toChannelId
      })
    } else if (!this.salePlanBillId) {
      if (value !== this.toChannelId && this.formData.billGoodsList.length > 0) {
        (this.$refs['systemDialog'] as any).message('修改收货渠道可能会根据渠道的分销政策更新价格类型，从而导致货品明细的折扣和结算价发生变化，是否继续？', (status) => {
          if (status) {
            // 确认修改[修改价格]
            this.toChannelId = value;
            (this.$refs['goodsDetail'] as any).updateGoodsByChannelIdOrPriceType(this.toChannelId, this.priceType)
            callback && callback()
          } else {
            // 取消还原
            this.formData.noticeBill.toChannelId = this.toChannelId
          }
        })
      }
    }
  }

  // 发货渠道更改时间
  channelIdChangeHock(target) {
    const { value } = target
    if (value === this.formData.noticeBill.toChannelId && value.toString().length > 0) {
      this.$message.warning(`收货渠道与发货渠道一致,请重新选择`)
      this.$nextTick(() => {
        this.formData.noticeBill.channelId = ''
      })
    }
  }

  // 销售计划有值时,禁用收货渠道/价格类型同时设置对应的值 [校验]  /row 销售计划对应的数据，boolean 是否赋值 ：false只禁用 true:禁用+赋值
  salePlanRelationCheck({ row, boolean }) {
    this.formList[5].disabled = !!this.salePlanBillId
    this.formList[6].disabled = !!this.salePlanBillId
    boolean && (() => {
      if (this.salePlanBillId) {
        (this.$refs['channelHighSearchtoChannelId'] as any).upDateOptionsData([{
          label: `${row.channelCode}-${row.channelName}`,
          value: row.channelId
        }])
        this.formData.noticeBill.toChannelId = row.channelId
        this.formData.noticeBill.priceTypeId = row.priceTypeId
      } else {
        this.formData.noticeBill.toChannelId = ''
        this.formData.noticeBill.priceTypeId = ''
      }
    })()
  }

  // 销售计划下货品列表写入底部Table
  salePlanGoodsListReadIntoTable(selectRow, array) {
    this.$set(this, 'salePlanArray', array)
    selectRow.forEach(row => {
      row.goodsFields = {
        goodsBuildDate: '',
        goodsStyleName: ''
      }
    })
    this.formData.billGoodsList = [...this.formData.billGoodsList, ...selectRow]
  }

  // 当前销售计划下的货品明细数组
  salePlanArray: any[] = [];
  // 当前销售计划Id[可用于还原]
  salePlanBillId: any = '';
  // 当前到货渠道[可用于还原]
  toChannelId: any = '';
  // 当前价格类型[可用于还原]
  priceType:any = '';
  // 筛选
  formList = detailConfig.formList;
  // 伸缩
  toggleFlag: boolean = true;
  // 表单属性初始化
  formData: Dictionary<any> = initFormData();
  // 货品明细/货运明细切换
  activeName: string = 'goodsDetail';
  // tab标题
  tabMapOptions = detailConfig.tabsList;
  // 右上角信息
  totalInfo: any[] = [
    {
      label: '总欠数',
      value: 0,
      id: 1,
      class: 'color-base'
    },
    {
      label: '配货数',
      value: '0',
      id: 2,
      class: 'color-base'
    },
    {
      label: '配货金额',
      value: '0',
      id: 3,
      class: 'color-base'
    }
  ];

  created() {
    this.getModuleCustomerFileds()
  }
  // 获取模块的自定义字段
  async getModuleCustomerFileds() {
    this.customerFieldsTabs = []
    // 获取自定义字段和分类
    await this.m_getModuleCustomerFiledsFn(
      FIX_PROPS_TABS,
      this.formData.noticeBill,
      this.m_moduleId
    )
    this.toggle(true)
  }
  // 获取详情
  async viewDetail(id) {
    const res = await this._get({
      url: `${apiUrl.details}`,
      params: {
        id: id,
        moduleId: this.m_moduleId
      }
    })
    if (res.code === 0) {
      const { billGoodsList, billLogistics, customFieldMap, ...other } = res.data
      const { status, flowStatus, flowDto } = other
      // 更新物流信息
      // billLogistics && (this.$refs['freightInfo'] as any).detailCheck({
      //   country:billLogistics.country,
      //   province:billLogistics.province,
      //   city:billLogistics.city
      // });
      this.$nextTick(() => {
        this.formData = Object.assign(
          {},
          { noticeBill: Object.assign({}, other, customFieldMap, { salePlanBillId: other.salePlanId }) },
          { customFieldMap },
          {
            billGoodsList: billGoodsList || [],
            billLogistics: billLogistics || {}
          }
        )
        // 更新渠道信息
        const channel:any[] = ['channelId', 'toChannelId']
        channel.forEach(item => {
          this.$nextTick(() => {
            (this.$refs[`channelHighSearch${item}`] as any).upDateOptionsData([
              { label: `${other[`${item.replace('Id', '')}Code`]}-${other[`${item.replace('Id', '')}Name`]}`, value: other[item] }
            ])
          })
        })
        // 更新销售单信息
        this.$nextTick(() => {
          (this.$refs['channelHighSearchsalePlanBillId'] as any).upDateOptionsData([
            { label: other.salePlanBillNo, value: other.salePlanId }
          ])
        })
        // 写入配置
        this.salePlanBillId = other.salePlanId
        this.toChannelId = other.toChannelId
        this.priceType = other.priceTypeId
        this.salePlanRelationCheck({ boolean: false, row: {}})
        this.m_dealActivityStatus(status, flowStatus, flowDto)
      })
    }
  }
  // 初始化表单数据
  reset() {
    // this.formData = initFormData()
    this.m_reset('noticeBill')
    this.salePlanArray = []
    this.salePlanBillId = ''
    this.toChannelId = ''
    this.priceType = ''
  }
  // 高级搜索器弹窗选择
  singleChannelChoose({ row }, name) {
    if (row.id) {
      const updateFunc = () => {
        this.$set(this.formData.noticeBill, name, row.id)
        this.$nextTick(() => {
          (this.$refs[`channelHighSearch${name}`] as any).upDateOptionsData([{
            label: name === 'salePlanBillId' ? row.billNo : `${row.code}-${row.name}`,
            value: row.id
          }])
        })
      }
      // 联动基础下拉选择事件
      switch (name) {
        case 'salePlanBillId':
          this.salePlanBillIdChangeHock({ value: row.id, matchValArr: [row] }, updateFunc)
          break
        case 'toChannelId':
          this.toChannelIdChangeHock({ value: row.id }, updateFunc)
          break
        case 'channelId':
          updateFunc()
          break
      }
    } else {
      this.$set(this.formData.noticeBill, name, '')
    }
  }
  // 伸缩
  toggle(toggleFlag) {
    this.toggleFlag = toggleFlag
    this.$nextTick(() => {
      const formHieght = (this.$refs.formlist as any).$el.clientHeight
      const height = this.toggleFlag ? `${formHieght}px` : '72px'
      ;(this.$refs.totalInfo as any).style.height = height
    })
  }
  // 打开图片
  enterImage(e) {
    // const formHieght = `${Math.ceil(this.formList.length / 4) * 60 + 6}`
    const formHieght = (this.$refs.formlist as any).$el.clientHeight
    const totalInfoHeight = `${this.totalInfo.length * 48 + 32}`
    const maxHeight = Math.max(Number(formHieght), Number(totalInfoHeight))
    ;(this.$refs.totalInfo as any).style.height = this.toggleFlag ? `${maxHeight}px` : `${totalInfoHeight}px`
    ;(this.$refs.totalInfo as any).style.transition = 'all 0.2s ease'
  }
  // 关闭图片
  leaveImage() {
    const formHieght = (this.$refs.formlist as any).$el.clientHeight
    const height = this.toggleFlag ? `${formHieght}px` : '72px'
    ;(this.$refs.totalInfo as any).style.height = height
    ;(this.$refs.totalInfo as any).style.transition = 'all 0.2s ease'
  }
  // 保存
  async save() {
    // 校验表头字段
    await (this.$refs.formlist as any).saveTable()
    const flag = (this.$refs.goodsDetail as any).validateTable()
    if (!flag) {
      const confirmText = this.$t('dialogPrompt.save')

      this._confirm({ content: confirmText })
        .then(async() => {
          // 保存筛选数据
          const { noticeBill, billGoodsList, customFieldMap, ...other } = JSON.parse(JSON.stringify(this.formData))
          noticeBill.salePlanId = noticeBill.salePlanBillId
          // 把自定义字段值都放到  customFieldMap 中
          for (const key in customFieldMap) {
            if (Object.keys(noticeBill).includes(key)) {
              customFieldMap[key] = noticeBill[key]
              delete noticeBill[key]
            }
          }
          // 货品明细的自定义字段赋值
          const formatBillGoodsList = billGoodsList.map((item) => {
            if (item.customFields) {
              for (const k in item.customFields) {
                item.customFields[k] = item[k] || ''
                delete item[k]
              }
            }
            return item
          })
          const saveData = {
            data: Object.assign(
              { moduleId: this.m_moduleId },
              { billGoodsList: formatBillGoodsList },
              { customFieldMap },
              noticeBill,
              other
            )
          }
          const url = this.v_status === 'add' ? apiUrl.create : apiUrl.update
          const res = await this[this.v_status === 'add' ? '_post' : '_put']({ url, data: saveData })
          if (res.code === 0) this.m_dealSaveAction(res)
        })
        .catch(() => {})
    }
  }
  // 货品录入
  importGoods() {
    ((this.$refs['goodsDetail'] as any).$refs['fileImport'] as any).ClickEvent()
  }
}
</script>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.detail {
  background: #fff;
  .formlist-box {
    display: flex;
    position: relative;
    .form-module {
      flex: 1;
      margin-right: 180px;
    }
    .total-info {
      // position: relative;
      // box-sizing: 1000;
      // z-index: 1000;
      // background: #fff;
      position: absolute;
      right: 0;
      z-index: 100;
      background: #fff;
      width: 170px;
      padding: 16px;
      box-sizing: border-box;
      border: 1px solid #eee;
      border-radius: 4px;
      margin: 12px 0 0 8px;
      // max-height: 218px;
      height: 72px;
      // overflow: auto;
      overflow: hidden;
      &:hover {
        box-shadow: 0px 0px 12px 0px rgba(166, 167, 173, 0.3);
      }
    }
    .total-info-box {
      line-height: 1.5;
      margin-bottom: 6px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .fix-height {
    height: 80px;
    transition: height 1s ease;
  }
  .height-auto {
    height: auto;
    transition: height 1s ease;
  }
}
</style>
