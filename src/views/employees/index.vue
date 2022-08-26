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
          <el-button type="primary" size="small" @click="addEmployee">新增员工</el-button>
        </template>
      </page-tools>

      <!-- 卡片 -->
      <el-card v-loading="isLoading" style="margin-top: 10px">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" :index="indexMethod" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            :formatter="chooseEmployment"
          />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template #default="{ row }">
              {{ row.timeOfEntry | strainer }}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template #default="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployees(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination
            :current-page="page"
            :page-size="size"
            :total="total"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>

      <!-- 弹框 -->
      <add-empolyee :show-dialog.sync="showDialog" />
    </div>
  </div>
</template>

<script>
import { getUserROleListApi, delEmployeesApi } from '@/api/employees'
import empyess from '@/constant/employees'

import addEmpolyee from './components/add-employee.vue'

export default {
  components: { // 注册组件
    addEmpolyee
  },
  data() { // 初始化数据
    return {
      page: 1,
      size: 2,
      total: 0,
      list: [],
      isLoading: false,

      hireType: empyess.hireType,

      showDialog: false // 弹框默认关闭
    }
  },
  created() {
    this.getUserROleList()
  },
  methods: { // 方法
    async getUserROleList() {
      // 获取员工列表
      this.isLoading = true
      const {
        data: { rows, total }
      } = await getUserROleListApi(this.page, this.size)
      // console.log(res)
      this.list = rows
      this.total = total
      this.isLoading = false
    },
    handleCurrentChange(val) { // 页码变化函数
      this.page = val
      this.getUserROleList()
    },
    indexMethod(index) {
      // 页码序号函数
      return (this.page - 1) * this.size + index + 1
    },
    chooseEmployment(row, column, cellValue, index) {
      // 修改聘用形式
      const obj = this.hireType.find((item) => item.id === +cellValue)
      return obj ? obj.value : '未知'
    },
    delEmployees(id) { // 删除
      this.$confirm('确定要删除吗？', '提示').then(async _ => {
        if (this.page > 1 && this.list.length === 1) {
          this.page--
        }
        const res = await delEmployeesApi(id)
        console.log(res)
        this.$message.success('删除成功!')
        this.getUserROleList()
      }).catch(_ => {})
    },
    addEmployee() { // 新增
      this.showDialog = true
    }
  }
}
</script>

<style>
</style>
