<template>
  <div class="integratedQuery">
    <el-button
      v-show="!isShowDrawer"
      class="isBtn integratedQueryBtn"
      @click="drawerShow">
      <i class="iconfont rbp-nav_unfold" />
    </el-button>
    <el-drawer
      :visible.sync="isShowDrawer"
      direction="rtl"
      :before-close="handleClose"
      :show-close="false"
      class="drawer"
      size="280px"
      :modal="false"
      :modal-append-to-body="false"
      :append-to-body="false">
      <div
        slot="title"
        class="drawer-title">
        <el-button
          class="isBtn isShowDrawerBtn"
          @click="drawerShow">
          <i class="iconfont rbp-nav_close" />
        </el-button>
        <p> {{ $t('layout.btns.integratedQuery') }} </p>
      </div>
      <!-- <el-button
        class="isBtn isShowDrawerBtn"
        @click="drawerShow"
      >
        <i class="iconfont rbp-nav_close" />
      </el-button> -->
      <slot name="content">
        <!-- <div class="content-header">
          <i
            class="iconfont rbp-nav_close"
            @click="drawerShow"
          />
          <p>{{ $t('layout.btns.integratedQuery') }}</p>
        </div> -->
        <div
          v-if="dictionary.moduleList && dictionary.moduleList.length > 0"
          class="content-div">
          <p>{{ $t('layout.btns.relatedModules') }}</p>
          <div
            v-for="item in dictionary.moduleList"
            :key="item.title"
            @click="goUrl(item)">
            {{ item.title }}
          </div>
        </div>
        <div
          v-if="dictionary.formList && dictionary.formList.length > 0"
          class="content-div">
          <p>{{ $t('layout.btns.relatedReports') }}</p>
          <div
            v-for="item in dictionary.formList"
            :key="item.title"
            @click="goUrl(item)">
            {{ item.title }}
          </div>
        </div>
        <div
          v-if="dictionary.webList && dictionary.webList.length > 0"
          class="content-div">
          <p>{{ $t('layout.btns.relatedWeb') }}</p>
          <div
            v-for="item in dictionary.webList"
            :key="item.title"
            @click="goUrl(item)">
            {{ item.title }}
          </div>
        </div>
      </slot>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Watch } from 'vue-property-decorator'
import { Dictionary } from '@/typings'
import Component from 'vue-class-component'
import { Tools } from '@/utils/tools'

@Component({
  name: 'integratedQuery'
})
export default class integratedQuery extends Vue {
  @Prop({ required: true }) dictionary: Dictionary
  isShowDrawer: boolean = false
  drawerShow() {
    this.isShowDrawer = !this.isShowDrawer
  }
  handleClose() {
    this.isShowDrawer = false
  }
  goUrl(item) {
    // type 1.模块;2.报表;3.内嵌式URL;4.弹出式URL
    const type = item.type
    this.isShowDrawer = false

    if (type === 1 || type === 2) {
      const name = item.content.split('?')[0]
      this.$store.commit('tagsView/SET_RELATIONNAME', name)
      this.$router.push({
        name: name,
        params: {
          id: Tools.getQueryVariable(item.content, 'id')
        }
      })
    } else if (type === 3) {
      this.$router.push({
        // name: 'iframe',
        // query: {
        //   title: item.title,
        //   href: item.content
        // }
        name: 'rbp-iframe',
        params: {
          title: item.title,
          id: item.content
        },
        query: {
          title: item.title

        }
      })
    } else if (type === 4) {
      window.open(item.content, '_blank')
    }
  }
}
</script>
<style lang="scss">
.integratedQuery {
  .drawer {
    .el-drawer__header {
      height:56px;
      padding:0;
      line-height: 56px;
      margin: 0;
      box-shadow: 0px 2px 12px 0px rgba(166,167,173,0.5), 0px 2px 6px 0px rgba(166,167,173,0.5);
    }
    .el-drawer__container {
      .el-drawer {
        overflow: visible;
      }
    }
    // .el-drawer__body {
    //   .isShowDrawerBtn {
    //     left: -24px;
    //   }
    // }
  }
}
</style>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.isBtn {
  position: fixed;
  top:148px;
  width: 24px;
  height: 48px;
  padding: 0;
  color: #A6A7AD;
  border-radius: 4px 0px 0px 4px;
  z-index: 2000;
  border: 0;
}
.drawer {
  position: fixed;
  top: 68px;
  left: $sideBarWidth;
  right: 0;
  bottom: 0;
  overflow: auto;
  margin: 0;
  z-index: 2008 !important;
  .isShowDrawerBtn{
    right:280px;
    top: 68px;
    height: 56px;
  }
}
.drawer-title{
  padding: 0 16px;
  font-size: 18px;
  color:#3B3B3B;
}
.el-dialog__wrapper {
  top: 68px;
  left:$sideBarWidth;
}
.integratedQueryBtn {
  right: 0;
  box-shadow:0px 2px 12px 0px rgba(166,167,173,0.5);
}
.content-div {
  margin-bottom: 10px;
  >p {
    margin: 13px 16px;
    height: 20px;
    line-height: 20px;
    font-size:16px;
    border-left: solid 4px #186CFF;
    color: #186CFF;
    font-weight:500;
    padding-left: 8px;
  }
  >div {
    padding-left: 28px;
    font-size:14px;
    font-weight:400;
    color:rgba(53,61,81,1);
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    &:hover {
      background:rgba(245,245,247,1);
    }
  }
}
</style>
