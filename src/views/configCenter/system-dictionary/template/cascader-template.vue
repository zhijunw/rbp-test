<template>
  <div class="select-warrper">
    <div
      v-show="country.length>0||v_showSection>0"
      class="option">
      <div class="input">
        <span>
          {{
            $t(langArr[0])
          }}
        </span>
        <div class="icon">
          <i
            class="el-icon-circle-close"
            @click.stop="batchDelete('1')" />
        </div>
      </div>
      <div class="list">
        <p
          v-for="(val,key) in country"
          :key="val.id"
          :class="{'active':val.id === countryActive.id}"
          @click="getRegion(key)">
          <span>{{ val.name||'' }}</span>
          <i
            class="el-icon-error"
            @click.stop="deleteOne('1',val.id)" />
        </p>
        <p
          class="add"
          @click="handleAdd('1','0')">
          +{{ $t('channelMenus.btn.add') }}
        </p>
      </div>
    </div>
    <div
      v-show="region.length>0||v_showSection>1"
      class="option">
      <div class="input">
        <span>
          {{
            $t(langArr[1])
          }}
        </span>
        <div class="icon">
          <i
            class="el-icon-circle-close"
            @click.stop="batchDelete('2')" />
        </div>
      </div>
      <div class="list">
        <p
          v-for="(val,key) in region"
          :key="val.id"
          :class="{'active':val.id === regionActive.id}"
          @click="getProvince(key)">
          <span>{{ val.name||'' }}</span>
          <i
            class="el-icon-error"
            @click.stop="deleteOne('2',val.id)" />
        </p>
        <p
          class="add"
          @click="handleAdd('2',countryActive.id)">
          +{{ $t('channelMenus.btn.add') }}
        </p>
      </div>
    </div>
    <div
      v-show="province.length>0||v_showSection>2"
      class="option">
      <div class="input">
        <span>
          {{
            $t(langArr[2])
          }}
        </span>
        <div class="icon">
          <i
            class="el-icon-circle-close"
            @click.stop="batchDelete('3')" />
        </div>
      </div>
      <div class="list">
        <p
          v-for="(val,key) in province"
          :key="val.id"
          :class="{'active':val.id === provinceActive.id}"
          @click="getCity(key)">
          <span>{{ val.name|| '' }}</span>
          <i
            class="el-icon-error"
            @click.stop="deleteOne('3',val.id)" />
        </p>
        <p
          class="add"
          @click="handleAdd('3',regionActive.id)">
          +{{ $t('channelMenus.btn.add') }}
        </p>
      </div>
    </div>
    <div
      v-show="city.length>0||v_showSection>3"
      class="option">
      <div class="input">
        <span>
          {{
            $t(langArr[3])
          }}
        </span>
        <div class="icon">
          <i
            class="el-icon-circle-close"
            @click.stop="batchDelete('4')" />
        </div>
      </div>
      <div class="list">
        <p
          v-for="(val,key) in city"
          :key="val.id"
          :class="{'active':val.id === cityActive.id}"
          @click="getApart(key)">
          <span>{{ val.name||'' }}</span>
          <i
            class="el-icon-error"
            @click.stop="deleteOne('4',val.id)" />
        </p>
        <p
          class="add"
          @click="handleAdd('4',provinceActive.id)">
          +{{ $t('channelMenus.btn.add') }}
        </p>
      </div>
    </div>
    <div
      v-if="apart.length>0||v_showSection>4"
      class="option">
      <div class="input">
        <span>
          {{
            $t(langArr[4])
          }}
        </span>
        <div class="icon">
          <i
            class="el-icon-circle-close"
            @click.stop="batchDelete('5')" />
        </div>
      </div>
      <div class="list">
        <p
          v-for="(val,key) in apart"
          :key="val.id"
          :class="{'active':val.id === apartActive.id}"
          @click="getLast(key)">
          <span>{{ val.name ||'' }}</span>
          <i
            class="el-icon-error"
            @click.stop="deleteOne('5',val.id)" />
        </p>
        <p
          class="add"
          @click="handleAdd('5',cityActive.id)">
          +{{ $t('channelMenus.btn.add') }}
        </p>
      </div>
    </div>
    <!-- <el-button
      v-if="v_showSection<5&&showbtn"
      class="category"
      type="primary"
      icon="el-icon-plus"
      @click="handleShow"
    >
      {{ $t('channelMenus.btn.addCategory') }}
    </el-button>-->
    <div
      v-if="v_showSection<5 && showbtn"
      class="add-box"
      @click="handleShow">
      <img
        src="@/assets/common/add_selector.png"
        class="no-data-img"
        alt="暂无数据">
      <p class="f12 add-box-text">
        {{ $t('channelMenus.btn.addCategory') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import vuexMixins from '../configs/vuex-module'
import { Prop, Watch } from 'vue-property-decorator'
import { templateConfig } from '../configs'
import apiUrlObj from '@/api/config-center/system-dictionary'
interface treeOptions {
  id?: number
  name?: string
  parentId?: number
}
const TEMPLATE_ARR = ['cascaderTemplate']
@Component({
  name: 'cascader-template'
})
export default class list extends mixins(vuexMixins) {
  // 观察当前 tab
  @Watch('v_activeTab', { immediate: true })
  onActiveTabChange(val, oldval) {
    if (val) {
      const config = templateConfig[val]
      // console.log('cascaderf config', config, val)
      if (TEMPLATE_ARR.includes(config.apiKey)) {
        this.langArr = config.category
        this.getCountry()
      }
    }
  }

  depthObj = {
    '1': 'country',
    '2': 'region',
    '3': 'province',
    '4': 'city',
    '5': 'apart'
  }
  langArr: any[] = []
  treeData: treeOptions[] = []
  country: treeOptions[] = []
  countryActive: treeOptions = {}
  region: treeOptions[] = []
  regionActive: treeOptions = {}
  province: treeOptions[] = []
  provinceActive: treeOptions = {}
  city: treeOptions[] = []
  cityActive: treeOptions = {}
  apart: treeOptions[] = []
  apartActive: treeOptions = {}
  showbtn: boolean = true

  async getCountry() {
    const res = await this._post({ url: apiUrlObj[this.v_activeTab].search })
    if (res.code === 0) {
      this.treeData = res.data
    }
    this.country = await this.treeData.filter((val) => {
      return val['parentId'] === 0
    })
    if (this.country.length > 0) {
      this.getRegion()
      // this.SET_SHOW_SECTION(1)
      this.$store.commit(`${this.m_moduleId}/SET_SHOW_SECTION`, 1)
    } else {
      this.reset('1')
    }
  }
  async getRegion(index: number = 0) {
    this.countryActive = this.country[index]
    this.region = await this.treeData.filter((val) => {
      return val['parentId'] === this.countryActive['id']
    })
    if (this.region.length > 0) {
      this.getProvince()
      // this.SET_SHOW_SECTION(2)
      this.$store.commit(`${this.m_moduleId}/SET_SHOW_SECTION`, 2)
    } else {
      this.reset('2')
    }
  }
  async getProvince(index: number = 0) {
    this.regionActive = this.region[index]
    this.province = await this.treeData.filter((val) => {
      return val['parentId'] === this.regionActive['id']
    })

    if (this.province.length > 0) {
      this.getCity()
      // this.SET_SHOW_SECTION(3)
      this.$store.commit(`${this.m_moduleId}/SET_SHOW_SECTION`, 3)
    } else {
      this.reset('3')
    }
  }
  async getCity(index: number = 0) {
    this.provinceActive = this.province[index]
    this.city = await this.treeData.filter((val) => {
      return val['parentId'] === this.provinceActive['id']
    })
    if (this.city.length > 0) {
      this.getApart()
      // this.SET_SHOW_SECTION(4)
      this.$store.commit(`${this.m_moduleId}/SET_SHOW_SECTION`, 4)
    } else {
      this.reset('4')
    }
  }
  async getApart(index: number = 0) {
    this.cityActive = this.city[index]
    this.apart = await this.treeData.filter((val) => {
      return val['parentId'] === this.cityActive['id']
    })
    if (this.apart.length > 0) {
      this.getLast()
      // this.SET_SHOW_SECTION(5)
      this.$store.commit(`${this.m_moduleId}/SET_SHOW_SECTION`, 5)
    } else {
      this.reset('5')
    }
  }
  async getLast(index: number = 0) {
    this.apartActive = this.apart[index]
  }
  reset(status: string) {
    const obj = {
      '1': ['country', 'region', 'province', 'city', 'apart'],
      '2': ['region', 'province', 'city', 'apart'],
      '3': ['province', 'city', 'apart'],
      '4': ['city', 'apart'],
      '5': ['apart']
    }
    obj[status].forEach((val) => {
      this[val] = []
      this[val + 'Active'] = {}
      // this.SET_SHOW_SECTION(parseInt(status) - 1)
      this.$store.commit(`${this.m_moduleId}/SET_SHOW_SECTION`, parseInt(status) - 1)
    })
  }

  handleAdd(depth: string, parentId: number) {
    this.$prompt(`${this.$t('form.placeholder.option')}`, `${this.$t('commonWord.tips')}`, {
      confirmButtonText: `${this.$t('layout.btns.sure')}`,
      cancelButtonText: `${this.$t('layout.btns.cancel')}`
    }).then(async(data) => {
      const res = await this._post({
        url: apiUrlObj[this.v_activeTab].create,
        data: { data: { name: data['value'], parentId, depth }}
      })
      if (res.code === 0) {
        const key = this.depthObj[depth]
        this[key].push(res.data)
        this.treeData.push(res.data)
        if (this[key].length === 1) {
          this[key + 'Active'] = this[key][0]
        }
        this._message({
          message: this.$t('commonWord.actionSuccess', {
            action: this.$t('operationGroup.btns.newAdd')
          }),
          type: 'success'
        })
      }
    })
  }
  batchDelete(depth: string, parentId: number) {
    this.$confirm(`${this.$t('dialogPrompt.batchDelete')}`, `${this.$t('commonWord.tips')}`, {
      confirmButtonText: `${this.$t('layout.btns.sure')}`,
      cancelButtonText: `${this.$t('layout.btns.cancel')}`,
      type: 'warning'
    }).then(async() => {
      const res = await this._post({
        url: apiUrlObj[this.v_activeTab].batchDelete,
        data: { data: depth }
      })
      if (res.code === 0) {
        this._message({
          message: this.$t('commonWord.actionSuccess', {
            action: this.$t('operationGroup.btns.delete')
          }),
          type: 'success'
        })
        const key = this.depthObj[depth]
        this[key] = []
      }
    })
  }
  deleteOne(depth: string, deleteId: number) {
    this.$confirm(`${this.$t('dialogPrompt.deleteItem')}`, `${this.$t('commonWord.tips')}`, {
      confirmButtonText: `${this.$t('layout.btns.sure')}`,
      cancelButtonText: `${this.$t('layout.btns.cancel')}`,
      type: 'warning'
    }).then(async() => {
      const res = await this._post({
        url: apiUrlObj[this.v_activeTab].deleteOne,
        data: { data: deleteId }
      })
      if (res.code === 0) {
        this._message({
          message: this.$t('commonWord.actionSuccess', {
            action: this.$t('operationGroup.btns.delete')
          }),
          type: 'success'
        })
        const key = this.depthObj[depth]
        this[key] = this[key].filter((val) => {
          return val.id !== deleteId
        })
        this.treeData = this.treeData.filter((val) => {
          return val['id'] !== deleteId || val['parentId'] !== deleteId
        })
        this.reset(String(parseInt(depth) + 1))
      }
    })
  }
  handleShow() {
    // this.SET_SHOW_SECTION(this.v_showSection + 1)
    this.$store.commit(`${this.m_moduleId}/SET_SHOW_SECTION`, this.v_showSection + 1)
  }
  updated() {
    if (Number(this.v_showSection) !== 0) {
      if (this[this.depthObj[String(this.v_showSection)]].length > 0) {
        this.showbtn = true
      } else {
        this.showbtn = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.select-warrper {
  display: flex;
  // float:left;
  // margin-left:12px;
  // margin-top:16px;
  // height: calc(100vh - 150px);
  // border:1px solid rgba(238,238,238,1);
  // width:calc(100vw - 365px);
  .option {
    // width: 198px;
    flex: 1;
    height: 200px;
    float: left;
    // margin-top: 12px;
    .input {
      width: inherit;
      height: 32px;
      border: 1px solid rgba(215, 215, 215, 1);
      span {
        font-size: 14px;
        font-weight: 500;
        margin-left: 10px;
        margin-top: 7px;
        color: #353d51;
        float: left;
      }
      .icon {
        cursor: pointer;
        float: right;
        font-size: 17px;
        margin-top: 6px;
        margin-right: 5px;
      }
    }
    .list {
      height: 168px;
      width: inherit;
      border-bottom: 1px solid rgba(215, 215, 215, 1);
      border-left: 1px solid rgba(215, 215, 215, 1);
      border-right: 1px solid rgba(215, 215, 215, 1);
      overflow-y: auto;
      overflow-x: hidden;
      .active {
        background: rgba(245, 245, 247, 1);
      }
      p {
        width: inherit;
        height: 28px;
        text-indent: 10px;
        font-size: 12px;
        line-height: 28px;
        cursor: pointer;
        span {
          float: left;
        }
        i {
          display: none;
          float: right;
          margin-top: 4px;
          color: rgb(215, 215, 215);
          margin-right: 11px;
          font-size: 17px;
        }
        &:hover {
          i {
            display: block;
          }
          background: rgba(245, 245, 247, 1);
        }
      }
      .add {
        color: #1ca1ff;
        cursor: pointer;
      }
      &::-webkit-scrollbar {
        width: 4px;
      }
    }
    // &:nth-child(1){
    //   margin-left:12px;
    // }
  }
  // .category{
  //   padding: 15px;
  //   margin-top:79px;
  //   margin-left:15px;
  // }
  .add-box {
    width: 200px;
    height: 200px;
    border: 1px dashed #d7d7d7;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 2px;
    .no-data-img {
      width: 56px;
      height: 56px;
    }
    &-text {
      color: $colorTextSecondary;
    }
  }
}
</style>
