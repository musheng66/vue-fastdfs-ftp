<template>
  <span>
    <svg-icon icon-class="theme" @click="open"/>
    <el-dialog title="选择"
               :visible.sync="box"
               width="50%"
               append-to-body>
      <el-radio-group v-model="text" class="top-theme-list">
        <div class="top-theme-item" v-for="(item,index) in list" :key="index">
          <div class="theme-preview"></div>
          <div class="theme-name">
            <el-radio :label="item.value">{{item.name}}</el-radio>
          </div>
        </div>
      </el-radio-group>
    </el-dialog>
  </span>
</template>

<script>
import { setTheme } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      box: false,
      text: '',
      list: [
        {
          name: '默认主题',
          value: ''
        }, {
          name: '星空主题',
          value: 'theme-star'
        }, {
          name: '暗色主题',
          value: 'theme-dark'
        }, {
          name: '渐变主题',
          value: 'theme-gradual'
        }
      ]
    }
  },
  watch: {
    text: function (val) {
      this.$store.dispatch('settings/setThemeName', val).then(() => {
        setTheme(val)
      })
    }
  },
  computed: {
    ...mapGetters(['themeName'])
  },
  mounted () {
    this.text = this.themeName
    if (!this.text) {
      this.text = ''
    }
  },
  methods: {
    open () {
      this.box = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .top-theme-list {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    .top-theme-item {
      .theme-preview {
        width: 80px;
        height: 80px;
        border-radius: 5px;
      }
      .theme-name {
        padding-top: 10px;
      }
    }
    .top-theme-item:nth-of-type(1) {
      .theme-preview { background: linear-gradient(to left top, #32b7d6, #2591d4); }
    }
    .top-theme-item:nth-of-type(2) {
      .theme-preview {
        background-image: url("/img/bg/stars.jpg");
        background-size: 100% 100%;
      }
    }
    .top-theme-item:nth-of-type(3) {
      .theme-preview { background: #002253; }
    }
    .top-theme-item:nth-of-type(4) {
      .theme-preview { background: linear-gradient(120deg, #bc00e3, #4efffb); }
    }
  }
</style>
