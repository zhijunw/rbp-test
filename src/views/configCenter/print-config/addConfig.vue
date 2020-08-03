<template>
  <div class="designer-waprrer">
    <div class="designer-save">
      <div class="designer-save-btn">
        <div class="edit-btn">
          <p class="f14">
            打印方案
          </p>
          <el-button type="text" icon="el-icon-edit" @click="editPlain" />
        </div>

        <div class="btn-group">
          <el-button plain @click="close">
            {{ $t('layout.btns.cancel') }}
          </el-button>
          <el-button plain @click="save">
            {{ $t('layout.btns.save') }}
          </el-button>
        </div>
      </div>
    </div>
    <div id="designer" v-loading="load" />

    <base-dialog :dialogObj="editPlainDiaglog" class="base-dialog">
      <template v-slot:content>
        <div class="name-box">
          <p class="designer-save-text f12 mgb-12">
            方案名称
          </p>
          <base-input :value.sync="name" :inputProps="{ long: true }" />
        </div>
      </template>
    </base-dialog>
  </div>
</template>

<script>
import baseUrl from '@/api/baseUrl'
import apiUrl from '@/api/config-center/print-config'
import vuexMixins from './configs/vuex-module'

import { Loading } from 'element-ui'
export default {
  name: 'AddPrintConfig',
  components: {
    baseInput: () => import('@/components/base-input/index.vue'),
    baseDialog: () => import('@/components/base-dialog/index.vue')
  },
  mixins: [vuexMixins],
  // data用于存放数据或者变量
  data() {
    return {
      reportDom: null,
      name: '',
      load: false,
      timer: null,
      routerParams: {},
      editPlainDiaglog: {
        isShowDialog: false,
        title: ''
      },
      loadingInstance: null
    }
  },
  async mounted() {
    // this.routerParams = Object.assign({}, this.$route.query)
    this.routerParams = Object.assign({}, this.$route.params)

    if (this.$route.query.id) {
      await this.getDetail(this.$route.query.id)
    }
    // this.$nextTick(() => {
    this.initPrintConfig()
    // })
    this.name = this.routerParams.title
  },

  // 用于存放所有的事件方法集合
  methods: {
    initPrintConfig() {
      var report = new window.Stimulsoft.Report.StiReport()
      var dataSet = new window.Stimulsoft.System.Data.DataSet('billData')
      const detailDetail = this.routerParams.templateFileContent

      if (detailDetail) {
        report.load(detailDetail)
      } else {
        report.loadFile('/reports/billSalePlan.mrt')
      }

      report.dictionary.databases.clear()
      // eslint-disable-next-line no-undef

      dataSet.readJsonFile('/reports/billSalePlan.json')
      report.regData('billData', 'billData', dataSet)
      var options = new window.Stimulsoft.Designer.StiDesignerOptions()
      options.appearance.fullScreenMode = false
      var designer = new window.Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false)
      designer.report = report
      designer.renderHtml('designer')
    },
    async getDetail(id) {
      const res = await this._get({ url: `${apiUrl.detail}/${id}` })
      if (res.code === 0) {
        const { moduleId, templateFileContent, type, templateName: title } = res.data
        this.routerParams = Object.assign(this.routerParams, {
          moduleId,
          type,
          templateFileContent,
          title
        })
      }
    },
    close() {
      const view = {
        name: `router-${this.m_moduleId}`,
        meta: {
          moduleId: this.m_moduleId
        }
      }
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        this.$nextTick(() => {
          // 关闭路由页面的时候需要卸载掉store
          setTimeout(() => {
            if (this.$store.state[view.moduleId]) {
              this.$store.unregisterModule(view.moduleId)
            }
          }, 10)
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          }
        })
      })
    },
    isActive(route) {
      return route.meta.moduleId === this.$route.meta.moduleId
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        // Default redirect to the home page if there is no tags-view, adjust it if you want
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    async save() {
      const reportDom = new window.Stimulsoft.Report.StiReport()
      const json = reportDom.saveDocumentToJsonString()
      const fileName = reportDom.reportAlias

      const postData = {
        templateFileContent: json,
        templateFileName: fileName,
        templateName: this.name,
        type: this.routerParams.type,
        moduleId: this.routerParams.moudleId
      }
      let action = ''
      let methods = ''
      if (this.routerParams.action) {
        postData.id = this.routerParams.id
        action = 'update'
        methods = '_put'
      } else {
        action = 'create'
        methods = '_post'
      }
      const res = await this[methods]({
        url: apiUrl[action],
        data: {
          data: postData
        }
      })
      if (res.code === 0) {
        this._message({ message: '操作成功', type: 'success' })
        setTimeout(() => {
          this.close()
        }, 2000)
      }
    },
    editPlain() {
      this.editPlainDiaglog.isShowDialog = true
      this.editPlainDiaglog.title = this.$t('commonWord.editPlainName')
    }
  }
}
</script>

<style scoped lang="scss">
.base-dialog {
  /deep/ .el-dialog__body {
    padding: 20px 16px;
  }
}
.designer-waprrer {
  margin: 8px;
  .designer-save {
    background: #fff;
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 4px;
    &-btn {
      display: flex;
      justify-content: space-between;
      padding-bottom: 6px;
      border-bottom: 1px solid #eee;
      margin-bottom: 6px;
    }
    .name-box {
      display: flex;
      align-items: center;
    }
    .edit-btn {
      display: flex;
      align-items: center;
    }
  }
}
</style>
