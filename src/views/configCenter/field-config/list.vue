<template>
  <div class="list-warrper">
    <div class="ct_l">
      <fields-list
        class="list_ct"
        @add="add" />
    </div>
    <fields-prop class="ct_r" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Dictionary, DialogObj } from '@/typings'
import { Watch } from 'vue-property-decorator'
@Component({
  name: 'fieldConfig-list',
  components: {
    fieldsList: () => import('./component/fields-list.vue'),
    fieldsProp: () => import('./component/fields-prop.vue')
  }
})
export default class list extends Vue {
  add() {}
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.list-warrper__operation {
  position: sticky;
  top: 125px;
  z-index: 1003;
  background: #fff;
}
.list-warrper {
  display: flex;
  // height: 77vh;
  min-height: calc(100vh - 228px);
}
.ct_l {
  // width: 682px;
  margin-right: 12px;
  flex: 1;
  min-width: 75%;
}
.ct_r {
  //  width: 450px;
  min-width: 25%;
  height: auto;
  // min-height: 570px;
  color: $colorTextRegular;
}
// .list_ct{
//     padding: 12px;
//     // background:rgba(255,255,255,1);
//     border-radius:2px;
//     border:1px solid rgba(238,238,238,1);
//   }
// .list_title{
//   line-height: 48px;
//   font-size: 14px;
//   font-weight:500;
//   // color:$colorTextRegular;
// }
// .list_ct_t{
//   border-bottom: 1px solid $borderColorBase;
// }
</style>
