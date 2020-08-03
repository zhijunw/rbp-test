type NoticeType = 'error' | 'success' | 'info' | 'warning'

export interface MessageConfig {
  message: string | any
  type?: NoticeType
  title?: string | any
  duration?: number
}

export interface ConfirmConfig {
  content: any
  info?: string | any
  confirmButtonText?: string
  cancelButtonText?: string
  type?: NoticeType
}

export interface NoticeConfig {
  message: ({ message, type, title, duration }) => void
  notify: ({ message, type, title, duration }) => void
  confirm: ({ content, info, confirmButtonText, cancelButtonText, type }) => Promise<any>
  prompt: ({ content, info, confirmButtonText, cancelButtonText, type }) => Promise<any>
}

export const Notice: NoticeConfig = {
  message: function({
    message,
    type = 'info',
    title = this.$t('commonWord.tips'),
    duration = 2000
  }: MessageConfig) {
    this.$message({
      showClose: true,
      title,
      message,
      type,
      duration
    })
  },
  notify: function({ message, title = this.$t('commonWord.tips'), type = 'error' }: MessageConfig) {
    this.$notify({
      title,
      message,
      duration: 0,
      type
    })
  },
  confirm: function({
    content,
    info = this.$t('commonWord.tips'),
    confirmButtonText = this.$t('commonWord.confirm'),
    cancelButtonText = this.$t('commonWord.cancel'),
    type = 'warning'
  }: ConfirmConfig) {
    return new Promise((resolve, reject) => {
      this.$confirm(content, info, {
        confirmButtonText,
        cancelButtonText,
        type
      })
        .then(() => {
          resolve()
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },
  prompt: function({
    content,
    info = this.$t('commonWord.tips'),
    confirmButtonText = this.$t('commonWord.confirm'),
    cancelButtonText = this.$t('commonWord.cancel'),
    type = 'warning'
  }: ConfirmConfig) {
    return new Promise((resolve, reject) => {
      this.$prompt(content, info, {
        confirmButtonText,
        cancelButtonText,
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5_ ]+$/,
        inputErrorMessage: this.$t('form.placeholder.input', { msg: content })
      })
        .then(() => {
          resolve()
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }
}

export const Tools: any = {
  toBoolean: function(str: string): boolean {
    return str === 'true'
  },
  fIndex: function(arr: Array<{ value: string }>, name: String): number {
    return arr.findIndex((k) => k.value === name)
  },
  getCurrentData: function(showAll = true) {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const strDate = date.getDate()
    const hours = date.getHours().toString().padStart(2, '0')
    const minus = date.getMinutes().toString().padStart(2, '0')
    if (showAll) {
      return `${year}-${month}-${strDate} ${hours}:${minus}`
    } else {
      return `${year}-${month}-${strDate}`
    }
  },
  forEachValue: function(obj: Object, fn: Function) {
    Object.keys(obj).forEach((key) => fn(obj[key], key))
  },
  // 带有父子级 数据 的扁平 包含 父元素
  withChildrenFlatten: function(arr: any[]) {
    return arr.reduce((k, m) => {
      const { children, ...rest } = m
      if (children && children.length > 0) {
        k = k.concat([...Tools.withChildrenFlatten(children)])
      }
      k.push(rest)
      return k
    }, [])
  },
  withChildrenFlattenNoParent: function(arr: any[]) {
    return arr.reduce((k, m) => {
      const { children, ...rest } = m
      if (children && children.length > 0) {
        k = k.concat([...Tools.withChildrenFlattenNoParent(children)])
      }
      if (!children || (children && children.length === 0)) {
        k.push(rest)
      }
      return k
    }, [])
  },
  // 多维数据的扁平
  flatten: function<T>(arr: T[], depth = 1) {
    return arr.reduce(
      (a, v) => a.concat(depth > 1 && Array.isArray(v) ? Tools.flatten(v, depth - 1) : v),
      []
    )
  },

  // flattenObjArr<T>(objArr: T): any[] {
  //   var ret = []
  //   Object.keys(objArr).forEach(function(k) {
  //     ret.push.apply(ret, objArr[k])
  //   })
  //   return ret
  // },
  debounce(func: Function, delay: number): any {
    let timer: any
    // const that: any = this
    return function() {
      const context = this
      const args = arguments
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(context, args)
      }, delay)
    }
  },
  formatNumber(n: string | any[]) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  // 参数number为毫秒时间戳，format为需要转换成的日期格式
  formatTime(number: number, format: any = 'Y-M-D') {
    const time: Date = new Date(number)
    const newArr: any[] = []
    const formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
    newArr.push(time.getFullYear())
    newArr.push(Tools.formatNumber(time.getMonth() + 1))
    newArr.push(Tools.formatNumber(time.getDate()))
    newArr.push(Tools.formatNumber(time.getHours()))
    newArr.push(Tools.formatNumber(time.getMinutes()))
    newArr.push(Tools.formatNumber(time.getSeconds()))
    for (const i in newArr) {
      format = format.replace(formatArr[i], newArr[i])
    }
    return format
  },
  setValueAndName(val: any[]) {
    val.forEach(e => {
      // e.value = e.id || e.status
      // e.label = e.name || e.statusName
      e.value = e.id
      e.label = e.name

      if (e.hasOwnProperty('children')) {
        Tools.setValueAndName(e.children)
      }
    })
  },
  setOptions(val: any[], keys: string, arr: any[], optionsName = 'options') {
    // const find = arr.find((e) => {
    //   // return (e.matchSelectKey || e.value) === keys
    //   return e.matchSelectKey === keys || e.value === keys
    // })

    // if (find) {
    //   find[optionsName] = val
    // }
    const findArr = arr.filter((e) => {
      // return (e.matchSelectKey || e.value) === keys
      return e.matchSelectKey === keys || e.value === keys
    })

    if (findArr.length) {
      findArr.forEach((item) => {
        item[optionsName] = val
      })
    }
  },
  // 用于获取url参数
  getQueryVariable(url, variable) {
    var query = url.split('?')[1]
    if (query) {
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] === variable) {
          return pair[1]
        }
      }
    }
    return ''
  }
}
