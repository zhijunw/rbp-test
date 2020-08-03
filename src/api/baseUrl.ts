let url = ''
switch (process.env.NODE_ENV) {
  case 'development':
    // url = 'http://192.168.9.160:10010'
    // url = 'http://192.168.9.160:10010'
    url = 'http://erp.joinsaint.com:10010'
    // url = 'http://192.168.9.185:8020'
    // url = 'http://192.168.9.208:8010'
    // url = 'http://192.168.9.185:8020' // 泽伟
    // url = 'http://192.168.9.85:8010' // 志成
    break
  case 'prepro': // 注意这里的名字要和步骤二中设置的环境名字对应起来
    // url = 'http://erp.joinsaint.com:10010' // 生产环境url
    url = (Window as any).config.APIURL
    break
  case 'production':
    // url = 'http://10.40.0.225:8173/app' // 生产环境url
    // url = 'http://erp.joinsaint.com:10010' // 生产环境url
    url = (Window as any).config.APIURL
    break
}

export default url
