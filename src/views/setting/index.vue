<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card v-loading="loading">
        <el-tabs>
          <!-- 左侧 -->
          <el-tab-pane label="角色管理">
            <!-- 按钮 -->
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="addRole"
            >新增角色</el-button>
            <!-- 表格 -->
            <el-table :data="roleList">
              <el-table-column label="序号" width="100" type="index" :index="indexMethod" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
                </template>
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

      <!-- 弹框 -->
      <el-dialog title="添加数据" :visible="showDialog" @close="closeDialog">

        <el-form ref="roleForm" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="form.description" placeholder="请输入角色描述" />
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </template></el-dialog>
    </div>
  </div>
</template>
<script>
import { getAllroleListApi, delRoleListApi, addRoleListApi } from '@/api/role'

export default {
  data() {
    return {
      page: 1,
      pagesize: 3,
      roleList: [], // 要渲染的表单
      total: 0, // 总页数

      loading: false, // 加载默认值

      showDialog: false, // 是否展示表单
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created() {
    this.getAllroleList()
  },
  methods: {
    async getAllroleList() { // 获取角色列表
      this.loading = true
      const {
        data: { rows, total }
      } = await getAllroleListApi(this.page, this.pagesize)
      this.roleList = rows
      // console.log(this.roleList)
      this.total = total
      this.loading = false
    },
    handleSizeChange(val) { // 点击页容量
      // console.log(`每页 ${val} 条`)
      this.pagesize = val

      // 因为点击每页 页容量 的时候, 第一次请求的时候页码并没有改变重置为一
      // 会造成 白屏的情况
      this.page = 1

      this.getAllroleList()
    },
    handleCurrentChange(val) { // 点击page
      // console.log(`当前页: ${val}`)
      this.page = val
      this.getAllroleList()
    },
    indexMethod(index) {
      // 前几页的数据加上 index +1
      // 前几页的数据 (前几页的数据 * pagesize)

      // 因为 index 为 0
      return (this.page - 1) * this.pagesize + index + 1
    },
    delRole(id) { // 删除
      // console.log(id)
      this.$confirm('你确定要删除吗?', '提示').then(async _ => {
        await delRoleListApi(id)

        // 只有当页码大于1 和 当前的 页码中所存在的数据长度为1 的时候触发事件
        if (this.page > 1 && this.roleList.length === 1) {
          this.page--
        }
        this.$message.success('删除成功')

        this.getAllroleList()
      }).catch(_ => {})
    },
    closeDialog() { // 关闭表单
      this.showDialog = false
      this.$refs.roleForm.resetFields() // 重置双向绑定的数据
      this.form = {
        name: '',
        description: ''
      }
    },
    addRole() { // 点击添加按钮 打开表单
      this.showDialog = true
    },
    submit() { // 确定事件
      this.$refs.roleForm.validate(async val => {
        if (!val) return
        const res = await addRoleListApi(this.form)
        console.log(res)
        this.$message.success('添加成功!')
        this.getAllroleList()
        this.closeDialog()
      })
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
