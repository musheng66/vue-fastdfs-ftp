<template>
  <div class="tool-bar">
    <operations class="option-area"></operations>
    <options class="option-area"></options>
    <path-info class="path-area"></path-info>
    <view-option class="view-option-area"></view-option>
  </div>
</template>

<script>
import Operations from './Operations'
import Option from './Option'
import ViewOption from './ViewOption'
import Path from './Path'
export default {
  components: {
    Options: Option,
    PathInfo: Path,
    Operations,
    ViewOption
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../../styles/mixin.scss";
  .tool-bar {
    @include flex();
    .option-area {
      padding: 0 5px;
    }
    .path-area {
      flex: 1;
      padding: 0 5px;
    }
    .view-option-area {
      padding: 0 5px;
    }
  }
</style>
