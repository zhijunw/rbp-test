<template>
  <div>
    <formlist
      ref="formlist"
      style="background: white"
      :formList="formList"
      :formData="formData"
      :disabled="false"
      class="form-module"
      @fuzzyChange="singleChannelChoose"
      @singleChannelChoose="singleChannelChoose">
      <template v-slot:search="{}">
        <el-form-item
          :label="' '">
          <el-button
            type="primary"
            size="medium"
            @click="search">
            {{ $t('commonWord.search') }}
          </el-button>
        </el-form-item>
      </template>
    </formlist>
    <base-table
      v-loading="tableLoading"
      :tableData="tableData"
      :colunmData="colunmData"
      :tableConfig="tableConfig" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { detailConfig } from '../configs'
import vuexMixins from '../configs/vuex-module'
import { Dictionary, Response } from '@/typings'
import { goodsSearchConfig } from '@/layout-components/vip-dialog/config'
import commonApiUrl from '@/api/common-api/index'

  @Component({
    name: 'goods-freight',
    components: {
      formlist: () => import('@/components/formlist/index.vue'),
      baseTable: () => import('@/components/base-table/index.vue')
    }
  })
export default class App extends mixins(vuexMixins) {
    formList = [
      {
        label: '箱号',
        value: 'code',
        en: 'boxNo',
        lang: 'commonWord.boxNo',
        type: 'input',
        setLength: 5
      },
      {
        label: '货品',
        en: 'goods',
        lang: 'deliver.list.filter.goodsIdList',
        value: 'goodsIdList',
        type: 'highSearch',
        linkValue: 'goodsFilterParam',
        highSearchConfig: {
          dialogSearchConfig: Object.assign(goodsSearchConfig, { isSingleSelect: true, singleSelectBindValue: true }),
          apiUrl: commonApiUrl.goodsFuzzy
        },
        setLength: 5
      },
      {
        label: '查询',
        value: 'search',
        en: 'size',
        lang: 'commonWord.search',
        type: 'other',
        setLength: 4
      }]
    formData = {
      colorId: null,
      sizeDetailId: null,
      goodsFilterParam: null,
      code: ''
    }
    tableLoading: boolean = false
    tableData = []
    colunmData = detailConfig.relateBox
    tableConfig = {
      isMultiSelect: false,
      isIndex: true,
      isShowOpera: false,
      showSummary: false,
      height: '40vh'
    }

    singleChannelChoose({ value, row, matchValArr }) {
      if (value && matchValArr) {
        this.getGoodsColorSize(value)
      } else if (row) {
        this.getGoodsColorSize(row.id)
      }
    }

    // 获取货品颜色尺码下拉
    async getGoodsColorSize(goodsId) {
      const res = this._get({ url: `/information/goods/getGoodsColorAndSizeList/${goodsId}` })
    }

    async search() {
      const res: Response = await this._post({
        url: '/information/label/list',
        data: {
          ...this.formData,
          boxIdList: this.formData
        }
      })
      res.code === 0 && (() => {
        this.tableData = res.data
      })()
    }
}
</script>

<style scoped>

</style>
