import { Dictionary, FormListConfig, Options } from '@/typings'

interface NestConfig {
  id: any
  parent_id: string
  children?: NestConfig[],
  isCanEmpty?: boolean,
  [propName: string]: any
}
/**
 *
 * @param items  带有父子级关系的数组
 * @param id  父子段
 * @param link 子字段
 * @param isCanEmpty 是否允许最后一级的children为[]
 */
export const nest = <T>(items: T[], id: any = null, link = 'parent_id', isCanEmpty: boolean = true): T[] => {
  return items
    .filter((item) => item[link] === id)
    .map((item: any, index) => {
      const children = nest(items, item.id, link, isCanEmpty)

      if (isCanEmpty) {
        return { ...item, index, children: children }
      } else {
        if (children.length === 0) {
          return { ...item, index }
        } else {
          return { ...item, index, children: children }
        }
      }
    })
}

/**
   *
   * @param list  元数据
   * @param options 配置字段选项数据
   * 根据 options 传入字段如 {} 得到 匹配数据的数组
   */
export const transformFields = <T>(list: any[], options: Options, merge:boolean = false): Options[] => {
  if (!list) return []

  return list.reduce((k, m) => {
    const obj = {}
    Object.keys(options).forEach((n) => {
      obj[n] = m[options[n]]
    })
    // k.push(obj)
    merge ? k.push(Object.assign({}, m, obj)) : k.push(obj)
    return k
  }, [])
}
/**
   *
   *
   * @param {any} obj
   * @returns
   */
export const typeOf = (obj: any) :string => {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

/**
   * 深度克隆
   *
   * @export
   * @param {any} data
   * @returns
   */
export const deepCopy = <T>(data: T | any, specifif?: string) :T => {
  const t: string = typeOf(data)
  let o: any

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (const i in data) {
      o[i] = specifif && i === specifif ? data[i] : deepCopy(data[i])
    }
  }
  return o
}
/**
 * 合并数组并去重
 * @param arr1 数组1
 * @param arr2 数组2
 * @param idKeys 关联ID
 */
export const mergeArray = <T>(arr1: T[], arr2: T[], idKeys = 'id'): T[] => {
  var result: T[] = []
  var newArray = [...arr1, ...arr2]
  var map = new Map([])

  newArray.forEach((item) => {
    map.set(item[idKeys], item)
  })
  map.forEach((item, key) => {
    result.push(item as any)
  })
  return result
}

/**
 * 是否在幂运算总数里
 * n&m === n，m为总数，n=1,2,4,8.....
 */

export const isInCountByPow = (m: number, n:number): boolean => {
  return (n & m) === n
}

/**
 * 不改变类型和指针的情况下清空
 */
export const safeEmpty = (data: object) => {
  for (const j in data) {
    if (typeof data[j] === 'string' || typeof data[j] === 'number') {
      data[j] = ''
    } else if (typeof data[j] === 'object') {
      if (data[j] instanceof Array) {
        data[j].splice(0, data[j].length)
      } else if (data[j] instanceof Object) {
        for (const k in data[j]) {
          delete data[j][k]
        }
      }
    }
  }
}
/**
 *
 * @param array1
 * @param array2
 * 多选级联的处理 只用最后一个id
 */
export const formatHighSearchCascader = (list: FormListConfig[], form:Dictionary) => {
  const cascaderlist = list.filter((item) => {
    return item.type === 'cascader'
  }).map((item) => item.value)
  const cascaderValue: any = {}
  for (const keys in form) {
    // 匹配到级联字段则对值 进行处理 如 [ [1,2], [3,4] ] => [ 2,4 ]
    if (cascaderlist.includes(keys)) {
      // 这是处理多选级联情况
      cascaderValue[keys] = []
      // cascaderValue[keys] = form[keys].map((item: number) => {
      //   if (Array.isArray(item)) return item[item.length - 1]
      // })
      for (var [k, v] of Object.entries(form[keys])) {
        // 这是处理多选级联情况
        if (Array.isArray(v)) {
          cascaderValue[keys].push(v[v.length - 1])
        } else {
          // 这里处理 单选级联 获取到最后一项的 id
          if (Number(k) + 1 === form[keys].length) cascaderValue[keys].push(v)
        }
      }
    }
  }
  return cascaderValue
}
// 判断2个简单数组是否相等
export const scalarArrayEquals = (array1: any[], array2: any[]): boolean => {
  return array1.length === array2.length && array1.every(function(v, i) { return v === array2[i] })
}
// 错误捕捉
export const to = async <T>(promise: Promise<T>) : Promise<any[] | (T | null)[]> => {
  try {
    const data = await promise
    return [null, data]
  } catch (err) {
    return [err]
  }
}
export const toawait = async <T, U = any>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U | null, T | undefined]> => {
  try {
    const data = await promise
    return [null, data]
  } catch (err) {
    if (errorExt) {
      Object.assign(err, errorExt)
    }
    return [err, undefined]
  }
}
export function isEmpty(...str) {
  return str.some(i => i === undefined || i === null || i === '')
}
