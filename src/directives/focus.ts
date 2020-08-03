import { Dictionary } from '@/typings'
export default {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el: HTMLElement, obj: Dictionary) {
    // 这是需要页面刚加载就能进行聚焦操作使用的钩子函数,可以省略的，视具体需求而定
    if (obj.value) {
      // 对值进行判断
      // 聚焦元素
      el.focus()
    }
  },
  // 当指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated: function(el: HTMLElement, obj: Dictionary) {
    // 这是每当绑定的值发生改变时触发的钩子函数
    if (obj.value) {
      el.focus()
    }
  }
}

