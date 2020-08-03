<template>
  <div class="anchor">
    <div
      :class="{'active':active === 'top'}"
      @click="handleTop">
      {{ $t('layout.btns.backTop') }}
    </div>
    <div
      v-for="item in anchor"
      :key="item.ref"
      :class="{ active: item.ref === active }"
      class="pdlr-10"
      @click="handleClick(item.ref)">
      {{ $t(item.lang) || item.label }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { AnchorConfig } from '@/typings'

@Component({
  name: 'base-anchor'
})
export default class baseSelect extends Vue {
  @Prop() element: HTMLElement[]
  @Prop() anchor: AnchorConfig[]

  timer:any = null
  active:string = 'top'
  handleTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    this.active = 'top'
  }

  handleClick(ref) {
    this.active = ref
    const dom = this.element[ref]['$el'] || this.element[ref][0]['$el']
    dom.childNodes[0].scrollIntoView({ behavior: 'smooth' })
  }

  handleScroll() {
    clearTimeout(this.timer)
    this.$nextTick(() => {
      this.timer = setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrollTop = document.documentElement.scrollTop
        if (scrollTop === 0) {
          this.active = 'top'
          return
        } else if (scrollTop === scrollHeight) {
          this.active = this.anchor[this.anchor.length - 1]['ref']
          return
        }

        const result = this.anchor.find((item) => {
          if (this.element[item.ref]) {
            const ref = this.element[item['ref']]['$el'] || this.element[item['ref']][0]['$el']
            const top = ref.getBoundingClientRect().top
            if (top > 150 && top < 300) {
              return true
            }
          }

          return false
        })
        // console.log('result',result)
        if (result) {
          this.active = result['ref']
        }
      }, 20)
    })
  }

  mounted() {
    this.$nextTick(() => {
      document.addEventListener('scroll', this.handleScroll)
    })
  }

  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style  lang="scss" scoped>
@import 'src/styles/variables.scss';
.anchor{
  position: fixed;
  min-width:72px;
  right:0;
  top:230px;
  overflow: hidden;
  border-radius: 4px 0px 0px 4px;
  background: #fff;
  box-shadow: 0px 2px 12px 0px rgba(166, 167, 173, 0.5);
  z-index: 100;
  div {
    width: inherit;
    height: 28px;
    line-height: 28px;
    text-align: center;
    color:$colorTextSecondary;
    padding: 0 10px;
    font-size: 12px;
    cursor: pointer;
    &:not(:last-child) {
      box-shadow: 0px 1px 0px 0px rgba(166, 167, 173, 0.1);
    }
    &:hover{
      color:$basic;
    }
  }
  .active{
    color:$basic;
  }
}
</style>
