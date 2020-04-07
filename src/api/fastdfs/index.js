import request from '@/api/requestFastdfs'

/**
 * 根据指定的id删除服务器文件
 * @param {String} fileId
 */
export function deleteFileById (fileId) {
  return request({
    url: '/fastdfs/delete/file/' + fileId,
    method: 'delete'
  })
}

/**
 * 获取指定的文件夹目录（获取根目录时dirId=0）
 * @param {String} dirId
 */
export function getDirById (dirId) {
  let result = []
  if (dirId && String(dirId) !== '0') {
    result = [
      { id: '143423', name: 'dfgsdbcvb', type: 'folder' },
      { id: '16232', name: 'tesxxdft16.pdf', type: 'file' },
      { id: '14233', name: 'erwefg.txt', type: 'file' },
      { id: '12343', name: 'wh4esht', type: 'folder' },
      { id: '134323', name: 'cvbet', type: 'folder' }
    ]
  } else {
    result = [
      { id: '1', name: 'test1.txt', type: 'file' },
      { id: '12', name: 'test1123123test112312312312321231232', type: 'folder' },
      { id: '13', name: 'test13', type: 'folder' },
      { id: '14', name: 'test14', type: 'folder' },
      { id: '15', name: 'test15', type: 'folder' },
      { id: '212', name: 'test212.dmg', type: 'file' },
      { id: '213', name: 'test213', type: 'folder' },
      { id: '214', name: 'test214', type: 'folder' },
      { id: '215', name: 'test215', type: 'folder' },
      { id: '2123', name: 'test2132', type: 'folder' },
      { id: '2124', name: 'test2124', type: 'folder' },
      { id: '2125', name: 'test2125', type: 'folder' },
      { id: '16', name: 'test16.pdf', type: 'file' }
    ]
  }
  return Promise.resolve(result)
  // return request({
  //   url: '/fastdfs/dir/' + dirId,
  //   method: 'get'
  // })
}

/**
 * 重命名文件夹
 * @param {Object} dirInfo
 */
export function renameDir (dirInfo) {
  return request({
    url: '/fastdfs/dir/' + dirInfo.parentId,
    method: 'put',
    data: dirInfo
  })
}

/**
 * 删除文件夹
 * @param {String} dirId
 */
export function deleteDirById (dirId) {
  return request({
    url: '/fastdfs/dir/' + dirId,
    method: 'delete'
  })
}

/**
 * 创建文件夹
 * @param {Object} dirInfo
 */
export function createDir (dirInfo) {
  return request({
    url: '/fastdfs/dir/' + dirInfo.parentId,
    method: 'post',
    data: dirInfo
  })
}

/**
 * 以附件形式下载文件
 * @param {String} fileId
 */
export function downloadFileById (fileId) {
  return request({
    url: '/fastdfs/download/file/' + fileId,
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * 上传文件到指定目录
 * @param {String} dirId
 */
export function uploadFile (dirId) {
  return request({
    url: '/fastdfs/upload/file/' + dirId,
    method: 'post'
  })
}

/**
 * 获取token
 */
export function getToken () {
  return request({
    url: '/fastdfs/get/token',
    method: 'get'
  })
}
