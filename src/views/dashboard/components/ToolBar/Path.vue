<template>
  <div class="path">
    <el-input placeholder="当前路径" v-model="currentDir.path" disabled="disabled">
      <template slot="prepend">ftp://</template>
      <el-button slot="append" icon="el-icon-refresh" title="刷新" @click="refresh"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  components: { },
  computed: {
    currentDir: {
      get () {
        return this.$store.state.fastdfs.currentDir
      }
    }
  },
  methods: {
    refresh () {
      this.$store.dispatch('fastdfs/getDirById', this.currentDir.id).then()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../../styles/mixin.scss";
  .path {
  }
</style>
