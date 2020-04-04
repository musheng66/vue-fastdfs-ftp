import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'

const service = axios.create({
  transformRequest: [function(data) {
    data = Qs.stringify(data)
    return data
  }],
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  baseURL: process.env.BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
});

service.interceptors.response.use(
  response => {
    console.log('Download From: ' + response.config.url)
    return Promise.resolve(response.data)
  },
  error => {
    console.log('Download Error From: ' + error.config.url)
    Message({
      message: error.message,
      type: 'info',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  })

export default service
