import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class formSaveMixins extends Vue {
  saveTable(next = true) {
    console.log('执行')
    return new Promise((resolve): boolean | void => {
      if (next) {
        (this.$refs.commonForm as any).validate((valid: any, failObj: { [x: string]: any }):
          | boolean
          | void => {
          if (!valid) {
            // 校验未通过
            let dropdownList: any[] = []
            for (const key of Object.keys(failObj)) {
              const value = failObj[key]
              dropdownList = [...dropdownList, ...value.map((item) => item.message)]
            }
            // console.log(this.$vMessage)
            this.$vMessage({
              duration: 0,
              showClose: true,
              dropdownList: dropdownList,
              message: dropdownList.length === 1 ? dropdownList[0] : '未通过验证信息',
              type: 'warning'
            })
            return false
          } else {
            resolve(true)
          }
        })
      } else {
        return false
      }
    })
  }
}
