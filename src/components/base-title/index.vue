<template>
  <div class="base-title">
    <nav />
    {{ title }}
    <slot name="titleRight" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'base-title'
})

export default class baseSelect extends Vue {
  @Prop() title: string
}
</script>

<style  lang="scss" scoped>
@import 'src/styles/variables.scss';
.base-title{
    width:100%;
    height: 20px;
    border-left:solid 4px $basic;
    color:$basic;
    font-size: 16px;
    line-height: 20px;
    text-indent: 8px;
    position: relative;
    margin: 24px 0 16px 0;
    nav{
      position:absolute;
      width:5px;
      height:100px;
      left:0;
      bottom:130px;
    }
}
</style>
