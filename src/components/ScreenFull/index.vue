<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- svg-icon组件, 配置icon-class属性, 配置成svg的文件名即可 -->
    <svg-icon

      :icon-class="fullscreen?'exit-fullscreen':'fullscreen'"
      class="fullscreen"
      @click="toggleFullScreen"
    />

  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  name: 'ScreenFull',
  data() {
    return {
      fullscreen: false // 默认不全屏
    }
  },
  methods: {
    toggleFullScreen() {
      // 查看是否支持全屏
      if (ScreenFull.isEnabled) {
        // 支持
        ScreenFull.toggle()
        this.fullscreen = !this.fullscreen
      } else {
        // 不支持
        this.$message.error('兄弟, 您的浏览器版本过低, 不支持全屏功能哦!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  width: 20px;
  height: 20px;
  fill: #fff;
  cursor: pointer;
}
</style>
