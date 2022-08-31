import COS from 'cos-js-sdk-v5' // 导入腾讯云的包(sdk)

const cos = new COS({
  SecretId: 'AKIDDBtMYU9YgX6PRBernSqxoOhjV0ECtKUP', // 身份识别ID
  SecretKey: 'h8JkuoRousfDVXKr89wTkmY4KK4ZonY4' // 身份秘钥
})

export default cos

