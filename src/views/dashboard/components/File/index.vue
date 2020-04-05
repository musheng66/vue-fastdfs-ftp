<template>
  <div class="file">
    <div class="file-area" @contextmenu="rightClick" data-target-type="container">
      <vue-drag-select v-model="selectedList" value-key="name" :item-width="100" :item-height="120" :item-margin="[10, 10, 10, 10]" ref="dragSelect">
        <template v-for="(item, index) in itemList">
          <drag-select-option :key="item.id" :value="item" :item-index="index" data-target-type="item" :data-item-type="item.type" :data-item-id="item.id" @dblclick.native="dbClick">
            <div class="item-self" :title="item.name">
              <div class="file-item">
                <div class="file-icon">
                  <i v-if="item.type === 'folder'" class="el-icon-folder"></i>
                  <i v-if="item.type === 'file'" class="el-icon-document"></i>
                </div>
                <div class="file-info">{{ item.name }}</div>
              </div>
            </div>
          </drag-select-option>
        </template>
      </vue-drag-select>
      <!-- 右键菜单 -->
      <vue-context-menu :context-menu-data="contextMenuData" @del="del" @rename="rename" @download="download" @upload="upload" @move="move" @addDir="addDir"></vue-context-menu>
    </div>
    <el-dialog title="重命名" :visible.sync="dialogVisibleRename" width="480px" append-to-body>
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleRename = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleRename = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 右键菜单
import VueContextMenu from '@/components/Contextmenu'
export default {
  components: {
    VueContextMenu
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
      dialogVisibleRename: false
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
    currentDirId: {
      get () {
        return this.$store.state.fastdfs.currentDirId
      }
    }
  },
  mounted () {
    this.getItemList(this.currentDirId !== '' ? this.currentDirId : '0')
  },
  methods: {
    /**
     * 获取目录
     * @param dirId 目录id
     * @param setWards 是否记录步骤
     */
    getItemList (dirId, setWards = true) {
      this.$store.dispatch('fastdfs/getDirById', dirId).then(res => {
        this.$store.dispatch('fastdfs/setCurrentDirId', dirId)
        if (setWards) this.$store.dispatch('fastdfs/addBackward', dirId)
      })
    },
    download () {

    },
    upload () {

    },
    move () {

    },
    addDir () {

    },
    del () {
      const item = this.selectedList[0]
      if (item.type === 'folder') this.delFolder(item)
      if (item.type === 'file') this.delFile(item)
    },
    delFile (item) {

    },
    delFolder (item) {

    },
    rename () {
      const item = this.selectedList[0]
      if (item.type === 'file') return // 暂不支持文件重命名
      this.dialogVisibleRename = true
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
      if (itemType === 'folder') this.getItemList(itemId)
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
              if (itemType === 'folder') contextListCalc.push('rename')
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
            if (itemType === 'folder') contextListCalc.push('rename')
            if (itemType === 'file') contextListCalc.push('download')
          }
          break
        case 'container':
          // 右键点击空白位置，清掉其余被选中项，允许上传文件，新建文件夹操作
          this.selectedList = []
          contextListCalc.push('upload')
          contextListCalc.push('addDir')
          break
        default:
          break
      }
      // if (contextListCalc.includes('copy')) { this.contextMenuData.menuList.push({ fnHandler: 'copy', icoName: 'el-icon-document-copy', btnName: '复制' }) }
      // if (contextListCalc.includes('paste')) { this.contextMenuData.menuList.push({ fnHandler: 'paste', icoName: 'el-icon-document-checked', btnName: '粘贴' }) }
      if (contextListCalc.includes('download')) { this.contextMenuData.menuList.push({ fnHandler: 'download', icoName: 'el-icon-download', btnName: '下载' }) }
      if (contextListCalc.includes('del')) { this.contextMenuData.menuList.push({ fnHandler: 'del', icoName: 'el-icon-delete', btnName: '删除' }) }
      if (contextListCalc.includes('rename')) { this.contextMenuData.menuList.push({ fnHandler: 'rename', icoName: 'el-icon-edit-outline', btnName: '重命名' }) }
      if (contextListCalc.includes('move')) { this.contextMenuData.menuList.push({ fnHandler: 'move', icoName: 'el-icon-receiving', btnName: '移动' }) }
      if (contextListCalc.includes('upload')) { this.contextMenuData.menuList.push({ fnHandler: 'upload', icoName: 'el-icon-upload2', btnName: '上传文件' }) }
      if (contextListCalc.includes('addDir')) { this.contextMenuData.menuList.push({ fnHandler: 'addDir', icoName: 'el-icon-folder-add', btnName: '新建文件夹' }) }
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
