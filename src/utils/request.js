import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

// 创建 axios 实例，对创建出来的实例进行自定义配置
// 好处： 不会污染 原始 配置
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

// 自定义配置 请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading，禁止背景点击 防止多次点击
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0 // 让loading不会自动消失 需要请求回来后 再关
  })
  // 只要有token，就在请求时携带，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    // 带特殊 字符 需要 括号 以对象的方法 访问
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
},
function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么 (axios 会默认 多包装一层data， 需要处理一下)
  // return response;
  const res = response.data
  if (res.status !== 200) {
    // 给提示 toast 是单例 同时只会存在一个 当这个响应时 会自动关掉 loading
    Toast(res.message)
    // 抛出错误的promise
    return Promise.reject(res.message)
  } else {
    // 响应正确 走核心业务 关闭 loading
    Toast.clear()
  }
  return res
},
function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置好的 实例
export default instance
