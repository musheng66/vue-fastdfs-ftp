<template>
  <div class="context-menu">
    <ul :class="'vue-contextmenuName-' + contextMenuData.menuName" class="vue-contextmenu-listWrapper">
      <li
        v-for="item in contextMenuData.menuList"
        :key="item.btnName"
        class="context-menu-list">
        <button type="button" @click.stop="fnHandler(item)" :disabled="item.disabled" :class="{ 'disabled': item.disabled }">
          <i :class="item.icoName"></i>
          <span>{{ item.btnName }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    contextMenuData: {
      type: Object,
      required: false,
      default () {
        return {
          menuName: null,
          axis: {
            x: null,
            y: null
          },
          menuList: [
            {
              fnHandler: 'savedata',
              icoName: 'fa fa-home fa-fw',
              btnName: 'Save',
              disabled: false
            }
          ]
        }
      }
    },
    transferIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    'contextMenuData.axis' (val) {
      let x = val.x
      let y = val.y
      let innerWidth = window.innerWidth
      let innerHeight = window.innerHeight
      let _this = this
      let index = _this.transferIndex
      let menuName = 'vue-contextmenuName-' + _this.contextMenuData.menuName
      let menu = document.getElementsByClassName(menuName)[index]
      menu.style.display = 'block'
      let menuHeight = this.contextMenuData.menuList.length * 30
      let menuWidth = 150
      menu.style.top = (y + menuHeight > innerHeight ? innerHeight - menuHeight : y) + 'px'
      menu.style.left = (x + menuWidth > innerWidth ? innerWidth - menuWidth : x) + 'px'
      document.addEventListener('mouseup', function (e) {
        // 解决mac电脑在鼠标右键后会执行mouseup事件
        if (e.button === 0) {
          menu.style.display = 'none'
        }
      }, false)
    }
  },
  methods: {
    fnHandler (item) {
      this.$emit(item.fnHandler)
    },
    closeContextMenu () {
      let menuName = 'vue-contextmenuName-' + this.contextMenuData.menuName
      let menu = document.getElementsByClassName(menuName)[this.transferIndex]
      menu.style.display = 'none'
    }
  }
}
</script>
<style>
  .vue-contextmenu-listWrapper {
    box-shadow: 1px 1px 2px #666;
    display: none;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    border-radius: 5px;
    background: #fff;
    padding: 0;
  }
  .vue-contextmenu-listWrapper .context-menu-list {
    width: 150px;
    height: 32px;
    background: inherit;
    border-radius: inherit;
    text-decoration: none;
    list-style: none;
  }
  .vue-contextmenu-listWrapper .context-menu-list button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: block;
    outline: 0;
    border: 0;
    background: inherit;
    border-radius: inherit;
    line-height: 32px;
  }
  .vue-contextmenu-listWrapper .context-menu-list button.disabled {
    cursor: not-allowed;
  }
  .vue-contextmenu-listWrapper .context-menu-list button i,  .vue-contextmenu-listWrapper .context-menu-list button span {
    float: left;
  }
  .vue-contextmenu-listWrapper .context-menu-list button i{
    padding: 0 10px 0 10px;
    line-height: 32px;
  }
  .vue-contextmenu-listWrapper .context-menu-list button span {
    line-height: 32px;
  }
  .vue-contextmenu-listWrapper .context-menu-list button:hover {
    box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2);
    color: #ffffff;
    border-radius: 4px;
    background: -webkit-linear-gradient(to bottom, #5a6a76 , #2e3940); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to bottom, #5a6a76, #2e3940); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to bottom, #5a6a76, #2e3940); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom, #5a6a76 , #2e3940);
  }
</style>
