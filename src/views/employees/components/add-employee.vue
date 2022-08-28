<template>
  <el-dialog
    title="新增员工"
    :visible="showDialog"
    top="8vh"
    @close="closeDialog"
    @click.native="closeBm"
  >
    <!-- 表单 -->
    <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="focusFn"
          @click.native.stop="transFromTree"
        />
        <el-tree v-if="isShowTree" v-loading="isLoading" :data="list" :props="{ label: 'name' }" @node-click="handleNodeClick" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-button class="closeDialog" @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartmentApi } from '@/api/department'

import { transFromTreeList } from '@/utils/index'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      list: [],
      rules: {
        username: [
          {
            required: true,
            message: '用户姓名不能为空',
            trigger: ['blur', 'change']
          },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位',
            trigger: ['blur', 'change']
          }
        ],
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: ['blur', 'change']
          }
        ],
        formOfEmployment: [
          {
            required: true,
            message: '聘用形式不能为空',
            trigger: ['blur', 'change']
          }
        ],
        workNumber: [
          {
            required: true,
            message: '工号不能为空',
            trigger: ['blur', 'change']
          }
        ],
        departmentName: [
          {
            required: true,
            message: '部门不能为空',
            trigger: ['blur', 'change']
          }
        ],
        timeOfEntry: [
          {
            required: true,
            message: '请选择入职时间',
            trigger: ['blur', 'change']
          }
        ]
      },
      isShowTree: false,
      isLoading: false
    }
  },
  methods: {
    closeDialog() {
      // 关闭弹框
      this.$emit('update:showDialog', false) // 通知父组件要关闭
      this.$refs.addForm.resetFields() // 关闭重置表单的 prop 绑定的值
    },
    submit() {
      // 确定事件
      this.$refs.addForm.validate((val) => {
        if (!val) return
      })
    },
    async transFromTree() { // 展示树状数据
      this.isShowTree = !this.isShowTree
      this.isLoading = true
      // 转换树形图
      const {
        data: { depts }
      } = await getDepartmentApi()
      //   console.log(res)
      this.list = transFromTreeList(depts, '')
      // console.log(this.list)
      this.isLoading = false
    },
    focusFn() { // 聚焦的时候
      this.isShowTree = true
      this.transFromTree()
    },
    handleNodeClick(data) { // 点击树状结构赋值
      // console.log(data)
      // 如果有子节点就不让赋值给input框
      if (data.children && data.children.length > 0) {
        return
      }
      this.formData.departmentName = data.name
      this.isShowTree = false
    },
    closeBm() { // 点击空白关闭
      this.isShowTree = false
    }
  }
}
</script>

<style>
</style>
