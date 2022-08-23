<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col :span="20">
      <span>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <!-- 两个内容 -->
        <el-col :span="12">{{ nodeData.manager }}</el-col>
        <el-col :span="12">
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handelCommand">
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="!isShow" command="del">删除部门</el-dropdown-item>
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isShow" command="edit">修改部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartmentApi } from '@/api/department'
export default {
  props: {
    nodeData: {
      require: true, // 必传
      type: Object, // 对象
      default: _ => {} // 默认返回空对象
    },
    isShow: {
      type: Boolean,
      isShow: false
    }
  },
  methods: {
    handelCommand(cmd) {
      // console.log(cmd)
      if (cmd === 'del') {
        // console.log('删除按钮')
        this.$confirm('你确定要删除吗?', '提示').then(async _ => {
          await delDepartmentApi(this.nodeData.id)
          this.$message.success('删除成功')
          this.$emit('del_department')
        }).catch(_ => {})
      }
      if (cmd === 'add') {
        console.log('添加按钮')
        this.$emit('addShowDialog', this.nodeData)
      }
      if (cmd === 'edit') {
        console.log('修改按钮')
      }
    }
  }

}
</script>

<style>

</style>
