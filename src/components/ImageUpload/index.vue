<template>
  <div>
    <el-upload list-type="picture-card" :on-remove="handleRemove" :limit="limit" :class="{disabled:isDisabled}" action="#" :file-list="fileList" :on-preview="preview">
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
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fileList: [
        { url: 'https://www.bing.com/th/id/OGC.cfa9aad90c9c26339be49f6da22d6c44?pid=1.7&rurl=https%3a%2f%2fpic1.zhimg.com%2f50%2fv2-cfa9aad90c9c26339be49f6da22d6c44_hd.gif%3fsource%3d1940ef5c&ehk=0beLbuk347uk4nz0FxnUi14WTzgGPuxQxewn4iPWTNE%3d' },
        { url: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.fhVjrV9uv3w7a1EVDrA7-wHaDW?w=318&h=158&c=7&r=0&o=5&dpr=1.25&pid=1.7' }
      ],

      showDialog: false, // 控制显示弹层
      imgUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    isDisabled() {
      return this.fileList.length >= this.limit
    }
  },
  methods: {
    preview(file) {
      // 这里应该弹出一个层 层里是点击的图片地址
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      // 第一种方法
      // this.fileList = [...fileList]

      // 第二种方法
      // this.fileList = this.fileList.filter(item => {
      //   return item.uid !== file.uid
      // })
      console.log(file)
      console.log(fileList)
    }

  }
}
</script>

<style lang="scss" scoped>
.disabled{
  ::v-deep{
    .el-upload{
      display: none;
    }
  }
}

</style>
