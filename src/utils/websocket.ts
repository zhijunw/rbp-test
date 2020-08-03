import { Dictionary } from '@/typings'

class SocketPlugin {
    public params: Dictionary
    public websocket: WebSocket
    public isConnect: boolean = false
    public timeout: any = null
    public isActivelyClose: boolean = false
    constructor(parmas: Dictionary) {
      this.params = parmas
      this.isConnect = false
      this.isActivelyClose = false
      this.timeout = null
    }

    connect() {
      this.websocket = new WebSocket(this.params.url)
      this.initSocket(this.params)
    }
    initSocket(params) {
      this.isActivelyClose = false

      this.websocket.onopen = () => {
        console.log('websocket已连接~ ' + this.params.url)
        this.isConnect = true
      }
      this.websocket.onerror = e => {
        console.log('websocket发生异常~' + this.params.url + e)
        this.reconnectSocket(params)
      }
      this.websocket.onclose = e => {
        console.log('websocket连接关闭~' + e)
        this.isConnect = false
        // 如果手动关闭则不进行重连
        if (!this.isActivelyClose) {
          this.reconnectSocket(params)
        }
      }
      this.websocket.onmessage = e => {
        console.log('websocket接受信息', e)
        params.callback(JSON.parse(e.data))
      }
    }
    reconnectSocket(params: Dictionary) {
      if (this.isConnect === true) return
      console.log('websocket 重新连接~ ')
      this.isConnect = true
      this.timeout && clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.connect()
        this.isConnect = false
      }, 300000)
    }
    send(msg: Dictionary) {
      this.websocket.send(JSON.stringify(msg))
    }
    close() {
      this.isActivelyClose = true
      if (this.websocket) {
        this.websocket.close()
      }
    }
}
export default SocketPlugin
