import { globalConfigs } from './index'
import { Vue, Component } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'
import { Dictionary, BillStatus } from '@/typings'

@Component({})
export default class vuexMixins extends Vue {
    @(namespace(globalConfigs.moduleName).State('v_moduleData')) v_moduleData: any // 模块数据
    @(namespace(globalConfigs.moduleName).State('v_activeName')) v_activeName: string // 列表切换
    @(namespace(globalConfigs.moduleName).State('v_btnsAuth')) v_btnsAuth: Dictionary<boolean> // 操作按钮组权限
    @(namespace(globalConfigs.moduleName).State('v_disabled')) v_disabled: boolean // 全局的禁用
    @(namespace(globalConfigs.moduleName).State('v_refreshListTable')) v_refreshListTable: any // 列表的刷新
    @(namespace(globalConfigs.moduleName).State('v_status')) v_status: BillStatus // 页面状态
    @(namespace(globalConfigs.moduleName).State('v_id')) v_id: string // 单据 ID
    @(namespace(globalConfigs.moduleName).State('v_turn')) v_turn: string // 上一页下一页
    @(namespace(globalConfigs.moduleName).State('v_turnBoundary')) v_turnBoundary: string // 翻页状态
    @(namespace(globalConfigs.moduleName).State('v_billStatus')) v_billStatus: string // 单据状态
    @(namespace(globalConfigs.moduleName).State('v_pendingStatus')) v_pendingStatus: string // 单据状态

//   get v_moduleData() {
//     return this.$store.state[this.$route.meta.moduleId].v_moduleData
//   }
//   get v_activeName() {
//     return this.$store.state[this.$route.meta.moduleId].v_activeName
//   }
//   get v_btnsAuth() {
//     return this.$store.state[this.$route.meta.moduleId].v_btnsAuth
//   }
//   get v_disabled() {
//     return this.$store.state[this.$route.meta.moduleId].v_disabled
//   }
//   get v_status() {
//     return this.$store.state[this.$route.meta.moduleId].v_status
//   }
//   get v_id() {
//     return this.$store.state[this.$route.meta.moduleId].v_id
//   }
//   get v_turn() {
//     return this.$store.state[this.$route.meta.moduleId].v_turn
//   }
//   get v_turnBoundary() {
//     return this.$store.state[this.$route.meta.moduleId].v_turnBoundary
//   }
//   get v_billStatus() {
//     return this.$store.state[this.$route.meta.moduleId].v_billStatus
//   }
}
