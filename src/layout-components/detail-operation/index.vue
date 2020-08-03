<template>
  <div class="handle-btn-group">
    <el-button
      v-for="item in outerLayerBtns"
      :id="item.id || ''"
      :key="item.name"
      :icon="item.icon"
      :type="item.type || ''"
      :plain="item.plain ? true : false"
      :class="[{ warningClass: warningBtn.includes(item.value) }, item.class]"
      :disabled="!btnsAuth[item.value]"
      @click="handleEvent(item.value, item.lang, item.interface)">
      <i
        v-if="!item.hiddenIcon"
        class="iconfont f14"
        :class="item.svgIcon" />
      <span :class="[!item.hiddenIcon ? 'mgl-6' : '']">{{ $t(item.lang) }}</span>
    </el-button>
    <!-- 打印 -->
    <el-dropdown
      v-if="printBtns.length > 0"
      size="small"
      trigger="click"
      placement="bottom"
      :hide-on-click="false">
      <el-button
        type="text"
        :disabled="!btnsAuth.print">
        <i class="iconfont f14 rbp-operate_print " />
        <span class="mgl-6">{{ $t('operationGroup.btns.print') }}</span>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in printList"
          :key="item.id"
          class="hover print-list">
          <span
            class="f12 hover"
            @click="printPlain(item)">{{ item.templateName }}</span>
          <span
            class="f12 color-info mgl-6"
            @click="preview(item)">{{
              $t('commonWord.preview')
            }}</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="printManage">
            {{ $t('commonWord.printingManagement') }}
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 更多 用于放不常用的按钮 -->
    <el-dropdown
      v-if="moreContentBtns.length > 0"
      size="small"
      class="more-btn"
      :hide-on-click="false">
      <div class="el-dropdown-link mgl-20">
        <i class="iconfont rbp-operate_more f14 mgr-6" />
        <span class="f12">{{ $t('commonWord.more') }}</span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-button
          v-for="item in moreContentBtns"
          :id="item.id || ''"
          :key="item.name"
          :icon="item.icon"
          :type="item.type || ''"
          :plain="item.plain ? true : false"
          :class="[{ warningClass: warningBtn.includes(item.value) }, item.class]"
          class="block-btn"
          :disabled="!btnsAuth[item.value]"
          @click="handleEvent(item.value, item.lang, item.interface)">
          <i
            v-if="!item.hiddenIcon"
            class="iconfont f14"
            :class="item.svgIcon" />
          <span :class="[!item.hiddenIcon ? 'mgl-6' : '']">{{ $t(item.lang) }}</span>
        </el-button>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 放上一页/下一页/操作记录的按钮 -->
    <el-button
      v-for="item in rightBtns"
      :id="item.id || ''"
      :key="item.name"
      :icon="item.icon"
      :type="item.type || ''"
      :plain="item.plain ? true : false"
      :class="[{ warningClass: warningBtn.includes(item.value) }, item.class]"
      :disabled="!btnsAuth[item.value]"
      @click="handleEvent(item.value, item.lang, item.interface)">
      <i
        v-if="!item.hiddenIcon"
        class="iconfont f14"
        :class="item.svgIcon" />
      <span :class="[!item.hiddenIcon ? 'mgl-6' : '']">{{ $t(item.lang) }}</span>
    </el-button>
    <slot name="followBtn" />
    <div
      v-if="showStatus"
      class="status-box">
      <slot name="beforeStatus" />
      <slot name="billStatus">
        <span
          :class="statusMap[billStatus]"
          class="f16">{{
            $t('operationGroup.status')[billStatus]
          }}</span>
      </slot>
      <slot name="otherStatus" />
    </div>

    <print-manage
      ref="printManage" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { DetailOperationConfig, DialogObj, TableHeaderConfig } from '@/typings'
import commonApi from '@/api/common-api/index'
const MORE_CONTENT_BTNS = ['import', 'export', 'unaudit', 'invalid', 'restore']

const RIGHT_BTNS = ['prev', 'next', 'record']

const PRINT_BTNS = ['print']
interface Window {
  myProp: any
}
@Component({
  name: 'common-operation',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    printManage: () => import('./printManage.vue')
  }
})
export default class detail extends Vue {
  @Prop({ required: true }) btnList: DetailOperationConfig[]
  @Prop({ default: true }) showStatus: boolean
  @Prop() billId
  @Prop() billStatus: string
  @Prop() btnsAuth: Object

  @Watch('btnList', { immediate: true })
  onBtnListChange(val, newVal) {
    if (val.length) {
      const outerLayer = [...MORE_CONTENT_BTNS, ...RIGHT_BTNS, ...PRINT_BTNS]
      this.moreContentBtns = val.filter((item) => MORE_CONTENT_BTNS.includes(item.value))
      this.outerLayerBtns = val.filter((item) => !outerLayer.includes(item.value))
      this.rightBtns = val.filter((item) => RIGHT_BTNS.includes(item.value))
      this.printBtns = val.filter((item) => PRINT_BTNS.includes(item.value))
    }
  }
  statusMap = {
    unaudit: 'danger',
    audit: 'success',
    reverseAudit: 'warning',
    invalid: 'invalid',
    disable: 'invalid',
    enable: 'success'
  }
  moreContentBtns: DetailOperationConfig[] = []
  outerLayerBtns: DetailOperationConfig[] = []
  rightBtns: DetailOperationConfig[] = []
  printBtns: DetailOperationConfig[] = []
  printList: any[] = []
  warningBtn: string[] = ['delete', 'invalid']
  // 拥有打印管理的权限集合
  // printManageAuth: string[]=['700001', '700002', '700003'];

