import axios from 'axios'
import { Message } from 'element-ui'
import { serialize } from '@/utils'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 10000, // 请求超时时间
  withCredentials: true
})
// NProgress Configuration
NProgress.configure({
  showSpinner: false
})
// 请求拦截器
service.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  const isToken = (config.data || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
  }
  // headers中配置serialize为true开启序列化
  if (config.methods === 'post' && config.headers.serialize) {
    config.data = serialize(config.data)
    // delete config.data.serialize
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  // 成功
  response => {
    NProgress.done()
    // console.log('Response From: ' + response.config.url);
    // console.log(response);
    // 可根据自定义 status 判断状态，自定义 status 最好放在响应返回的 data 对象中
    const res = response.data
    if (String(res.returnCode) === '1000') {
      return res
    }
    if (String(res.returnCode) === '100' || String(res.returnCode) === '200') {
      return res.returnData
    } else if (String(res.returnCode) === '20011') {
      Message({
        showClose: true,
        message: res.returnMsg,
        type: 'error',
        duration: 500,
        onClose: () => {
          store.dispatch('user/fedLogout').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        }
      })
      // return Promise.reject(new Error('未登录'))
    } else {
      Message({
        message: res.returnMsg,
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(res)
  },
  error => {
    NProgress.done()
    // 失败
    // console.log('Request Error From: ' + error.config.url);
    // console.error(error); // for debug
    let res = error.response.data
    if (String(res.code) === '401') {
      Message({
        message: '身份认证已失效，请重新登录',
        type: 'error',
        duration: 1000,
        onClose: () => {
          store.dispatch('user/fedLogout').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error)
  })

export default service
