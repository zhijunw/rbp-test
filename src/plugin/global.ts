import Vue from 'vue'

import { Tools, Notice } from '@/utils/tools'
import api from '@/api/apiConfig'
const map = {
  _confirm: Notice.confirm,
  _message: Notice.message,
  _notify: Notice.notify,
  _prompt: Notice.prompt,
  _toBoolean: Tools.toBoolean,
  _fIndex: Tools.fIndex,
  _debounce: Tools.debounce,
  _formatTime: Tools.formatTime,
  _post: api.post,
  _get: api.get,
  _delete: api.deletes,
  _put: api.put
}
Object.keys(map).forEach((key) => {
  Vue.prototype[key] = map[key]
})
