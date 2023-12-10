const Router = require('koa-router')
const axios = require('axios')
const router = new Router()
const WXBizDataCrypt = require('../../common/WXBizDataCrypt')

// 获取微信session_key
router.post('/getWeChatInfoPersonal', async (ctx) => {
  const result = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    params: {
      appid: 'wx789bea7eb89091e5', //个人appid
      secret: '30d20dbf8b9bc3a685d9d27a40a754f0',// 个人secret
      js_code: ctx.request.body.code,
      grant_type: 'authorization_code'
    }
  })
  ctx.body = JSON.parse(JSON.stringify(result.data))
})

// 解密微信数据，微信获取手机号旧接口
router.post('/cryptoData', async (ctx) => {
  const { sessionKey, encryptedData, iv } = ctx.request.body
  const pc = new WXBizDataCrypt('wx789bea7eb89091e5', sessionKey)
  const data = pc.decryptData(encryptedData, iv)
  console.log('解密后 data: ', data)
  ctx.body = data
})

// 获取用户手机号，微信获取手机号新接口
router.post('/getPhoneNumber', async (ctx) => {
  const tokenRes = await axios.get('https://api.weixin.qq.com/cgi-bin/token', {
    params: {
      appid: 'wx83b8cde7a00bf5e1',// 云设计预见家appid
      secret: 'bcde53905cb8ea43c85b638d92933a6d', // 云设计预见家secret
      grant_type: 'client_credential'
    }
  })
  const token = tokenRes.data.access_token
  const { code } = ctx.request.body
  const res = await axios.post(`https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${token}`, {
    code
  })
  console.log('获取的手机号信息', res.data)
  ctx.body = res.data
})

// 调用地图API，逆解码经纬度
// 此处调用的是百度API
router.post('/parseLoaction', async (ctx) => {
  const ak = 'WeNqlda3sVoW4O6mBW6t3up0xrC9Nz7p'
  const { latitude, longitude } = ctx.request.body
  const location = await axios.get(`
  https://api.map.baidu.com/geoconv/v1/?coords=${latitude},${longitude}&from=1&to=5&ak=${ak}`)
  console.log(location.data)
  if (location.data.status === 0) {
    const { x, y } = location.data.result[0]
    const res = await axios.get(`
    https://api.map.baidu.com/reverse_geocoding/v3/?ak=${ak}&output=json&coordtype=wgs84ll&location=${x},${y}`)
    console.log('经纬度逆解码结果', res.data)
    ctx.body = res.data.result
  } else {
    ctx.body = { errMsg: '失败' }
  }
})

router.post('/getCode', async (ctx) => {
  const tokenRes = await axios.get('https://api.weixin.qq.com/cgi-bin/token', {
    params: {
      appid: 'wx83b8cde7a00bf5e1',// 云设计预见家appid
      secret: 'bcde53905cb8ea43c85b638d92933a6d', // 云设计预见家secret
      grant_type: 'client_credential'
    }
  })
  const token = tokenRes.data.access_token
  const { page, scene, check_path, env_version } = ctx.request.body
  const res = await axios.post(`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${token}`, {
    page,
    scene,
    check_path,
    env_version
  }, {
    responseType: 'stream'
  })
  ctx.type = 'image/jpeg'
  ctx.body = res.data
})

module.exports = router
