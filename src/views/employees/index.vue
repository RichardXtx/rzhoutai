<template>
  <div class="employees-container">
    <div class="app-container">
      <!-- 公共工具栏 -->
      <page-tools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>

        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </page-tools>

      <!-- 卡片 -->
      <el-card v-loading="isLoading" style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" :index="indexMethod" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" />
          <el-table-column label="操作" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination
            :current-page="page"
            :total="total"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserROleListApi } from '@/api/employees'
export default {
  data() {
    return {
      page: 1,
      size: 3,
      total: 0,
      list: [],
      isLoading: false
    }
  },
  created() {
    this.getUserROleList()
  },
  methods: {
    async getUserROleList() {
      this.isLoading = true
      const { data: { rows, total }} = await getUserROleListApi(this.page, this.size)
      // console.log(res)
      this.list = rows
      this.total = total
      this.isLoading = false
    },
    handleCurrentChange(val) {
      this.page = val
      this.getUserROleList()
    },
    indexMethod(index) {
      console.log(1)
      return (this.page - 1) * this.size + index + 1
    }
  }

}
</script>

<style>

</style>
