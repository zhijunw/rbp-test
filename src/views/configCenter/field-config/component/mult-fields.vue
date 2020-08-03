<template>
  <div class="mult-box">
    <span class="fields-box">{{ chooseOptionName }}</span>
    <!-- <el-button
      type="text"
      class="hover el-icon-more open-fields"
      @click="openFields" /> -->
    <el-button
      id="btn_t_d_blue"
      type="text"
      size="mini"
      :disabled="disabled"
      icon="el-icon-more"
      class="hover open-fields mgl-10"
      @click="openFields" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'mult-fields',

  components: {}
})
export default class App extends Vue {
  @Prop({ required: true, default: () => [] }) chooseOption: any[]
  @Prop() disabled: boolean

  get chooseOptionName() {
    if (this.chooseOption.length) {
      return this.chooseOption.map((item) => item.columnTitle).join(',')
    } else {
      return ''
    }
  }

  openFields() {
    this.$emit('openFields')
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';

.mult-box {
  display: flex;
    align-items: center;
  height: 28px;
  line-height: 28px;
  background: $norderBg;
}
.fields-box {
    flex:1;
  padding: 0 6px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
}
.open-fields {
  display: inline-block;
  width: 30px;
  text-align: center;
//   border-left: 1px solid #d7d7d7;
}
</style>
