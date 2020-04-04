import { deleteFileById, getDirById, renameDirById, deleteDirById, createDirById, downloadFileById, uploadFile } from '@/api/fastdfs/index'

const state = {
  itemList: [] // 当前显示的文件列表
}

const mutations = {
  SET_ITEM_LIST: (state, itemList) => {
    state.itemList = itemList
  }
}

const actions = {
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
  // 获取文件夹目录
  getDirById ({ commit, state }, dirId) {
    return new Promise((resolve, reject) => {
      getDirById(dirId).then(data => {
        commit('SET_ITEM_LIST', data.list)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 重命名文件夹
  renameDirById ({ commit, state }, dirInfo) {
    return new Promise((resolve, reject) => {
      renameDirById(dirInfo.dirId).then(data => {
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
  createDirById ({ commit, state }, dirInfo) {
    return new Promise((resolve, reject) => {
      createDirById(dirInfo.dirId).then(data => {
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
