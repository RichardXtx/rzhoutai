<template>
  <el-dialog title="新增部门" :visible="showDialog" close-on-click-modal @open="openDialog" @close="closeDialog">
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

import { getDepartmentEasyListApi } from '@/api/department'
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
    const nodeDataListFn = (rule, value, callback) => { // 名字重复校验
      const children = this.departsList.filter(item => item.pid === this.nodeData.id)
      // console.log(children)
      const isRepeat = children.some(item => item.name === value)
      isRepeat ? callback(new Error('部门已存在')) : callback()
    }
    const codeListFn = (rule, value, callback) => { // 编码重复校验
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

  methods: {
    closeDialog() {
      this.$emit('update:showDialog', false)
      this.$refs.form.resetFields()
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
        await getDepartmentEasyListApi({
          ...this.form, pid: this.nodeData.id
        })
        // console.log(res)
        this.$message.success('添加成功!')
        this.closeDialog()
        this.$emit('add-submit')
      })
    }

  }
}
</script>

<style>

</style>
