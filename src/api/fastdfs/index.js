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
 * 获取指定的文件夹目录（获取根目录时dirId=1）
 * @param {String} dirId
 */
export function getDirById (dirId) {
  // let result = {}
  // if (dirId && String(dirId) !== '1') {
  //   result = {
  //     dirs: [
  //       { createTime: '20200403162414', ip: '192.168.137.1', dirId: 22, parentId: 1, dirName: '数据治理123' },
  //       { createTime: '20200407105018', ip: '172.16.5.179', dirId: 32, parentId: 1, dirName: '机器学习442' }
  //     ],
  //     files: [
  //       {
  //         fileName: '儿童医院NCPCS合作开发项目验收规范2.docx',
  //         createTime: '20200407111947',
  //         httpUrl: '172.16.1.19:80/group1/M00/00/00/rBABE16L8aSAOlQVAACGlJ6gb0086.docx?token=24738fe16e6cebd7f9a0bb358dd025b5&ts=1586229587',
  //         filePath: 'group1/M00/00/00/rBABE16L8aSAOlQVAACGlJ6gb0086.docx',
  //         ip: '172.16.5.179',
  //         dirId: 1,
  //         fileType: 'docx',
  //         fileId: 12,
  //         token: 'token=24738fe16e6cebd7f9a0bb358dd025b5&ts=1586229587'
  //       }
  //     ],
  //     parentId: 1,
  //     path: '172.16.1.19:80/test'
  //   }
  // } else {
  //   result = {
  //     dirs: [
  //       { createTime: '20200403162414', ip: '192.168.137.1', dirId: 2, parentId: 0, dirName: '数据治理' },
  //       { createTime: '20200403175133', ip: '192.168.137.1', dirId: 4, parentId: 0, dirName: '智慧展示' },
  //       { createTime: '20200407105018', ip: '172.16.5.179', dirId: 3, parentId: 0, dirName: '机器学习' }
  //     ],
  //     files: [
  //       {
  //         fileName: '儿童医院NCPCS合作开发项目验收规范.docx',
  //         createTime: '20200403111947',
  //         httpUrl: '172.16.1.19:80/group1/M00/00/00/rBABE16L8aSAOlQVAACGlJ6gb0086.docx?token=24738fe16e6cebd7f9a0bb358dd025b5&ts=1586229587',
  //         filePath: 'group1/M00/00/00/rBABE16L8aSAOlQVAACGlJ6gb0086.docx',
  //         ip: '172.16.5.179',
  //         dirId: 0,
  //         fileType: 'docx',
  //         fileId: 1,
  //         token: 'token=24738fe16e6cebd7f9a0bb358dd025b5&ts=1586229587'
  //       },
  //       {
  //         fileName: '文件管理接口.doc',
  //         createTime: '20200407131422',
  //         httpUrl: '172.16.1.19:80/group1/M00/00/00/rIEWN9EL8aSAOlNUNS8lJ6gb0193.doc?token=24738fe16e6cebd7f9a0bb358dd025b5&ts=1586229587',
  //         filePath: 'group1/M00/00/00/rIEWN9EL8aSAOlNUNS8lJ6gb0193.doc',
  //         ip: '172.16.5.179',
  //         dirId: 0,
  //         fileType: 'doc',
  //         fileId: 2,
  //         token: 'token=24738fe16e6cebd7f9a0bb358dd025b5&ts=1586229587'
  //       }
  //     ],
  //     parentId: 0,
  //     path: '172.16.1.19:80/'
  //   }
  // }
  // return Promise.resolve(result)
  return request({
    url: '/fastdfs/dir/' + dirId,
    method: 'get'
  })
}

/**
 * 重命名文件夹
 * @param {Object} dirInfo
 */
export function renameDir (dirInfo) {
  return request({
    url: '/fastdfs/dir/' + dirInfo.dirId,
    method: 'put',
    params: dirInfo
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
    url: '/fastdfs/dir/create',
    method: 'post',
    params: dirInfo
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
