<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card>
        <!-- 用了一个行列布局 -->
        <tree-tools :node-data="company" :is-show="true" />

        <!-- 树状图 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          default-expand-all
        >
          <!-- 作用域插槽 -->
          <template #default="{ data }">
            <!-- 当 el-row 放到其他标签中, 宽度是通过内容来撑开的 -->
            <tree-tools :node-data="data" @del_department="getDepartmentList" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>

</template>

<script>
import treeTools from './components/tree-tools.vue'

// 引入获取组织架构列表
import { getDepartmentApi } from '@/api/department'

import { transFromTreeList } from '@/utils/index'
export default {
  name: 'Departments',
  components: { treeTools },
  data() {
    return {
      departs: [

      ],
      defaultProps: {
        label: 'name'
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      const { data } = await getDepartmentApi()
      // console.log(res)
      this.company.name = data.companyName // 公司名赋值

      this.departs = transFromTreeList(data.depts, '') // 赋值给原数组
    }
    // transFromTreeList(list, val) {
    //   const arr = [] // 定义一个数组

    //   // 先找到所有一级标签
    //   list.forEach(item => {
    //     if (item.pid === val) {
    //       arr.push(item)
    //     }
    //   })
    //   console.log(arr)

    //   // 在通过子 pid 和 父 id 值相等进行筛选
    //   arr.forEach(item => {
    //     const children = list.filter(obj => obj.pid === item.id) || []
    //     item.children = children
    //   })
    //   return arr
    // }

    // --------------  第二种方法 递归 ---------------
    // transFromTreeList(list, searchVal) {
    //   const arr = []
    //   list.forEach(item => {
    //     if (item.pid === searchVal) { // 找到一级菜单
    //       const children = this.transFromTreeList(list, item.id) || []
    //       item.children = children
    //       arr.push(item)
    //     }
    //   })
    //   return arr
    // }

  }

}
</script>

<style lang="scss" scoped>
.el-tree {
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url("~@/assets/common/add-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before  {
      background: url("~@/assets/common/user-filling.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
</style>
