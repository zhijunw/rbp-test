<template>
  <el-button
    :disabled="disabled"
    type="primary"
    class="scan-btn"
    size="mini">
    <div class="tabs-card-code">
      <!-- <i
          class="iconfont el-icon-sap-saoma"
          style="color:#fff;font-size:12px;"
        /> -->
      <!-- <span>{{ $t('saleOrder.scanComponent.scan') }}</span> -->
      <el-input
        ref="scanInput"
        v-model.trim="ENA_orderNum"
        size="small"
        :placeholder="$t('commonWord.infoBarcode')"
        :disabled="disabled"
        style="width:150px"
        @keydown.native.enter="submitEna" />
      <el-button
        size="mini"
        :disabled="disabled"
        class="tabs-card-btn"
        icon="el-icon-plus"
        :class="{ 'differ-btn': operator === 'add' }"
        @click="switchOperator('add')">
        <!-- {{ $t('saleOrder.scanComponent.add') }} -->
        <!-- + -->
      </el-button>
      <input
        v-model.number="num"
        type="number"
        size="small"
        :disabled="disabled"
        class="small-input">
      <el-button
        size="mini"
        :disabled="disabled"
        class="tabs-card-btn"
        icon="el-icon-minus"
        :class="{ 'differ-btn': operator === 'minus' }"
        @click="switchOperator('minus')">
        <!-- {{ $t('saleOrder.scanComponent.minus') }} -->
        <!-- - -->
      </el-button>

      <!-- <div @click.stop="closeScanBtn">
          <i class="el-icon-d-arrow-left pdall-3" />
        </div> -->
    </div>
  </el-button>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'scan'
})
export default class App extends Vue {
  @Prop({ default: false }) disabled
  ENA_orderNum = ''
  operator = 'add'
  num = 1
  btnOpened = false
  //   btnWidth = 145

  switchOperator(type) {
    // type === 'add' ? (this.operator = 'add') : (this.operator = 'minus')
    this.operator = type
  }
  submitEna() {
    if (!this.ENA_orderNum) {
      this._message({ message: '请输入条码', type: 'warning' })
      return
    }
    this.$emit('submitEna', { barcode: this.ENA_orderNum, operation: this.operator, num: this.num })
    this.ENA_orderNum = ''
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.tabs-card-code {
  display: flex;
  border-radius: 5px;
  align-items: center;
  > span {
    color: #fff;
    font-size: 12px;
    margin: 0 10px;
  }
  .small-input {
    width: 60px;
    outline: none;
    height: 28px;
    margin: 0 10px;
    text-align: center;
    font-size: 12px;
    border-radius: 2px;
    border: none;
  }
  .differ-btn {
    background: rgb(204, 204, 204);
  }
}
.pdall-3 {
  padding: 3px;
}
.tabs-card-btn {
  width: 40px;
  padding: 7px !important;
  margin-left: 10px;
  color: $basic;
  font-weight: bold;
}
.scan-btn {
  padding: 4px 10px !important;
  .btns-wrap {
    padding: 3px 0;
  }
  overflow: hidden;
  transition: all 0.3s;
  background: #eee;
  border-color: #fff;
  &:hover {
    background:#e9ebef;
    border-color: #e9ebef;
  }
}
</style>
