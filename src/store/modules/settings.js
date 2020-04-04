import variables from '@/plugins/element-ui/element-variables.scss'
import defaultSettings from '@/settings'
import { getStore, setStore } from '@/utils/store'
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  themeName: getStore({ name: 'themeName' }) || '',
  themeColor: getStore({ name: 'themeColor' }) || variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  SET_THEME_COLOR: (state, color) => {
    state.themeColor = color
    setStore({
      name: 'themeColor',
      content: state.themeColor
    })
  },
  SET_THEME_NAME: (state, themeName) => {
    state.themeName = themeName
    setStore({
      name: 'themeName',
      content: state.themeName
    })
  },
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  setThemeColor ({ commit }, data) {
    commit('SET_THEME_COLOR', data)
  },
  setThemeName ({ commit }, data) {
    commit('SET_THEME_NAME', data)
  },
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
