<template>
  <div>
    <el-upload list-type="picture-card" action="#" :file-list="fileList" :on-preview="preview">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog width="600px" top="8vh" title="图片预览" :visible.sync="showDialog">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      fileList: [
        { url: 'https://www.bing.com/th/id/OGC.cfa9aad90c9c26339be49f6da22d6c44?pid=1.7&rurl=https%3a%2f%2fpic1.zhimg.com%2f50%2fv2-cfa9aad90c9c26339be49f6da22d6c44_hd.gif%3fsource%3d1940ef5c&ehk=0beLbuk347uk4nz0FxnUi14WTzgGPuxQxewn4iPWTNE%3d' },
        { url: 'https://www.bing.com/th/id/OGC.324e24ed9cefc6499fc6011d6477ebdb?pid=1.7&rurl=https%3a%2f%2fimg.zcool.cn%2fcommunity%2f01441c5d11eb3ba801205e4bf28d34.gif&ehk=MLADu5BZ%2fxyRYGUznJaFSsProYKcRle0PqZRdSN6fQ0%3d' }
      ],

      showDialog: false, // 控制显示弹层
      imgUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    preview(file) {
      // 这里应该弹出一个层 层里是点击的图片地址
      this.imgUrl = file.url
      this.showDialog = true
    }

  }
}
</script>
