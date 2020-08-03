<template>
  <div class="detail">
    <!-- 操作栏 -->
    <operation
      :formData="rbpRole"
      @save="save" />
    <!-- 表单列表 -->
    <formlist
      ref="formlist"
      :formList="formList"
      :formData="rbpRole"
      :disabled="v_disabled"
      :status="v_status"
      class="form-module mgt-12" />
    <!-- 模块权限 -->
    <module-group
      ref="modulegroup"
      :moduleData="moduleData"
      :treeCheckData="treeCheckData"
      :disabled="v_disabled">
      <template v-slot:title>
        <base-title
          :ref="anchorConfig[0].ref"
          :title="$t(anchorConfig[0].lang)" />
      </template>
    </module-group>
    <!-- 用户分配 -->
    <user-group
      ref="usergroup"
      :userData="roleUser"
      :disabled="v_disabled">
      <template v-slot:title>
        <base-title
          :ref="anchorConfig[1].ref"
          :title="$t(anchorConfig[1].lang)" />
      </template>
    </user-group>
    <!-- 锚点导航 -->
    <base-anchor
      :anchor="anchorConfig"
      :element="$refs" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import Vue from 'vue'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import detailMixins from '@/mixins/detail-mixins'
import { TabelConfig, Dictionary } from '@/typings'
import { detailConfig, apiList } from './configs/index'
import { Watch } from 'vue-property-decorator'

@Component({
  name: 'roles-detail',
  components: {
    operation: () => import('./operation.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    moduleGroup: () => import('./group/module-group.vue'),
    userGroup: () => import('./group/user-group.vue'),
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseAnchor: () => import('@/components/base-anchor/index.vue')
  }
})
export default class App extends mixins(vuexMixins, detailMixins) {
  formList = detailConfig.formList
  anchorConfig = detailConfig.anchorConfig
  rbpRole:Dictionary = {
    code: '',
    name: '',
    notes: ''
  } // 角色表单
  moduleData = [] // 模块权限
  roleUser = [] // 用户分配
  treeCheckData = [] // 模块树所选数据

  get rolesDetailId(): string {
    return this.$store.state.rolesPermissionModule.v_id
  }

  @Watch('v_id', { immediate: true })
  async onRolesDetailIdChanged(val) {
    if (val) {
      this.getRolesDetai(val.split('_')[0])
    }
    // this.getRoleAuthority(val.split('_')[0])
  }

  @Watch('v_status')
  onv_statusChange(val, oldval) {
    if (['add', 'cancel'].includes(val)) this.reset()
  }

  /**
   * 获得角色详情
   * @param id <string> 角色ID
   */
  async getRolesDetai(id) {
    const res = await this._get({
      url: apiList.getRolesDetail + id
    })

    if (res.code === 0) {
      const data = res.data || {}
      const roleUser = data.roleUser || []
      const roleUserFormat = roleUser.map((e: Dictionary, index) => {
        return {
          xh: index + 1,
          id: e.userId,
          code: e.userCode,
          name: e.userName
        }
      })
      this.rbpRole = data.role || {}
      this.roleUser = roleUserFormat
      // (this.$refs.modulegroup as any).setPermissionValue(data.moduleAuthority)
      const status = this.rbpRole.status
      this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, status + '')
    }
  }

  /**
 * 获取角色模块
 */
  // async getRoleAuthority(val) {
  //   const isEdit = this.v_status !== 'detail' && this.v_id === ''
  //   console.log('isEdit', isEdit)
  //   const url = isEdit ? apiList.getModuleOptions : apiList.getEditAuthority + val
  //   const res = await this._get({
  //     url: url
  //   })

  //   if (res.code === 0) {
  //     this.moduleData = isEdit ? res.data : res.data.moduleAuthority
  //     this.treeCheckData = isEdit ? [] : res.data.moduleAuthResp
  //   }
  // }

  // 保存
  async save() {
    await (this.$refs.formlist as any).saveTable()
    const roleUser = this.roleUser || []
    const roleUserIds = roleUser.map((e:Dictionary) => e.id)
    const saveData = {
      data: {
        moduleAuthority: (this.$refs.modulegroup as any).getModuleAction(),
        // name: this.rbpRole.name,
        // notes: this.rbpRole.notes,
        // code: this.rbpRole.id,
        ...this.rbpRole,
        userId: roleUserIds
      }
    }
    const url = this.v_status === 'add' ? apiList.createRole : apiList.updateRole
    const res = this.v_status === 'add' ? await this._post({ url, data: saveData }) : await this._put({ url, data: saveData })

    if (res.code === 0) this.m_dealSaveAction(res)
    ;(this.$refs.modulegroup as any).resetOperate() // 清空模块权限全局操作设置
  }

  // 重置
  async reset() {
    this.rbpRole = {
      code: '',
      name: '',
      notes: ''
    } // 角色表单
    this.moduleData = [] // 模块权限
    this.roleUser = [] // 用户分配
    this.treeCheckData = [] // 模块树所选数据
    ;(this.$refs.usergroup as any).reset()
    ;(this.$refs.modulegroup as any).resetChecked() // 清空树的勾选状态
    ;(this.$refs.modulegroup as any).resetOperate() // 清空模块权限全局操作设置
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.detail {
  background: #fff;
}

</style>
