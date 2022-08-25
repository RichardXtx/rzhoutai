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

            <!-- 分页 -->
            <div class="fy">
              <el-pagination
                :current-page="page"
                :page-sizes="[1, 2, 3, 4, 5]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
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
      pagesize: 3,
      roleList: [], // 要渲染的表单
      total: 0
    }
  },
  created() {
    this.getAllroleList()
  },
  methods: {
    async getAllroleList() {
      // 获取角色列表
      const {
        data: { rows, total }
      } = await getAllroleListApi(this.page, this.pagesize)
      this.roleList = rows
      // console.log(this.roleList)
      this.total = total
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getAllroleList()

      // 因为点击每页 页容量 的时候, 第一次请求的时候页码并没有改变重置为一
      // 会造成 白屏的情况
      this.page = 1
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.getAllroleList()
    }
  }
}
</script>

<style lang="scss" scoped>
.fy {
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>
