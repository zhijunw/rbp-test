<template>
  <div>
    <div id="viewer" />
  </div>
</template>

<script>
import apiUrl from '@/api/sale-center/sale-plain'
import commonApi from '@/api/common-api/index'

export default {
  name: 'PrintPreview',
  // data用于存放数据或者变量
  data() {
    return {
    }
  },
  watch: {
    $route(to, from) {
      // 监听路由是否变化
      if (to.params.ids !== from.params.ids) {
        this.init()// 重新加载数据
      }
    }
  },
  mounted: function() {
    this.init()
  },
  methods: {
    async init() {
      const { ids, moduleId, printId, printApi } = this.$route.query
      try {
        const printResponse = await this._get({ url: `${commonApi.getPrintDetail}/${printId}` })
        const { templateFileContent } = printResponse.data
        var viewer = new window.Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false)
        var report = new window.Stimulsoft.Report.StiReport()
        // report.loadFile('/reports/billSalePlan.mrt')
        report.load(templateFileContent)
        report.dictionary.databases.clear()
        var dataSet = new window.Stimulsoft.System.Data.DataSet('billData')
        const res = await this._post({ url: printApi, data: { ids: [ids], moduleId }})
        if (res.code === 0) {
          dataSet.readJson(res.data)
          report.regData('billData', 'billData', dataSet)
          viewer.report = report
          viewer.renderHtml('viewer')
        }
      } catch (error) {
        console.log('error', error)
        this._message({ message: '请求有误', type: 'err' })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header,
.el-footer {
  background-color: white;
}
</style>
