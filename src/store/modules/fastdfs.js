import { deleteFileById, getDirById, renameDir, deleteDirById, createDir, downloadFileById, uploadFile } from '@/api/fastdfs/index'

const state = {
  itemList: [], // 当前显示的文件列表
  selectedList: [], // 当前选中的文件列表
  currentDir: {}, // 当前目录信息
  backwards: [], // 后退目录id
  forwards: [] // 前进目录id
}

const mutations = {
  SET_ITEM_LIST: (state, itemList) => {
    state.itemList = itemList
    localStorage.setItem('itemList', JSON.stringify(state.itemList))
  },
  SET_SELECTED_LIST: (state, selectedList) => {
    state.selectedList = selectedList
  },
  SET_CURRENT_DIR: (state, currentDir) => {
    state.currentDir = currentDir
    localStorage.setItem('currentDir', JSON.stringify(state.currentDir))
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
      // 去掉附加的dir
      dirId = dirId.replace('dir', '')
      getDirById(dirId).then(data => {
        // 更新当前目录信息
        commit('SET_CURRENT_DIR', {
          id: dirId,
          dirId: dirId,
          parentId: data.parentId,
          path: data.path
        })
        // 合并files及dirs
        let items = data.dirs || []
        let files = data.files || []
        for (let d of items) {
          d.ftpType = 'dir'
          // 由于合并后file和dir的id可能相同，此处附加dir标识
          d.id = 'dir' + d.dirId
          d.name = d.dirName
        }
        for (let f of files) {
          f.ftpType = 'file'
          f.id = 'file' + f.fileId
          f.name = f.fileName
          items.push(f)
        }
        items.sort(function (a, b) {
          return Number(a.createTime) - Number(b.createTime)
        })
        commit('SET_ITEM_LIST', items)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除文件
  deleteFileById ({ commit }, fileId) {
    // 去掉附加的file
    fileId = fileId.replace('file', '')
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
    // 去掉附加的dir
    dirInfo.dirId = dirInfo.dirId.replace('dir', '')
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
    // 去掉附加的dir
    dirId = dirId.replace('dir', '')
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
    // 去掉附加的file
    fileId = fileId.replace('file', '')
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