  mounted() {
    // 如果有打印功能 则获取打印列表
    if (this.btnList.findIndex((item) => item.value === 'print') > -1) {
      this.getPrintList()
    }
  }
  async getPrintList() {
    const res = await this._post({
      url: commonApi.getPrintList,
      data: {
        status: [100]
      }
    })
    if (res.code === 0) {
      this.printList = res.data
    }
  }
  async printPlain(item) {
    const printConfig: DetailOperationConfig = this.printBtns[0]

    const printApi = printConfig.interface!.apiUrl

    if (!printApi) {
      // throw new Error('请配置打印单据的API')
      this._message({ message: '请配置打印单据的API', type: 'warning' })
      return
    }

    try {
      const printResponse = await this._get({ url: `${commonApi.getPrintDetail}/${item.id}` })
      // 获取到打印配置的详情模板
      const { templateFileContent } = printResponse.data
      var report = new (window as any).Stimulsoft.Report.StiReport()
      // report.loadFile('/reports/billSalePlan.mrt')
      report.load(templateFileContent)
      report.dictionary.databases.clear()
      var dataSet = new (window as any).Stimulsoft.System.Data.DataSet('billData')
      // 获取到单据打印信息
      const res = await this._post({
        url: printApi,
        data: { ids: [this.billId] }
      })
      if (res.code === 0) {
        dataSet.readJson(res.data)
        report.regData('billData', 'billData', dataSet)
        report.renderAsync(function() {
          report.print()
        })
      }
    } catch (error) {
      this._message({ message: '请求有误', type: 'error' })
    }
  }
  async preview(item) {
    const printConfig: DetailOperationConfig = this.printBtns[0]

    const printApi = printConfig.interface!.apiUrl

    if (!printApi) {
      // throw new Error('请配置打印单据的API')
      this._message({ message: '请配置打印单据的API', type: 'warning' })
      return
    }
    const routeData = this.$router.resolve({
      name: 'printPreview',
      params: {
        printId: item.id,
        ids: this.billId,
        printApi
      },
      query: {
        printId: item.id,
        ids: this.billId,
        printApi
      }
    })
    window.open(routeData.href, '_blank')
  }
  handleEvent(event, name, config) {
    const confirmText = this.$t('dialogPrompt')[event]
    if (confirmText && ['cancel'].includes(event)) {
      this._confirm({ content: confirmText })
        .then(() => {
          this.$emit(event, Object.assign({}, config, { name }))
        })
        .catch(() => {
          return false
        })
    } else {
      this.$emit(event, Object.assign({}, config, { name }))
    }
  }
  printManage() {
    this.$nextTick(() => {
      (this.$refs['printManage'] as any).open()
    })
  }
}
</script>
<style lang="scss">
@import 'src/styles/variables.scss';

.el-dropdown-menu--small {
  margin: 0 !important;
  top: 146px !important;
}
.el-dropdown-menu__item.hover.print-list {
  display: flex;
  justify-content: space-between;
}
.el-button--text {
  color: $colorTextPrimary;
  // padding: 7px 12px;
  &:hover {
    color: $basic;
  }
}
.warningClass.el-button--text {
  &:hover {
    color: $danger;
  }
}
</style>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.block-btn {
  display: block;
  margin: 0 !important;
}
.handle-btn-group {
  background: #fff;
  height: 44px;
  line-height: 44px;
  padding: 0 16px;
  .status-box {
    float: right;
    font-size: 14px;
  }
  /deep/.el-button--text {
    color: $colorTextPrimary;
    padding: 7px 0 7px 20px !important;
    &:hover {
      color: $basic;
    }
  }
  /deep/ .warningClass.el-button--text {
    &:hover {
      color: $danger;
    }
  }
  /deep/.el-button.is-disabled {
    color: $colorTextPlaceholder;
  }
  /deep/.el-button + .el-button {
    margin-left: 0;
  }
  /deep/.is-disabled.is-plain {
    background-color: #fff !important;
    border-color: #eee !important;
    color: $colorTextPlaceholder !important;
    &:hover {
      background-color: #fff !important;
      border-color: #eee !important;
      color: $colorTextPlaceholder !important;
    }
  }
  .status-box {
    display: flex;
    flex-direction: column;
    line-height: 1;
    align-items: center;
    height: 44px;
    justify-content: space-around;
  }
  .status {
    color: $success;
    padding: 7px 0;
  }
  .prev-btn {
    position: relative;
    margin-left: 20px !important;
    &::before {
      position: absolute;
      top: 6px;
      left: 0;
      content: '';
      width: 1px;
      height: 20px;
      background: $borderColorBase;
    }
  }
}
.base-dialog {
  /deep/.el-dialog__body {
    padding: 20px 16px;
  }
}
</style>
