<template>
  <el-dialog :title="showTitle" :visible="showDialog" close-on-click-modal @open="openDialog" @close="closeDialog">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->

    <!-- 匿名插槽 -->
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in employeesList" :key="item.id" :value="item.username" :label="item.username" />

        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <div slot="footer">
      <el-button type="primary" size="small" @click="submit">确定</el-button>
      <el-button size="small" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getUserEasyListApi } from '@/api/employees'

import { getDepartmentEasyListApi, geteditDepartmentApi, editDepartmentApi } from '@/api/department'
export default {

  name: 'AddDepts',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    departsList: {
      type: Array,
      default: _ => {}
    },
    nodeData: {
      type: Object,
      default: _ => {}
    }
  },
  data() {
    const nodeDataListFn = (rule, value, callback) => { // 部门名字重复校验
      let children = []
      if (this.form.id) { // 判断是否为编辑事件
        if (this.nodeData.name === value) { // 判断名字是否和自身的name是否相同,相同放行
        // 因为是编辑,所以可以不做修改
          callback()
          return
        } else { // 如果和同级的名字相同那就不放行
          children = this.departsList.filter(item => item.pid === this.nodeData.pid)
        }
      } else {
        children = this.departsList.filter(item => item.pid === this.nodeData.id)
      // console.log(children)
      }

      const isRepeat = children.some(item => item.name === value)
      isRepeat ? callback(new Error('部门已存在')) : callback()
    }
    const codeListFn = (rule, value, callback) => { // 编码重复校验
      if (this.form.id) { // 如果是编辑状态下,修改的code和输入的value属性一样
      // 那就通过
        if (this.nodeData.code === value) {
          callback()
          return
        }
      }

      const isRepeat = this.departsList.some(item => item.code === value)
      isRepeat ? callback(new Error('部门编码不能重复')) : callback()
    }

    return {
      form: { // form 表单初始值
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: { // 验证规则
        name: [
          { required: true, message: '请输入部门名称', trigger: ['blur', 'change'] },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: ['blur', 'change'] },
          { validator: nodeDataListFn, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: ['blur', 'change'] },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: ['blur', 'change'] },
          { validator: codeListFn, trigger: 'blur' }

        ],
        manager: [
          { required: true, message: '请选择部门负责人', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: ['blur', 'change'] }
        ]
      },
      employeesList: []
    }
  },
  computed: {

    showTitle() { // 判断 form 是否有 id ,有id 就为编辑,没有就是添加
      return this.form.id ? '编辑' : '添加子部门'
    }
  },

  methods: {
    closeDialog() {
      this.$emit('update:showDialog', false)
      this.$refs.form.resetFields()
      this.form = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍

      }
    },
    async getUserEasyList() {
      const { data } = await getUserEasyListApi()
      // console.log(data)
      this.employeesList = data
    },
    openDialog() {
      this.getUserEasyList()
    },
    submit() {
      this.$refs.form.validate(async valid => {
        // console.log(valid)
        if (!valid) return

        // 如果 form 表单中有数据
        // 就执行 编辑的接口
        // 如果没有, 就执行 添加数据的接口
        if (this.form.id) {
          await editDepartmentApi(this.form)
          // console.log(res)
          this.$message.success('修改成功')
        } else {
          await getDepartmentEasyListApi({
            ...this.form, pid: this.nodeData.id
          })
          // console.log(res)
          this.$message.success('添加成功!')
        }
        this.closeDialog()
        this.$emit('add-submit')
      })
    },
    async editDepartment() { // 获取部门详情
      const { data } = await geteditDepartmentApi(this.nodeData.id)
      this.form = data
    }

  }
}
</script>

<style>

</style>
