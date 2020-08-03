<template>
  <div class="goods-input">
    <div
      v-if="showInput"
      class="goods-input-box">
      <base-input
        v-model="goodsCode"
        :inputProps="{
          placeholder: 'form.placeholder.goodsInput',
        }"
        :disabled="disabled"
        @enter="fuzzySearch" />
      <el-button
        type="primary"
        class="mgl-10"
        :disabled="disabled"
        @click="fuzzySearch">
        {{ $t('commonWord.fix') }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { globalConfigs } from '../configs'

  @Component({
    name: 'goods-input',
    components: {
      baseInput: () => import('@/components/base-input/index.vue')
    }
  })
export default class App extends Vue {
    @Prop({ default: false }) disabled: boolean
    @Prop() status: string

    goodsCode: string = ''

    get showInput() {
      return (['detail', 'cancel', ''].includes(this.status))
    }

    fuzzySearch() {
      this.$emit('goodsPosition', this.goodsCode.toString())
    }
}
</script>

<style scoped lang="scss">
  .goods-input {
    display: inline-block;

    &-box {
      display: flex;
    }
  }

  .base-dialog {
    /deep/ .el-dialog__body {
      padding: 20px 16px 16px 16px;
    }

    .base-input {
      width: 200px;
      margin-bottom: 12px;
    }

    /deep/ .small-pagination {
      justify-content: center;

      /deep/ .page-select {
        margin: 0 10px;
      }
    }
  }
</style>
