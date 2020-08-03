import { ListOperationBtnsConfig, InputConfig } from '@/typings'
interface GlobalConfig {
    btns: ListOperationBtnsConfig[]
    inputConfig: InputConfig
}
export const globalConfig: GlobalConfig = {
  btns: [
    {
      name: '保存',
      value: 'save',
      lang: 'layout.btns.save',
      event: 'save',
      type: 'primary'
    },
    {
      name: '关闭',
      value: 'close',
      lang: 'layout.btns.close',
      event: 'close',
      plain: true
    }
  ],
  inputConfig: {
    placeholder: 'form.placeholder.goodsFielsPlaceholder',
    long: true,
    prefixIcon: 'el-icon-search'
  }
}
