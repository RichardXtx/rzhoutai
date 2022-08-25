<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 左侧 -->
          <el-tab-pane label="角色管理">
            <!-- 按钮 -->
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
            >新增角色</el-button>
            <!-- 表格 -->
            <el-table :data="roleList">
              <el-table-column label="序号" width="100" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="公司信息">
            <!-- 公司信息 -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getAllroleListApi } from '@/api/role'
export default {
  data() {
    return {
      page: 1,
      pagesize: 10,
      roleList: [], // 要渲染的表单
      total: 0

    }
  },
  created() {
    this.getAllroleList()
  },
  methods: {
    async  getAllroleList() {
      const { data: { rows, total }} = await getAllroleListApi(this.page, this.pagesize)
      this.roleList = rows
      // console.log(this.roleList)
      this.total = total
    }
  }

}
</script>

<style>

</style>
