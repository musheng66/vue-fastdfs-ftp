<template>
  <div class="option">
    <el-button-group>
      <el-button type="" icon="el-icon-back" title="后退" @click="backward" :disabled="backwards.length <= 0 ? 'disabled' : false"></el-button>
      <el-button type="" icon="el-icon-right" title="前进" @click="forward" :disabled="forwards.length <= 0 ? 'disabled' : false"></el-button>
      <el-button type="" icon="el-icon-top" title="返回上一级" @click="upward" :disabled="String(currentDirId) === '0' ? 'disabled' : false"></el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  computed: {
    currentDirId: {
      get () {
        return this.$store.state.fastdfs.currentDirId
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
    getItemList (dirId) {
      this.$store.dispatch('fastdfs/getDirById', dirId).then(res => {
        this.$store.dispatch('fastdfs/setCurrentDirId', dirId)
      })
    },
    backward () {
      const dirId = this.backwards[this.backwards.length - 1]
      this.getItemList(dirId)
      this.$store.dispatch('fastdfs/removeBackward')
      this.$store.dispatch('fastdfs/addForward', dirId)
    },
    forward () {
      const dirId = this.forwards[this.forwards.length - 1]
      this.getItemList(dirId)
      this.$store.dispatch('fastdfs/removeForward')
      this.$store.dispatch('fastdfs/addBackward', dirId)
    },
    upward () {

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
