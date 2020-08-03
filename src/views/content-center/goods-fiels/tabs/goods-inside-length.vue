<template>
  <div class="goods-insideL">
    <base-title
      :title="$t('goodsFiels.detail.anchorConfig.goodsInsideLength')" />
    <el-row>
      <el-col :span="12">
        <base-select
          :value.sync="form.goodsLongList"
          :disabled="v_disabled"
          :item="{
            refreshKey: 'long',
            refreshAPI: '/information/systemDictionary/option/refresh',
            options
          }"
          :selectProps="{
            multiple: true,
            clearable: false,
            collapseTags: false
          }"
          @selectChange="selectChange($event)" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Dictionary, AnchorConfig } from '@/typings'
import vuexMixins from '../configs/vuex-module'
import { transformFields } from '@/utils'
import { ListInterface } from '@/typings'
import { detailConfig } from '../configs'

@Component({
  name: 'goods-inside-length',
  components: {
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue')

  }
})
export default class App extends mixins(vuexMixins) {
  @Prop() form: Dictionary

  anchorList:AnchorConfig[] = []
  created() {
    this.anchorList = detailConfig.anchorConfig
  }
  get options() {
    if (this.v_detailConfig.goodsLongList) {
      return this.v_detailConfig.goodsLongList
    }
    return []
  }
  selectChange() {

  }
}
</script>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
</style>
