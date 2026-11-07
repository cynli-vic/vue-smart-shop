// 此处存放所有与login相关请求
// 1. 获取图形验证马
import request from '@/utils/request'
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 2 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 3 登陆接口验证
export const codeLogin = (mobile, smsCode) => {
  // 15751776629 需要输入的手机号
  // 246810 需要输入的验证码
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
