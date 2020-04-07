import { deleteFileById, getDirById, renameDir, deleteDirById, createDir, downloadFileById, uploadFile } from '@/api/fastdfs/index'

const state = {
  itemList: [], // 当前显示的文件列表
  selectedList: [], // 当前选中的文件列表
  currentDirId: '', // 当前目录id
  backwards: [], // 后退目录id
  forwards: [] // 前进目录id
}

const mutations = {
  SET_ITEM_LIST: (state, itemList) => {
    state.itemList = itemList
  },
  SET_SELECTED_LIST: (state, selectedList) => {
    state.selectedList = selectedList
  },
  SET_CURRENT_DIRID: (state, currentDirId) => {
    state.currentDirId = currentDirId
    localStorage.setItem('currentDirId', state.currentDirId)
  },
  ADD_BACKWARD: (state, dirId) => {
    state.backwards.push(dirId)
    localStorage.setItem('backwards', JSON.stringify(state.backwards))
  },
  REMOVE_BACKWARD: (state) => {
    state.backwards.pop()
    localStorage.setItem('backwards', JSON.stringify(state.backwards))
  },
  ADD_FORWARD: (state, dirId) => {
    state.forwards.push(dirId)
    localStorage.setItem('forwards', JSON.stringify(state.forwards))
  },
  REMOVE_FORWARD: (state) => {
    state.forwards.pop()
    localStorage.setItem('forwards', JSON.stringify(state.forwards))
  }
}

const actions = {
  setSelectedList ({ commit }, selectedList) {
    commit('SET_SELECTED_LIST', selectedList)
  },
  setCurrentDirId ({ commit }, currentDirId) {
    commit('SET_CURRENT_DIRID', currentDirId)
  },
  addBackward ({ commit }, dirId) {
    commit('ADD_BACKWARD', dirId)
  },
  removeBackward ({ commit }) {
    commit('REMOVE_BACKWARD')
  },
  addForward ({ commit }, dirId) {
    commit('ADD_FORWARD', dirId)
  },
  removeForward ({ commit }) {
    commit('REMOVE_FORWARD')
  },
  // 获取文件夹目录
  getDirById ({ commit, state }, dirId) {
    return new Promise((resolve, reject) => {
      getDirById(dirId).then(data => {
        commit('SET_ITEM_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除文件
  deleteFileById ({ commit }, fileId) {
    return new Promise((resolve, reject) => {
      deleteFileById(fileId).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 重命名文件夹
  renameDir ({ commit, state }, dirInfo) {
    return new Promise((resolve, reject) => {
      renameDir(dirInfo).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除文件夹
  deleteDirById ({ commit }, dirId) {
    return new Promise((resolve, reject) => {
      deleteDirById(dirId).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 创建文件夹
  createDir ({ commit, state }, dirInfo) {
    return new Promise((resolve, reject) => {
      createDir(dirInfo).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 下载文件
  downloadFileById ({ commit, state }, fileId) {
    return new Promise((resolve, reject) => {
      downloadFileById(fileId).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 上传文件
  uploadFile ({ commit, state }, fileFormData) {
    return new Promise((resolve, reject) => {
      uploadFile(fileFormData).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
