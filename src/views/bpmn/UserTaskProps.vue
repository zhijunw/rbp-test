<template>
  <div>
    <el-form-item
      label="编号"
      required>
      <el-input
        v-model="id"
        disabled />
    </el-form-item>
    <el-form-item
      label="名称"
      required>
      <el-input v-model="name" />
    </el-form-item>
    <el-form-item label="委托人">
      <!-- <el-select
        v-model="candidateGroups"
        filterable
        placeholder="请选择"
        style="width: 100%">
        <el-option
          v-for="item in rolesOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select> -->
      <multile-prop-search
        :propFilterTabs="clientConfig"
        :dataGroup="receiveChannelsObj"
        :isSingleSelect="true"
        class="multile-search"
        @confirm="confirm" />
    </el-form-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Inject } from 'vue-property-decorator'
import commonApi from '@/api/common-api/index'
import { Dictionary } from '@/typings'
import apiUrl from '@/api/audit-activity/create-activity'

@Component({
  name: 'UserTaskProps',
  components: {
    multilePropSearch: () => import('@/components/multile-prop-search/index.vue')

  }
})

export default class App extends Vue {
  @Prop({ required: true }) element: any
  @Inject('bpmnModelerOver') bpmnModelerOver: any

  modeling: any = null
  id = this.element.id || ''
  name = ''
  candidateGroups = ''
  formKey = ''
  multiinstance_type = ''
  multiinstance_condition = ''

  // 原子节点属性

  receiveChannelsObj: Dictionary<any> = {}

  clientConfig: any[] = [
    {
      label: '用户',
      value: 'user',
      type: 'tableTemplate',
      tableHeader: [
        {
          label: '用户编号',
          value: 'code',
          en: 'code',
          lang: 'usersPermission.list.tableHeader.code'
        },
        {
          label: '姓名',
          value: 'name',
          en: 'name',
          lang: 'usersPermission.list.tableHeader.name'
        }
      ],
      tableConfig: {
        isShowOpera: false,
        isIndex: true,
        isMultiSelect: true,
        height: '270px'
      },
      fuzzyConfig: {
        apiUrl: commonApi.userList
      }
    },
    {
      label: '角色',
      value: 'roles',
      type: 'tableTemplate',
      tableHeader: [
        {
          label: '角色编号',
          value: 'code',
          en: 'Roles Code',
          lang: 'rolesPermission.list.tableHeader.code'
        },
        {
          label: '角色名',
          value: 'name',
          en: 'Roles Name',
          lang: 'rolesPermission.list.tableHeader.name'
        }
      ],
      tableConfig: {
        isShowOpera: false,
        isIndex: true,
        isMultiSelect: true,
        height: '270px'
      },
      fuzzyConfig: {
        apiUrl: commonApi.rolesList
      }
    }

  ]
  rolesOptions: any[] = [
    {
      label: '管理员',
      value: 'admin'
    },
    {
      label: '采购员',
      value: 'purchaser'
    },
    {
      label: '仓储员',
      value: 'stocker'
    }
  ]
  @Watch('name')
  onNameChange(newValue, oldValue) {
    this.modeling.updateProperties(this.element, {
      name: newValue
    })
  }
  @Watch('candidateGroups')
  onRolesChange(newVal, oldValue) {
    this.modeling.updateProperties(this.element, { 'activiti:candidateGroups': newVal })
  }
  @Watch('element', { immediate: true, deep: true })
  onElementChange(newVal, oldvalue) {
    console.log('userTask newVal', newVal)
    if (newVal.type === 'bpmn:UserTask') {
      const bpmnModeler = this.bpmnModelerOver()
      const modeling = bpmnModeler.get('modeling')
      const businessObject = newVal.businessObject
      console.log('userTask businessObject', businessObject)
      this.name = businessObject.name
      if (businessObject.get('candidateUsers')) {
        this.getDefinitionUser(0, 'user', businessObject.get('candidateUsers'))
      } else if (businessObject.get('candidateGroups')) {
        this.getDefinitionUser(1, 'roles', businessObject.get('candidateGroups'))
      }
      // this.candidateGroups = businessObject.get('candidateGroups')
      //   this.multiinstance_type = businessObject.get('multiinstance_type') || 'None'
      //   this.multiinstance_condition = businessObject.get('multiinstance_condition') || ''
      //   modeling.updateProperties(newVal, { 'multiinstance_type': this.multiinstance_type })
      //   modeling.updateProperties(newVal, { 'multiinstance_condition': this.multiinstance_condition })
    }
  }

  mounted() {
    const bpmnModeler = this.bpmnModelerOver()
    this.modeling = bpmnModeler.get('modeling')
  }
  // 根据已选择的用户或者角色code 获取到对应的 name code id
  async getDefinitionUser(type, typeKey, code) {
    const res = await this._post({ url: apiUrl.getDefinitionUser, data: {
      data: {
        type,
        codeList: Array.isArray(code) ? code : code.split(',')
      }
    }})
    if (res.code === 0) {
      this.receiveChannelsObj = {
        [typeKey]: res.data
      }
    }
  }
  confirm(chooseData, selected) {
    // console.log('element', this.element.businessObject)
    delete this.element.businessObject.candidateUsers
    delete this.element.businessObject.candidateGroups
    console.log('confirm data', chooseData, 'selected', selected)
    const values = chooseData[selected].map((item) => item.code)
    const key = selected === 'user' ? 'activiti:candidateUsers' : 'activiti:candidateGroups'
    this.modeling.updateProperties(this.element, { [key]: values })
  }
}
</script>

<style scoped lang="scss">
.multile-search{
  margin: 0 !important;
  background: #fff;
}
</style>
