<template>
  <div class="file">
    <div class="file-area" @contextmenu="rightClick" data-item-type="container">
      <vue-drag-select v-model="selectedList" value-key="name" :item-width="100" :item-height="120" :item-margin="[10, 10, 10, 10]" ref="dragSelect">
        <template v-for="(item, index) in itemList">
          <drag-select-option :key="item.id" :value="item" :item-index="index" data-item-type="item" :data-item-value="item.id">
            <div class="item-self" :title="item.name">
              <div class="file-item">
                <div class="file-icon">
                  <i v-if="item.type === 'dir'" class="el-icon-folder"></i>
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
          // },
          // {
          //   fnHandler: 'paste',
          //   icoName: 'el-icon-delete',
          //   btnName: '粘贴'
          // },
          {
            fnHandler: 'download',
            icoName: 'el-icon-download',
            btnName: '下载'
          },
          {
            fnHandler: 'del',
            icoName: 'el-icon-delete',
            btnName: '删除'
          },
          {
            fnHandler: 'rename',
            icoName: 'el-icon-edit-outline',
            btnName: '重命名'
          },
          {
            fnHandler: 'move',
            icoName: 'el-icon-document-copy',
            btnName: '移动到'
          },
          {
            fnHandler: 'upload',
            icoName: 'el-icon-upload2',
            btnName: '上传文件'
          },
          {
            fnHandler: 'addDir',
            icoName: 'el-icon-folder-add',
            btnName: '新建文件夹'
          }
        ]
      },
      selectedList: [],
      itemList: [
        { id: '1', name: 'test1.txt', type: 'file' },
        { id: '12', name: 'test1123123test112312312312321231232', type: 'dir' },
        { id: '13', name: 'test13', type: 'dir' },
        { id: '14', name: 'test14', type: 'dir' },
        { id: '15', name: 'test15', type: 'dir' },
        { id: '212', name: 'test212.dmg', type: 'file' },
        { id: '213', name: 'test213', type: 'dir' },
        { id: '214', name: 'test214', type: 'dir' },
        { id: '215', name: 'test215', type: 'dir' },
        { id: '2123', name: 'test2132', type: 'dir' },
        { id: '2124', name: 'test2124', type: 'dir' },
        { id: '2125', name: 'test2125', type: 'dir' },
        { id: '16', name: 'test16.pdf', type: 'file' }
      ]
    }
  },
  methods: {
    download () {

    },
    upload () {

    },
    move () {

    },
    addDir () {

    },
    del () {

    },
    rename () {

    },
    rightClick (event) {
      event.preventDefault()
      let targetType = ''
      let itemId = ''
      function getFtpItem (target) {
        if (target.dataset.itemType) {
          targetType = target.dataset.itemType
          if (target.dataset.itemType === 'item') {
            itemId = target.dataset.itemValue
          }
        } else {
          getFtpItem(target.parentElement)
        }
      }
      // 当前右键点击的item，可能是某文件夹或文件，也可能是空白位置，根据item不同可进行的操作不同
      getFtpItem(event.target)
      this.contextMenuData.menuList = []
      switch (targetType) {
        case 'item':
          // 判断item是否已经被选中
          let indexInSelected = this.selectedList.findIndex(item => {
            return item.id === itemId
          })
          if (indexInSelected >= 0) {
            // item已被选中，可进行批量删除操作、移动文件
            if (this.selectedList.length === 1) {
              this.contextMenuData.menuList = [
                {
                  fnHandler: 'download',
                  icoName: 'el-icon-download',
                  btnName: '下载'
                },
                {
                  fnHandler: 'del',
                  icoName: 'el-icon-delete',
                  btnName: '删除'
                },
                {
                  fnHandler: 'rename',
                  icoName: 'el-icon-edit-outline',
                  btnName: '重命名'
                },
                {
                  fnHandler: 'move',
                  icoName: 'el-icon-document-copy',
                  btnName: '移动到'
                }
              ]
            } else {
              this.contextMenuData.menuList = [
                {
                  fnHandler: 'del',
                  icoName: 'el-icon-delete',
                  btnName: '删除'
                },
                {
                  fnHandler: 'move',
                  icoName: 'el-icon-document-copy',
                  btnName: '移动到'
                }
              ]
            }
          } else {
            // item未被选中，清除其余被选中项，选中此item
            this.selectedList = []
            let indexData = this.itemList.findIndex(item => {
              return item.id === itemId
            })
            if (indexData >= 0) this.selectedList.push(this.itemList[indexData])
            // 允许删除、重命名、移动文件
            this.contextMenuData.menuList = [
              {
                fnHandler: 'download',
                icoName: 'el-icon-download',
                btnName: '下载'
              },
              {
                fnHandler: 'del',
                icoName: 'el-icon-delete',
                btnName: '删除'
              },
              {
                fnHandler: 'rename',
                icoName: 'el-icon-edit-outline',
                btnName: '重命名'
              },
              {
                fnHandler: 'move',
                icoName: 'el-icon-document-copy',
                btnName: '移动到'
              }
            ]
          }
          break
        case 'container':
          // 右键点击空白位置，清掉其余被选中项，允许上传文件，新建文件夹操作
          this.selectedList = []
          this.contextMenuData.menuList = [
            {
              fnHandler: 'upload',
              icoName: 'el-icon-upload2',
              btnName: '上传文件'
            },
            {
              fnHandler: 'addDir',
              icoName: 'el-icon-folder-add',
              btnName: '新建文件夹'
            }
          ]
          break
        default:
          break
      }
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
