<template>
  <div class="file">
    <div class="file-area" @contextmenu="rightClick" data-target-type="container">
      <vue-drag-select v-model="selectedList" value-key="name" :item-width="100" :item-height="120" :item-margin="[10, 10, 10, 10]" ref="dragSelect">
        <template v-for="(item, index) in itemList">
          <drag-select-option :key="item.id" :value="item" :item-index="index" data-target-type="item" :data-item-type="item.ftpType" :data-item-id="item.id" @dblclick.native="dbClick">
            <div class="item-self" :title="item.name">
              <div class="file-item">
                <div class="file-icon">
                  <i v-if="item.ftpType === 'dir'" class="el-icon-folder"></i>
                  <i v-if="item.ftpType === 'file'" class="el-icon-document"></i>
                </div>
                <div class="file-info">{{ item.name }}</div>
              </div>
            </div>
          </drag-select-option>
        </template>
      </vue-drag-select>
      <!-- 右键菜单 -->
      <vue-context-menu :context-menu-data="contextMenuData" @refresh="refresh" @del="del" @rename="rename" @download="download" @upload="upload" @move="move" @createDir="createDir"></vue-context-menu>
    </div>
    <!-- 重命名 -->
    <el-dialog title="重命名" :visible.sync="dialogVisibleRename" width="480px" append-to-body>
      <div class="dialog-content">
        <el-form ref="formRename" :model="formRename" label-width="40px">
          <el-form-item label="名称">
            <el-input v-model="formRename.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="formRename.ftpType === 'dir'" type="primary" @click="renameDirSubmit">确 定</el-button>
        <el-button v-if="formRename.ftpType === 'file'" type="primary" @click="renameFileSubmit">确 定</el-button>
        <el-button @click="dialogVisibleRename = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 新建文件夹 -->
    <create-dir ref="createDir"></create-dir>
    <!-- 上传文件 -->
    <upload-file ref="uploadFile"></upload-file>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
