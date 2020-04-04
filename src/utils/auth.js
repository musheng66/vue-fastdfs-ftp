/*
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
*/
/**
 * 为了实现快速使用模板，本项目采用模拟权限的模式开发，由于不同项目对权限模块的需求不同，开发者可自行按需要开发
 * 用session存放登录信息，关闭浏览器则退出系统
 */
const TokenKey = 'Token'
const RoleKey = 'Roles'
const LoginTimeKey = 'Login-Time'
const NameKey = 'Name'

// token
export function getToken () {
  let token = sessionStorage.getItem(TokenKey)
  try {
    return JSON.parse(token) !== '' ? JSON.parse(token) : null
  } catch (e) {
    console.log('parse token failed')
    return null
  }
}

export function setToken (token) {
  return sessionStorage.setItem(TokenKey, JSON.stringify(token))
}

export function removeToken () {
  return sessionStorage.removeItem(TokenKey)
}

// roles
export function getRoles () {
  let roles = sessionStorage.getItem(RoleKey)
  try {
    return JSON.parse(roles).length > 0 ? JSON.parse(roles) : []
  } catch (e) {
    console.log('parse roles failed')
    return []
  }
}

export function setRoles (roles) {
  return sessionStorage.setItem(RoleKey, JSON.stringify(roles))
}

export function removeRoles () {
  return sessionStorage.removeItem(RoleKey)
}

// login time
export function getLoginTime () {
  let loginTime = sessionStorage.getItem(LoginTimeKey)
  try {
    return JSON.parse(loginTime)
  } catch (e) {
    console.log('parse loginTime failed')
    return ''
  }
}

export function setLoginTime (time) {
  return sessionStorage.setItem(LoginTimeKey, JSON.stringify(time))
}

export function removeLoginTime () {
  return sessionStorage.removeItem(LoginTimeKey)
}

// name
export function getName () {
  let name = sessionStorage.getItem(NameKey)
  try {
    return JSON.parse(name)
  } catch (e) {
    console.log('parse name failed')
    return ''
  }
}

export function setName (name) {
  return sessionStorage.setItem(NameKey, JSON.stringify(name))
}

export function removeName () {
  return sessionStorage.removeItem(NameKey)
}
