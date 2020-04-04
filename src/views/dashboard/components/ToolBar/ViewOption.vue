<template>
  <div class="view-option">
    <el-button-group>
      <el-button type="" icon="el-icon-menu" title="平铺"></el-button>
      <el-button type="" icon="el-icon-notebook-2" title="列表"></el-button>
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
  .view-option {
    @include flex();
  }
</style>
