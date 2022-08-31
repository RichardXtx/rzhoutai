<template>
  <div>
    <el-upload
      :http-request="handleRequest"
      list-type="picture-card"
      :on-remove="handleRemove"
      :limit="limit"
      :class="{ disabled: isDisabled }"
      action="#"
      :file-list="fileList"
      :on-preview="preview"
      :on-change="handleChange"
      :before-upload="handleBeforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      width="600px"
      top="8vh"
      title="图片预览"
      :visible.sync="showDialog"
    >
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
        {
          url: 'https://www.bing.com/th/id/OGC.cfa9aad90c9c26339be49f6da22d6c44?pid=1.7&rurl=https%3a%2f%2fpic1.zhimg.com%2f50%2fv2-cfa9aad90c9c26339be49f6da22d6c44_hd.gif%3fsource%3d1940ef5c&ehk=0beLbuk347uk4nz0FxnUi14WTzgGPuxQxewn4iPWTNE%3d'
        },
        {
          url: 'https://www.bing.com/th/id/OGC.e4846a5d421a2f83e4ed34fb7a177fcf?pid=1.7&rurl=https%3a%2f%2fbbsfiles.vivo.com.cn%2fvivobbs%2fattachment%2fforum%2f201304%2f04%2f150624khhset6qk89qlqkh.gif&ehk=v8Y1Rn92AeExlVi0y8TkqRTzavhcChLhwil3xTaWtTk%3d'
        }
      ],

      showDialog: false, // 控制显示弹层
      imgUrl: ''
    }
  },
  computed: {
    ...mapGetters(['name']),
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
    handleRemove(file, fileList) { // 删除
      // 第一种方法
      // this.fileList = [...fileList]

      // this.fileList = JSON.parse(JSON.stringify(fileList))

      // 第二种方法
      this.fileList = this.fileList.filter((item) => {
        return item.uid !== file.uid
      })
      // console.log(file)
      // console.log(fileList)
    },
    handleRequest(obj) { // 自定义上传
      // console.dir(obj)
    },
    handleChange(file, fileList) { // 上传图片改变
      this.fileList = [...fileList]
      // console.log(fileList)
    },
    handleBeforeUpload(file) {
      const imgType = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png', 'image/jpg']
      if (!imgType.includes(file.type)) {
        this.$message.error('图片格式不正确!')
        return false
      }

      if (file.size / 1024 / 1024 > 2) {
        this.$message.error('图片大小不能超过2M')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  ::v-deep {
    .el-upload {
      display: none;
    }
  }
}
</style>
