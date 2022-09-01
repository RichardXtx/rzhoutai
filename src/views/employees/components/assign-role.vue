<template>
  <el-dialog class="assign-role" title="分配角色" :visible="showRoleDialog" :close-on-click-modal="false" @open="openRoleDialog" @close="closeRoleDialog">
    <!-- 这里准备复选框 -->
    <el-checkbox-group v-model="checkList" v-loading="isLoading">
      <el-checkbox v-for="item in rowList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>

    </el-checkbox-group>

    <template #footer>
      <el-button type="primary" size="small" @click="sumitAssign">确定</el-button>
      <el-button size="small" @click="closeRoleDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getAllroleListApi } from '@/api/role'
import { userInfoApi } from '@/api/user'
import { editAssignROleApi } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      checkList: [],
      rowList: [],
      isLoading: false
    }
  },
  methods: {
    closeRoleDialog() { // 关闭弹框事件
      this.$emit('update:showRoleDialog', false)
    },
    async getAllroleList() { // 获取用户角色列表
      const { data: { rows }} = await getAllroleListApi(1, 99999)
      //   console.log(res)
      this.rowList = rows
    },
    openRoleDialog() { // 打开弹框事件
      this.isLoading = true
      // Promise.all([(this.getAllroleList(),
      //   this.userInfo())=> {

      // }).then(_ => {
      //   this.isLoading = true
      // })
      Promise.all([this.userInfo(), this.getAllroleList()]).then(_ => {
        this.isLoading = false
      })
    },
    async userInfo() {
      const { data: { roleIds }} = await userInfoApi(this.userId)
      //   console.log(res)
      this.checkList = roleIds
    },
    async sumitAssign() { // 给员工分配角色
      await editAssignROleApi({
        id: this.userId,
        roleIds: this.checkList
      })
      // console.log(res)
      this.$message.success('分配角色成功!')
    }

  }
}
</script>
