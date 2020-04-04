<template>
  <div class="option">
    <el-button-group>
      <el-button type="" icon="el-icon-back" title="后退"></el-button>
      <el-button type="" icon="el-icon-right" title="前进"></el-button>
      <el-button type="" icon="el-icon-top" title="返回上一级"></el-button>
    </el-button-group>
  </div>
</template>

<script>

export default {
  components: { }
}
</script>

<style lang="scss" scoped>
  @import "../../../../styles/mixin.scss";
  .option {
    @include flex();
  }
</style>
