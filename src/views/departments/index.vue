<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card>
        <!-- 用了一个行列布局 -->
        <tree-tools :node-data="company" />

        <!-- 树状图 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
        >
          <!-- 作用域插槽 -->
          <template #default="{ data }">
            <!-- 当 el-row 放到其他标签中, 宽度是通过内容来撑开的 -->
            <tree-tools :node-data="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
export default {
  name: 'Departments',
  components: { treeTools },
  data() {
    return {
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      defaultProps: {
        label: 'name'
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }
    }
  }
}
</script>

<style>
</style>
