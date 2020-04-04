import { loginByUsername, logout, getUserInfo } from '@/api/auth/user'
import { getToken, setToken, setRoles, setName } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  setting: {
    articlePlatform: []
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_NAME: (state, name) => {
    state.name = name
    setName(name)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
    setRoles(roles)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户名登录
  loginByUsername ({ commit }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      loginByUsername(username, userInfo.password).then(data => {
        commit('SET_TOKEN', data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户信息
  getUserInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then(data => {
        commit('SET_NAME', data.name)
        commit('SET_TOKEN', getToken())
        commit('SET_ROLES', data.roles)
        commit('SET_AVATAR', data.avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 登出
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_NAME', '')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 前端 登出
  fedLogout ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
