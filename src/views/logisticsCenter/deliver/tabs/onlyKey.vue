<template>
  <div>
    <formlist
      ref="formlist"
      style="background: white"
      :formList="formList"
      :formData="formData"
      :disabled="false"
      class="form-module">
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
        label: '唯一码',
        value: 'code',
        en: 'only Key',
        lang: 'commonWord.onlyKey',
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
          dialogSearchConfig: Object.assign(goodsSearchConfig, { isSingleSelect: true }),
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
    colunmData = detailConfig.onlyKey
    tableConfig = {
      isMultiSelect: false,
      isIndex: true,
      isShowOpera: false,
      showSummary: false,
      height: '40vh'
    }

    async search() {
      const res: Response = await this._post({
        url: '/information/box/list',
        data: {
          ...this.formData
        }
      })
      res.code === 0 && (() => {
        console.log(res)
      })()
    }
}
</script>

<style scoped>

</style>
