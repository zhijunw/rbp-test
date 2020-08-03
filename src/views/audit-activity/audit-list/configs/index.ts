import { TableHeaderConfig } from '@/typings'
interface TableConfig {
  [x: number]: {
    tableColumn: TableHeaderConfig[]
  }
}
export const mockTableColumn: TableConfig = {
  700001: {
    tableColumn: [
      {
        label: '计划单号',
        value: 'billNo',
        en: 'Plain Number',
        width: '150px',
        lang: 'salePlain.list.tableHeader.billNo'
      },
      {
        label: '手工单号',
        value: 'manualId',
        en: 'Manual Number',
        lang: 'salePlain.list.tableHeader.manualId'
      },
      {
        label: '渠道',
        value: 'channelName',
        en: 'channel',
        lang: 'salePlain.list.tableHeader.channelName'
      },
      {
        label: '数量',
        value: 'totalQuantity',
        en: 'number',
        lang: 'salePlain.list.tableHeader.totalQuantity'
      },
      {
        label: '金额',
        value: 'totalBalancePrice',
        en: 'money',
        lang: 'salePlain.list.tableHeader.totalBalancePrice'
      },
      {
        label: '状态',
        value: 'status',
        en: 'Status',
        lang: 'salePlain.list.tableHeader.status'
      },
      {
        label: '审批状态',
        value: 'flowTypeName',
        en: 'flowTypeName',
        width: '150px',
        lang: 'salePlain.list.tableHeader.flowTypeName'
      },
      {
        label: '制单用户',
        value: 'createdByName',
        en: 'createdByName',
        lang: 'salePlain.list.tableHeader.createdByName'
      },
      {
        label: '制单时间',
        value: 'createdTime',
        en: 'Make Up Date',
        lang: 'salePlain.list.tableHeader.createdTime'
      },
      {
        label: '修改用户',
        value: 'updatedByName',
        en: 'Modify User',
        lang: 'salePlain.list.tableHeader.updatedByName'
      },
      {
        label: '修改日期',
        value: 'updatedTime',
        en: 'Modify Date',
        lang: 'salePlain.list.tableHeader.updatedTime'
      },
      {
        label: '备注',
        value: 'remark',
        en: 'remark',
        lang: 'salePlain.list.tableHeader.remark'
      }
    ]
  }
}
