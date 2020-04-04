import request from '@/api/request'

/**
 * @Description 根据用户名和密码登录
 * @Param {String} username 用户名
 * @Param {String} password 密码
 * @return {*} 接口数据
 */
export function loginByUsername (username, password) {
  const data = {
    username: username,
    password: password
  }
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/**
 * @Description 退出登录
 * @return {*} 接口数据
 */
export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

/**
 * @Description 根据 token 获取用户信息
 * @Param {String} token
 * @return {*} 接口数据
 */
export function getUserInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
