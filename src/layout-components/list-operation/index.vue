<template>
  <div class="warrper">
    <el-dropdown
      v-for="btn in btnConfigs"
      :key="btn.value"
      class="elDropdown"
      size="mini"
      :class="btn.class">
      <el-button
        :id="btn.id"
        :type="btn.type || ''"
        :plain="btn.plain ? true : false"
        :icon="btn.icon"
        @click="!btn.dropdown && btn.event ? Emit(btn.event, btn) : ''">
        {{ $t(btn.lang) }}
        <div
          v-if="btn.slot"
          id="points"
          ref="points">
          <div
            v-for="(p,index) in pointList"
            :key="index"
            class="points-inner" />
        </div>
      </el-button>
      <el-dropdown-menu
        slot="dropdown">
        <el-dropdown-item
          v-for="(item,index) in btn.dropdown"
          :key="index">
          <span @click="item.event ? Emit(item.event, btn) : ''">{{ $t(item.lang) }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <slot name="addBtn" />
    <slot name="input">
      <base-input
        ref="baseInput"
        :inputProps="inputConfig"
        class="list-input right"
        :value="inputValue"
        v-on="$listeners" />
    </slot>
    <slot name="addBtn2" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { ListOperationBtnsConfig } from '@/typings'

  @Component({
    name: 'common-index',
    components: {
      baseInput: () => import('@/components/base-input/index.vue'),
      tableLayout: () => import('../tableheader-layout/index.vue')
    }
  })
export default class commonIndex extends Vue {
    @Prop({ required: true }) btnConfigs: ListOperationBtnsConfig[]

    @Prop() inputConfig
    @Prop() layoutList: any[]

    inputValue = ''
    currentLayout = '默认布局1'
    pointList = [{}]

    Emit(event, config) {
      const $points = this.$refs.points ? this.$refs.points[0] : null

      this.$emit(event, Object.assign({
        $points: $points,
        pointList: this.pointList
      }, config.interface, { name: config.lang }))
    }

    resetInputValue() {
      ;(this.$refs.baseInput as any).inputValue = ''
    }

    chooseLayout(item) {
      this.currentLayout = item.label
    }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/common-index.scss';

    .menu-tabs {
        background: #fff;
        min-height: calc(100vh - 130px);
        margin-top: 10px;
    }

    .list-input {
        display: inline-block;
        margin-left: 10px;
    }

    .warrper {
        position: sticky;
        top: 105px;
        z-index: 1003;
        background: #fff;
        padding: 12px 16px;
        margin: 0 -16px 12px -16px;
        box-shadow: 0px 0px 6px 0px rgba(36, 40, 63, 0.1);

        .elDropdown {
            margin-right: 10px;
        }

        .right {
            margin-left: 10px;
        }
    }

    .layout {
        float: right;
        line-height: 30px;
        margin-right: 10px;

        &-text {
            color: $colorTextSecondary;
            margin-right: 8px;
        }

        &-box {
            padding: 0 10px;
            line-height: 1.5;
            color: $colorTextPlaceholder;

            &-name {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 10px;
                margin: 0 -10px;
                width: 198px;
                height: 28px;
                line-height: 28px;
                color: $colorTextRegular;

                &:hover {
                    background: #f5f5f7;
                    color: $basic;
                    cursor: pointer;
                }

                &:last-child {
                    margin-bottom: 4px;
                }
            }

            &-add {
                display: flex;
                flex-direction: column;
                text-align: left;
                align-items: flex-start;
                box-shadow: 0px -1px 3px -2px rgba(124, 126, 133, 0.5);

                /deep/ .el-button + .el-button {
                    margin: 0;
                }

                /deep/ .el-button--text {
                    padding: 7px 10px;
                }

                .layout-btn {
                    color: $colorTextRegular;
                }
            }
        }
    }

    #points {
        position: relative;

        .points-inner {
            position: absolute;
            display: none;
            width: 10px;
            height: 10px;
            top: -30px;
            border-radius: 50%;
            background: rgba(255, 73, 73, 0.61);
            transition: all 1s ease 0s;
            -webkit-transition: all 1s ease 0s;

            &.move {
                display: inline-block;
                z-index: 30001;
                animation: bounceOutRight 1s cubic-bezier(0.68, -0.01, 0.83, 0.23) 0s;
            }
        }
    }

    @keyframes bounceOutRight {
        0% {
            transform: translate(0, 0)
        }
        20% {
            opacity: 1;
            transform: translateY(-10px);
        }
        75% {
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            display: none;
            transform: translate(2000px, -120px);
        }
    }
</style>
