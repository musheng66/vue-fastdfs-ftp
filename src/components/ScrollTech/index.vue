<template>
  <div class="scroll-tech" ref="scrollTech">
    <img :src="srcM" alt="" class="rotate-content" ref="scrollContent">
  </div>
</template>
<script>
export default {
  name: 'ScrollTech',
  props: {
    srcM: {
      type: String,
      default: '/img/source/source119.svg'
    },
    widthM: {
      type: String,
      default: '600px'
    },
    heightM: {
      type: String,
      default: '600px'
    },
    zIndexM: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$refs.scrollTech.style.width = this.widthM
    this.$refs.scrollTech.style.height = this.heightM
    this.$refs.scrollTech.style.zIndex = this.zIndexM
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .scroll-tech {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*width: 600px;*/
    /*height: 600px;*/
    /*z-index: -1;*/
    /*width: 100%;*/
    /*height: 100%;*/
    .rotate-content {
      opacity: 0.3;
      width: 100%;
      height: 100%;
      animation: rotating 0s linear infinite;
      animation-duration: 20s;
    }
  }
</style>
