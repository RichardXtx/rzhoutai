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
    handleRemove(file, fileList) {
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
    handleRequest(obj) {
      // console.log(obj)
    },
    handleChange(file, fileList) {
      this.fileList = [...fileList]
      console.log(fileList)
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
