<template>
  <div class="barcode-record">
    <div
      class="barcode-record-box f14 hover invalid"
      @click="showRecord">
      <i :class="[openRecord ? 'el-icon-arrow-right' : 'el-icon-arrow-left']" />
      <span>{{ openRecord ? $t('commonWord.packUp') : $t('commonWord.open')
      }}{{ $t('commonWord.scanRecord') }}</span>
    </div>
    <div
      class="barcode-record-list"
      :class="[openRecord ? 'show': 'hide']">
      <h4 class="f16">
        {{ $t('commonWord.scanRecord') }}
      </h4>
      <template v-if="barcodeRecord.length">
        <div
          v-for="(item, index) in barcodeRecord"
          :key="index"
          class="item">
          <p class="f12 mgb-6">
            {{ item.id }}:{{ item.desc }}
            <span>{{ $t('commonWord.numberText') }}: {{ item.number }}</span>
          </p>
          <div class="list-status f12">
            <span :class="item.status">{{ item.infoText }}</span>
            <span class="btn-icon">{{ item.time }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no-data-box">
          <p class="f12">
            {{ $t('commonWord.noBarcodeData') }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'barcode-record',
  components: {}
})
export default class App extends Vue {
  @Prop() barcodeRecord: any[]
  @Prop({ default: false }) isOpen: boolean
  openRecord: boolean = false
  @Watch('isOpen', { immediate: true })
  onStatusChange(val, oldval) {
    if (val) {
      this.openRecord = true
    }
  }
  showRecord() {
    this.openRecord = !this.openRecord
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';

.barcode-record {
  position: relative;
  &-box {
    line-height: 1.2;
  }
  .show{
      transform: translate(0);
      transition: all 0.3s ease-in;
  }
  .hide{
      transform: translate(104%);
      transition: all 0.3s ease;
      height: 0;
  }
  &-box{
      text-align: right;
      height: 28px;
      line-height: 28px;
  }
  &-list {
    position: absolute;
    right: 0;
    z-index: 100;
    background: #fff;
    margin-top: 12px;
    box-shadow: -2px 2px 12px 0px rgba(166, 167, 173, 0.5);
    border: 1px solid #eee;
    width:340px;
    // margin-top: 20px;
    > h4 {
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin: 0;
      border-bottom: 1px solid #eee;
    }
    .item {
      padding: 12px;
      border-bottom: 1px solid #eee;
      max-height: 300px;
      overflow: auto;
      &:last-child{
          border-bottom: none;
      }
    }
    .list-status {
      display: flex;
      justify-content: space-between;
    }
  }
}
.no-data-box{
  height: 60px;
    line-height: 60px;
    text-align: center;
    color: $colorTextPlaceholder;
}
</style>
