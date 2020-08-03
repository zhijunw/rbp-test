# Inform弹窗组件
>基于Element的Dailog组件二次封装，与官方的MessageBox组件相比，增加了
* 多条通知同时提示功能
* 复制详细内容到剪贴板功能
* 多语言支持

-------

基本逻辑：从页面中心出现,若出现多条,只展示一条,关掉后在展示下一条,知道没有通知;共有四种提示类型:成功/警告/消息/错误，并且可以复制详情内容到剪贴板

-------

**使用方法**


| 参数                | 说明                     | 类型      | 可选值                        | 默认值                                         |
|-------------------|------------------------|---------|----------------------------|---------------------------------------------|
| type              | 主题                     | string  | success/warning/error/info | Info                                        |
| content           | 内容                     | string  | -                          | -                                           |
| detail            | 详情（可复制）                | string  | -                          | -                                           |
| isConfirm         | 是否为Confirm模式（同时含有确认、取消两个按钮） | boolean | true/false                 | false                                       |
| confirmButtonText | 确定按钮名称                 | string  | -                          | isConfirm为true时，默认值为’确定’，为false时，默认值为’我知道了’ |
| cancelButtonText  | 取消按钮名称                 | string  | -                          | 取消                                          |


``` javascript
this.$vInform({
  type: 'success',
  content: '成功啦',
})
this.$vInform({
  type: 'error',
  content: '报错啦',
  detail: '这是错误代码，可复制'
})
this.$vInform({
  type: 'info'
  content: '提示啦',
  detail: '这是提示代码，可复制'
})
 this.$vInform({
  type: 'warning',
  content: '警告啦',
})
 this.$vInform({
       type: 'error',
       isConfirm: true,
       confirmButtonText: '自定义确认文字',
       cancelButtonText: '自定义取消文字',
       content: '后台报了一个错误，请及时处理',
       detail: '这是可以复制的内容'
     }).then(() => {
        // 确定按钮的回调
       this.$message.success('触发了确认')
     }).catch(() => {
        // 取消按钮的回调
       this.$message.error('触发了取消')
     })
```
