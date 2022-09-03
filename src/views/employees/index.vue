<template>
  <div class="employees-container">
    <div class="app-container">
      <!-- 公共工具栏 -->
      <page-tools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>

        <template #right>
          <el-button
            type="warning"
            size="small"
            @click="$router.push('/import?type=user')"
          >excel导入</el-button>
          <el-button
            type="danger"
            size="small"
            @click="exportExcel"
          >excel导出</el-button>
          <el-button
            type="primary"
            size="small"
            @click="addEmployee"
          >新增员工</el-button>
        </template>
      </page-tools>

      <!-- 卡片 -->
      <el-card v-loading="isLoading" style="margin-top: 10px">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" :index="indexMethod" />
          <el-table-column label="头像" prop="staffPhoto">
            <template #default="{ row }">
              <img
                v-imerror="sui"
                :src="row.staffPhoto || defaultImg"
                alt=""
                class="avator"
                @click="openPhoto(row.staffPhoto)"
              >
            </template>
          </el-table-column>

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
            <template #default="{ row }">
              <!-- <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button> -->

              <!-- v-if="checkPermission('EMP_LOOK')" -->

              <!-- v-permission="'EMP_LOOK'" -->
              <el-button
                v-if="checkPermission('EMP_LOOK')"
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
              >查看</el-button>
              <el-button
                v-permission="'EMP_ROLE'"
                type="text"
                size="small"
                @click="edit(row.id)"
              >角色</el-button>
              <el-button
                v-permission="'EMP_DELETE'"
                type="text"
                size="small"
                @click="delEmployees(row.id)"
              >删除</el-button>
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
      <el-dialog
        :visible.sync="showCodeDialog"
        title="二维码"
        :close-on-click-modal="false"
        @close="closeCodeDialog"
      >
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>
      <AssignRole :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
    </div>
  </div>
</template>

<script>
import sui from '@/assets/common/bigUserHeader.png'
import { getUserROleListApi, delEmployeesApi } from '@/api/employees'
import empyess from '@/constant/employees'
import AssignRole from './components/assign-role'

import addEmpolyee from './components/add-employee.vue'

import { strainer } from '@/filters' // 引入自定义指令

import QrCode from 'qrcode' // 引入二维码组件
import { mapGetters } from 'vuex'
import check from '@/minxins/check'

// import { getDepartmentApi } from '@/api/department'

export default {
  name: 'Employees',
  components: {
    // 注册组件
    addEmpolyee,
    AssignRole
  },
  mixins: [check],
  data() {
    // 初始化数据
    return {
      page: 1,
      size: 10,
      total: 0,
      list: [],
      isLoading: false,

      hireType: empyess.hireType,

      showDialog: false, // 弹框默认关闭
      defaultImg:
        'https://img2.baidu.com/it/u=2203692359,101708973&fm=253&fmt=auto&app=138&f=PNG?w=401&h=401',
      sui,
      showCodeDialog: false, // 二维码碳层
      showRoleDialog: false,
      userId: ''
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    this.getUserROleList()
  },
  methods: {
    // 方法
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
    handleCurrentChange(val) {
      // 页码变化函数
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
    delEmployees(id) {
      // 删除
      this.$confirm('确定要删除吗？', '提示')
        .then(async (_) => {
          if (this.page > 1 && this.list.length === 1) {
            this.page--
          }
          const res = await delEmployeesApi(id)
          console.log(res)
          this.$message.success('删除成功!')
          this.getUserROleList()
        })
        .catch((_) => {})
    },
    addEmployee() {
      // 新增
      this.showDialog = true
    },
    async exportExcel() {
      // 先获取所有数据
      const {
        data: { rows }
      } = await getUserROleListApi(1, this.total)
      // console.log(res)
      const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]

      const headersArr = [
        '姓名',
        '手机号',
        '入职日期',
        '聘用形式',
        '转正日期',
        '工号',
        '部门'
      ]
      const headersRelations = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      const res = this.exportExcelList(rows, headersArr, headersRelations)
      const merges = ['A1:A2', 'B1:F1', 'G1:G2']
      import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: headersArr, // 表头 必填
          data: res, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
          multiHeader,
          merges
        })
      })
    },
    exportExcelList(rows, headersArr, headersRelations) {
      // 导出列表函数
      const list = []
      rows.forEach((item) => {
        // console.log(item)
        const thean = []
        headersArr.forEach((key) => {
          const english = headersRelations[key]
          let value = item[english]
          if (['timeOfEntry', 'correctionTime'].includes(english)) {
            // 如果是入职日期和聘用时间,那就用 时间格式转换 ,没有时间就给 空值
            value = value ? strainer(value) : ''
          }
          if ('formOfEmployment'.includes(english)) {
            // 找如果 id 和 值相同的话
            // 就赋值 hireType 的value 给 value
            const res = this.hireType.find((hyformat) => hyformat.id === value)
            value = res ? res.value : '未知'
          }
          // console.log(english)
          // console.log(value)
          thean.push(value)
        })
        list.push(thean)
      })
      return list
    },
    openPhoto(url) {
      // 点击头像打开二维码弹框
      if (!url) return
      this.showCodeDialog = true
      this.$nextTick(() => {
        // 如果这里 url 写的是网址, 就会跳转到对应网址 (二维码分享效果)
        QrCode.toCanvas(this.$refs.myCanvas, url)
      })
    },
    closeCodeDialog() {
      // 关闭二维码弹框
      this.showCodeDialog = false
    },
    edit(id) {
      this.showRoleDialog = true
      this.userId = id
    }
    // checkPermission(permission) {
    //   return this.roles?.points?.includes(permission)
    // }`
  }
}
</script>

<style lang="scss" scoped>
.avator {
  height: 70px;
  width: 70px;
  border-radius: 50%;
}
</style>
