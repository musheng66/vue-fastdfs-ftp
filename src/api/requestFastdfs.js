import axios from 'axios'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { Message } from 'element-ui' // progress bar style
/**
 * 创建 axios 实例
 */
const service = axios.create({
  // 设置Content-Type
  // headers: { 'Content-Type': 'text/plain' },
  // baseURL: process.env.BASE_URL, // api的base_url
  timeout: 10000, // 请求超时时间2
  withCredentials: true
})
// NProgress Configuration
NProgress.configure({
  showSpinner: false
})
/**
 * request 拦截器
 */
service.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  // 处理参数类型
  switch (config.paramType) {
    case 'raw':
      config.data = config.data || config.params
      break
    case 'form':
      config.data = config.data || config.params
      let formData = new FormData()
      for (let item in config.data) {
        formData.append(item, config.data[item])
      }
      config.data = formData
      break
    default:
      break
  }
  // 认证类型
  switch (config.authType) {
    case 'basic':
      config.headers['Authorization'] = 'Basic ' + config.authData
      break
    case 'oauth2':
      config.headers['Authorization'] = 'Bearer ' + config.authData
      break
    default:
      break
  }
  return config
}, error => {
  // Do something with request error
  console.error(error) // for debug
  return Promise.reject(error)
})
/**
 * respone 拦截器
 */
service.interceptors.response.use(
  response => {
    NProgress.done()
    // 可根据自定义 status 判断状态，自定义 status 最好放在响应返回的 data 对象中
    const data = response.data
    // 下载文件
    if (response.config.responseType === 'blob') {
      return Promise.resolve(data)
    }
    if (String(data.returnCode) === '200') {
      return data.returnData
    } else {
      Message({
        message: data.message,
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(data)
  },
  error => {
    NProgress.done()
    return Promise.reject(error)
  }
)
export default service
