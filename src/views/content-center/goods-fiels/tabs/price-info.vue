<template>
  <div class="price-info">
    <base-title
      :title="$t('goodsFiels.detail.anchorConfig.priceInfo')" />
    <el-row>
      <el-col :span="12">
        <p class="f12 mgb-6">
          <span class="color-red">*</span>
          价格类型
        </p>
        <div class="price-info-box">
          <div
            v-for="(item, index) in tagPriceList"
            :key="index"
            class="box-item f12">
            <p class="flex-1 box-item-text">
              {{ item.name }}
            </p>
            <el-input
              v-model="item.tagPrice"
              size="small"
              class="no-border-input flex-1" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Dictionary } from '@/typings'
import { Prop, Watch } from 'vue-property-decorator'
import vuexMixins from '../configs/vuex-module'
import { transformFields } from '@/utils'

@Component({
  name: 'goods-price',
  components: {
    baseTitle: () => import('@/components/base-title/index.vue')

  }
})
export default class App extends mixins(vuexMixins) {
  @Prop() tagPriceList: Dictionary

  get priceType() {
    return this.v_detailConfig.tagPriceList
  }
}
</script>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.box-item{
  display: flex;
  height: 28px;
  line-height: 28px;
  &-text{
    color:$colorTextRegular;
    border: 1px solid #eee;
    padding-left: 10px;
    border-right: none;
    border-bottom: none;
  }
  &:last-child{
    border-bottom: 1px solid #eee;
    /deep/.el-input__inner {
      border-bottom: 1px solid #eee;
    }
  }
}
/deep/.no-border-input .el-input__inner{
  background: #F5F9FF;
  border: 1px solid #eee;
  border-radius: 0;
  border-bottom: none;
  &:focus{
    border-color:$noBorderFocus;
  }
}
</style>
