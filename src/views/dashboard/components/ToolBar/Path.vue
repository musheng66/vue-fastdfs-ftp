<template>
  <div class="path">
    <el-input placeholder="请输入内容" v-model="pathText" disabled="disabled">
      <template slot="prepend">ftp://</template>
      <el-button slot="append" icon="el-icon-refresh" title="刷新"></el-button>
    </el-input>
  </div>
</template>

<script>

export default {
  components: { },
  data () {
    return {
      pathText: '/t/e/s/t/xxx/'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../../styles/mixin.scss";
  .path {
  }
</style>
