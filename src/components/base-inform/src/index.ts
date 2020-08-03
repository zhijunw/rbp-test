import Information from './information'
import { InformConfig } from '@/typings'

interface informInstanceConfig {
  add: (item: InformConfig) => void
  confirm: () => any
}

let informInstance:informInstanceConfig

/**
 * 使用单例设计模式
*/
function getInformInstance() {
  informInstance = informInstance || Information.newInstance()
  return informInstance
}

function inform(
  {
    type = 'info',
    isConfirm = false,
    confirmButtonText = '',
    cancelButtonText = '',
    content = '',
    detail = ''
  }: InformConfig) {
  const instance = getInformInstance()

  instance.add({
    type: type,
    isConfirm: isConfirm,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    content: content,
    detail: detail
  })

  // 使用Promise进行confirm的回调
  return instance.confirm()
}

export default inform

