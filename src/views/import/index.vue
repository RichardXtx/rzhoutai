<template>
  <div>
    <span>员工导入</span>
    <upload-excel :on-success="handleSuccess" />
  </div>
</template>

<script>
import { bachEmployeesApi } from '@/api/employees'

export default {
  name: 'Import',
  computed: {
    type() {
      return this.$route.query.type
    }
  },
  methods: {
    async handleSuccess({ results, header }) {
      // console.log(results)
      // console.log(header)

      if (this.type === 'user') {
        this.bachEmployees(results)
      }
    },
    formatExcelDate(numb, format) { // 处理事件函数
      const time = new Date((numb) * 24 * 3600000 + 1) // 毫秒
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    },
    async  bachEmployees(results) {
      const userRelations = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber'
      }
      const list = []
      results.forEach((item) => {
        const obj = {}
        for (const key in item) {
          const englishKey = userRelations[key]

          if (['timeOfEntry', 'correctionTime'].includes(englishKey)) {
            obj[englishKey] = this.formatExcelDate(item[key], '-')
          } else {
            obj[englishKey] = item[key]
          }
        }
        list.push(obj)
      })
      await bachEmployeesApi(list)
      // console.log(res)
      this.$router.back()
    }
  }
}
</script>

<style>
</style>
