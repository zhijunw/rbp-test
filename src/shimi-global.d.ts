import VueRouter, { Route } from 'vue-router'
import { NoticeConfig, MessageConfig, ConfirmConfig } from '@/utils/tools'
import { InformConfig } from '@/typings'
import { AxiosConfig } from '@/api/apiConfig'
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter // 这表示this下有这个东西
    $route: Route
    _notify: ({message, type, title, duration}: MessageConfig) => void,
    _message: ({message, type, title, duration}: MessageConfig) => void,
    _confirm: ({content,info, confirmButtonText, cancelButtonText, type}: ConfirmConfig) => Promise<any>,
    _prompt: ({content,info, confirmButtonText, cancelButtonText, type}: ConfirmConfig) => Promise<any>,
    _post: ({ url, data }: AxiosConfig) => Promise<any>
    _get: ({ url, params }: AxiosConfig) => Promise<any>
    _delete: ({ url, data }: AxiosConfig) => Promise<any>,
    _put: ({ url, data,params }: AxiosConfig) => Promise<any>,
    // Stimulsoft: any,
    _toBoolean: any,
    _fIndex: any,
    _formatTime: any, 
    _debounce: any,
    $vMessage: any,
    $destroyKey: any
    $vInform: (item: InformConfig) => any,
  }
  interface Window {
   config: any
  }
}