// 右键菜单
import VueContextMenu from '@/components/Contextmenu'
import CreateDir from './CreateDir'
import Upload from './Upload'
export default {
  components: {
    VueContextMenu,
    CreateDir,
    UploadFile: Upload
  },
  data () {
    return {
      // contextmenu data (菜单数据)
      contextMenuData: {
        // the contextmenu name(@1.4.1 updated)
        menuName: 'demo',
        // The coordinates of the display(菜单显示的位置)
        axis: {
          x: null,
          y: null
        },
        // Menu options (菜单选项)
        menuList: [
          // {
          //   fnHandler: 'copy', // Binding events(绑定事件)
          //   icoName: 'el-icon-delete', // icon (icon图标 )
          //   btnName: '复制' // The name of the menu option (菜单名称)
          // }
        ]
      },
      dialogVisibleRename: false,
      formRename: {
        id: '',
        name: '',
        oldName: '',
        type: ''
      }
    }
  },
  computed: {
    selectedList: {
      get () {
        return this.$store.state.fastdfs.selectedList
      },
      set (selectedList) {
        this.$store.dispatch('fastdfs/setSelectedList', selectedList)
      }
    },
    itemList: {
      get () {
        return this.$store.state.fastdfs.itemList
      }
    },
    currentDir: {
      get () {
        return this.$store.state.fastdfs.currentDir
      }
    }
  },
  mounted () {
    this.getItemList('1', false)
  },
  methods: {
    /**
     * 获取目录
     * @param dirId 目录id
     * @param setWards 是否记录步骤
     */
    getItemList (dirId, setWards = true) {
      dirId = dirId || this.currentDir.id
      if (!dirId) return
      this.$store.dispatch('fastdfs/getDirById', dirId).then(res => {
        if (setWards) this.$store.dispatch('fastdfs/addBackward', dirId)
      })
    },
    refresh () {
      this.getItemList(null, false)
    },
    download () {
      const item = this.selectedList[0]
      this.$store.dispatch('fastdfs/downloadFileById', item.id).then(res => {
        FileSaver.saveAs(res.data, item.name)
      })
    },
    upload () {
      this.$refs.uploadFile.upload()
    },
    move () {

    },
    createDir () {
      this.$refs.createDir.createDir()
    },
    del () {
      const item = this.selectedList[0]
      if (item.ftpType === 'dir') this.delDir(item)
      if (item.ftpType === 'file') this.delFile(item)
    },
    delFile (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('fastdfs/deleteFileById', item.id).then(res => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getItemList(null, false)
        })
      }).catch(() => { })
    },
    delDir (item) {
      this.$confirm('此操作将永久删除该文件夹及其包含的文件, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('fastdfs/deleteDirById', item.id).then(res => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getItemList(null, false)
        })
      }).catch(() => { })
    },
    rename () {
      const item = this.selectedList[0]
      if (item.ftpType === 'file') return // 暂不支持文件重命名
      this.formRename.id = item.id
      this.formRename.name = item.name
      this.formRename.oldName = item.name
      this.formRename.ftpType = item.ftpType
      this.dialogVisibleRename = true
    },
    renameDirSubmit () {
      this.$store.dispatch('fastdfs/renameDir', { dirId: this.formRename.id, newName: this.formRename.name, oldName: this.formRename.oldName }).then(res => {
        this.dialogVisibleRename = false
        this.$message({ type: 'success', message: '重命名成功!' })
        this.getItemList(null, false)
      })
    },
    renameFileSubmit () {
    },
    // 双击事件
    dbClick (event) {
      event.preventDefault()
      let targetItem = null
      function getFtpItem (target) {
        if (target.dataset.targetType) {
          targetItem = target
        } else {
          getFtpItem(target.parentElement)
        }
        return target
      }
      getFtpItem(event.target)
      if (!targetItem) return
      let itemType = targetItem.dataset.itemType
      let itemId = targetItem.dataset.itemId
      if (itemType === 'dir') {
        // 将当前文件夹id记录到后退集合中
        this.$store.dispatch('fastdfs/addBackward', this.currentDir.id)
        this.getItemList(itemId, false)
      }
    },
    // 右键事件
    rightClick (event) {
      event.preventDefault()
      // 当前右键点击的item，可能是某文件夹或文件，也可能是空白位置，根据item不同可进行的操作不同
      let targetItem = null
      function getFtpItem (target) {
        if (target.dataset.targetType) {
          targetItem = target
        } else {
          getFtpItem(target.parentElement)
        }
      }
      getFtpItem(event.target)
      if (!targetItem) return
      let targetType = targetItem.dataset.targetType // 目标类型：目标或空白区域
      let itemType = targetItem.dataset.itemType // 文件类型：文件或文件夹
      let itemId = targetItem.dataset.itemId
      let contextListCalc = []
      this.contextMenuData.menuList = []
      switch (targetType) {
        case 'item':
          // 判断item是否已经被选中
          let indexInSelected = this.selectedList.findIndex(item => {
            return item.id === itemId
          })
          if (indexInSelected >= 0) {
            // item已被选中
            if (this.selectedList.length === 1) {
              // 只选中1项时
              contextListCalc.push('del')
              contextListCalc.push('move')
              if (itemType === 'dir') contextListCalc.push('rename')
              if (itemType === 'file') contextListCalc.push('download')
            } else {
              // 选中多项
              contextListCalc.push('del')
              contextListCalc.push('move')
            }
          } else {
            // item未被选中，清除其余被选中项，选中此item
            this.selectedList = []
            let indexData = this.itemList.findIndex(item => {
              return item.id === itemId
            })
            if (indexData >= 0) this.selectedList.push(this.itemList[indexData])
            // 允许删除、重命名、移动文件，下载
            contextListCalc.push('del')
            contextListCalc.push('move')
            if (itemType === 'dir') contextListCalc.push('rename')
            if (itemType === 'file') contextListCalc.push('download')
          }
          break
        case 'container':
          // 右键点击空白位置，清掉其余被选中项，允许上传文件，新建文件夹操作
          this.selectedList = []
          contextListCalc.push('refresh')
          contextListCalc.push('upload')
          contextListCalc.push('createDir')
          break
        default:
          break
      }
      // if (contextListCalc.includes('copy')) { this.contextMenuData.menuList.push({ fnHandler: 'copy', icoName: 'el-icon-document-copy', btnName: '复制' }) }
      // if (contextListCalc.includes('paste')) { this.contextMenuData.menuList.push({ fnHandler: 'paste', icoName: 'el-icon-document-checked', btnName: '粘贴' }) }
      if (contextListCalc.includes('refresh')) { this.contextMenuData.menuList.push({ fnHandler: 'refresh', icoName: 'el-icon-refresh', btnName: '刷新' }) }
      if (contextListCalc.includes('download')) { this.contextMenuData.menuList.push({ fnHandler: 'download', icoName: 'el-icon-download', btnName: '下载' }) }
      if (contextListCalc.includes('del')) { this.contextMenuData.menuList.push({ fnHandler: 'del', icoName: 'el-icon-delete', btnName: '删除' }) }
      if (contextListCalc.includes('rename')) { this.contextMenuData.menuList.push({ fnHandler: 'rename', icoName: 'el-icon-edit-outline', btnName: '重命名' }) }
      if (contextListCalc.includes('move')) { this.contextMenuData.menuList.push({ fnHandler: 'move', icoName: 'el-icon-receiving', btnName: '移动' }) }
      if (contextListCalc.includes('upload')) { this.contextMenuData.menuList.push({ fnHandler: 'upload', icoName: 'el-icon-upload2', btnName: '上传文件' }) }
      if (contextListCalc.includes('createDir')) { this.contextMenuData.menuList.push({ fnHandler: 'createDir', icoName: 'el-icon-folder-add', btnName: '新建文件夹' }) }
      // 设置右键菜单位置
      let x = event.clientX
      let y = event.clientY
      this.contextMenuData.axis = {
        x, y
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../../../styles/mixin.scss";
  .file {
    width: 100%;
    height: 100%;
    .file-area {
      width: 100%;
      height: 100%;
      .file-item {
        padding: 5px 10px;
        .file-icon {
          i {
            font-size: 80px;
          }
        }
        .file-info {
          text-align: center;
          width: 80px;
          height: 20px;
          overflow: hidden;
          word-break: break-all;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .vue-drag-select {
        .select-wrapper {
          height: 100%;
          @include flex(wrap);
          .vue-drag-select-option {
          .item-self {
            border-radius: 3px;
          }
        }
        .selected-item {
          .item-self {
            background: rgba(179, 216, 255, 0.6);
          }
        }
      }
    }
  }
}
</style>
