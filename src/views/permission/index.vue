<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button
            type="primary"
            size="small"
            @click="addShowDialog(1,'0')"
          >添加权限</el-button>
        </div>
        <el-table border :data="permissionList" default-expand-all row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button v-if="row.type===1" size="small" type="text" @click="addShowDialog(2,row.id)">添加权限点</el-button>
              <el-button size="small" type="text">查看</el-button>
              <el-button size="small" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 弹框 -->
      <!-- 新增编辑的弹层 -->
      <el-dialog
        :visible="showDialog"
        title="弹层标题"
        :close-on-click-modal="false"
        @close="closeDialog"
      >
        <!-- 表单内容 -->
        <el-form label-width="100px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="权限启用">
            <el-switch
              v-model="formData.enVisible"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
            >
              /> </el-switch></el-form-item>
        </el-form>

        <template #footer>
          <div style="text-align: right">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="addPermission">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionListApi, addPermissionApi } from '@/api/permission'

import { transFromTreeList } from '@/utils'
export default {
  name: 'Permission',
  data() {
    return {
      permissionList: [],
      showDialog: false,
      formData: {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() { // 请求列表
      const { data } = await getPermissionListApi()
      // console.log(res)
      this.permissionList = transFromTreeList(data, '0')
      // console.log(data)
    },
    addShowDialog(type, pid) { // 添加弹框
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = pid
    },
    closeDialog() { // 关闭弹框
      this.showDialog = false
      this.formData = {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      }
    },
    async addPermission() {
      await addPermissionApi(this.formData)
      // console.log(res)
      this.$message.success('添加权限成功!')
      this.getPermissionList()
      this.closeDialog()
    }
  }
}
</script>
