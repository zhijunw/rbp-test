<template>
  <div>
    <slot name="title" />
    <el-button
      id="btn_g_d_blue"
      :plain="true"
      :disabled="v_disabled"
      @click="handleAdd">
      {{ $t('layout.btns.add') }}
    </el-button>
    <el-button
      id="btn_g_red"
      :plain="true"
      :disabled="v_disabled"
      @click="handleDeleteAll">
      {{ $t('layout.btns.delete') }}
    </el-button>
    <div
      class="table-box">
      <base-table
        :tableData="roleInfos"
        :colunmData="tableHeader"
        :tableConfig="tableConfig"
        @select="handleSelect"
        @change="handleChange">
        <template
          v-slot:tableCell="{ scope: { row, item,$index } }">
          <el-select
            v-if="item.type === 'select' "
            v-model="row[item.value]"
            size="small"
            class="no-border"
            :placeholder="$t('form.placeholder.select')"
            @change="handleChange(row,$index,$event)">
            <el-option
              v-for="items in v_roleList"
              :key="items.id"
              :disabled="items.disabled"
              :label="items.name"
              :value="items.id" />
          </el-select>
        </template>
        <template v-slot="{ scope }">
          <el-button
            id="btn_t_delete"
            type="text"
            size="mini"
            align="center"
            :disabled="v_disabled"
            @click="handleDelete(scope.row,scope.$index)">
            {{ $t('layout.btns.delete') }}
          </el-button>
        </template>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { characterData } from '../configs/mock'
import { tabsConfig } from '../configs'
import { Prop, Watch } from 'vue-property-decorator'
import vuexMixins from '../configs/vuex-module'
import { TabelConfig } from '@/typings'
import { deepCopy } from '@/utils'

@Component({
  name: 'character-group',
  components: {
    baseTable: () => import('@/components/base-table/index.vue')
  }
})
export default class detail extends mixins(vuexMixins) {
  tableHeader = tabsConfig.characterConfig.list
  roleIdArr:any = []
  roleInfos:any = []
  tableConfig: TabelConfig = {
    height: '175px',
    isIndex: true
  }
  getCharacterGroupData(roleInfos) {
    this.$nextTick(() => {
      this.roleInfos = roleInfos
      this.disabledItem()
    })
  }
  handleDelete(row, $index) {
    this.roleInfos.splice($index, 1)
    this.disabledItem()
  }
  handleDeleteAll() {
    if (!this.roleIdArr.length) {
      this._message({ message: this.$t('rolesPermission.detailTabs.userTab.deleteTips'), type: 'warning' })
      return
    }
    this.roleIdArr.find((item): any => {
      const index = this.roleInfos.findIndex((k: any) => k.id === item)
      index > -1 && this.roleInfos.splice(index, 1)
    })
    this.disabledItem()
  }
  handleAdd() {
    this.roleInfos.push({ code: '', name: '' })
  }

  handleSelect({ section }) {
    const roleIdArr = section.map(val => {
      return val.id
    })
    this.roleIdArr = roleIdArr
  }
  handleChange(row, $index, key) {
    // const option = this.v_roleList.find(val => {
    //   return val['id'] === key
    // })
    // this.$set(this.roleInfos, $index, option)
    // this.disabledItem()
    const option: any = deepCopy(this.v_roleList.find((item) => item.id === key))
    this.$set(this.roleInfos, $index, option)
    this.disabledItem()
  }
  disabledItem() {
    this.v_roleList.forEach((item) => {
      item.disabled = false
    })
    this.roleInfos.forEach((item) => {
      const index = this.v_roleList.findIndex((list) => list.id === Number(item.id))
      index > -1 && this.$set(this.v_roleList[index], 'disabled', true)
    })
  }
}
</script>

<style scoped lang="scss">
.table-box{
  width:500px;
  margin-top:12px;
}
.no-border{
  /deep/.el-input__inner{
    border: none;
    background: transparent;

  }
}
</style>
