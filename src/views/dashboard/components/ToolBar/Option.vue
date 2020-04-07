<template>
  <div class="option">
    <el-button-group>
      <el-button type="" icon="el-icon-back" title="后退" @click="backward" :disabled="backwards.length <= 0 ? 'disabled' : false"></el-button>
      <el-button type="" icon="el-icon-right" title="前进" @click="forward" :disabled="forwards.length <= 0 ? 'disabled' : false"></el-button>
      <el-button type="" icon="el-icon-top" title="返回上一级" @click="upward" :disabled="!currentDir || String(currentDir.id) === '1' ? 'disabled' : false"></el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  computed: {
    currentDir: {
      get () {
        return this.$store.state.fastdfs.currentDir
      }
    },
    backwards: {
      get () {
        return this.$store.state.fastdfs.backwards
      }
    },
    forwards: {
      get () {
        return this.$store.state.fastdfs.forwards
      }
    }
  },
  methods: {
    /**
     * 获取目录
     * @param dirId 目录id
     * @param step 操作步骤：前进/后退/向上
     */
    getItemList (dirId, step) {
      if (!dirId) return
      const currentId = this.currentDir.id
      this.$store.dispatch('fastdfs/getDirById', dirId).then(res => {
        switch (step) {
          case 'backward':
            this.$store.dispatch('fastdfs/removeBackward')
            this.$store.dispatch('fastdfs/addForward', currentId)
            break
          case 'forward':
            this.$store.dispatch('fastdfs/removeForward')
            this.$store.dispatch('fastdfs/addBackward', currentId)
            break
          case 'upward':
            this.$store.dispatch('fastdfs/addBackward', currentId)
            break
          default:
            break
        }
      })
    },
    backward () {
      const dirId = this.backwards[this.backwards.length - 1]
      this.getItemList(dirId, 'backward')
    },
    forward () {
      const dirId = this.forwards[this.forwards.length - 1]
      this.getItemList(dirId, 'forward')
    },
    upward () {
      let dirId = null
      this.getItemList(dirId, 'upward')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../../styles/mixin.scss";
  .option {
    @include flex();
  }
</style>
