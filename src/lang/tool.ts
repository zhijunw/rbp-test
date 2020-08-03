import { TableHeaderConfig } from '@/typings'
export function getZhDesc(module: TableHeaderConfig[], lang = 'label') {
  const obj = {}
  module.forEach((item) => {
    obj[item.value] = item[lang]
  })
  return obj
}
export function getObjZhDesc(dataObj: any, lang = 'label') {
  let langObj = {}
  for (const keysObj in dataObj) {
    for (const key in dataObj[keysObj]) {
      if (Array.isArray(dataObj[keysObj][key])) {
        langObj = Object.assign({}, langObj, getZhDesc(dataObj[keysObj][key], lang))
      }
    }
  }
  return langObj
}
