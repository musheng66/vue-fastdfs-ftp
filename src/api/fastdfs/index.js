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
  return request({
    url: '/fastdfs/dir/' + dirId,
    method: 'get'
  })
}

/**
 * 重命名文件夹
 * @param {String} dirId
 */
export function renameDirById (dirId) {
  return request({
    url: '/fastdfs/dir/' + dirId,
    method: 'put'
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
 * @param {String} dirId
 */
export function createDirById (dirId) {
  return request({
    url: '/fastdfs/dir/' + dirId,
    method: 'post'
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
