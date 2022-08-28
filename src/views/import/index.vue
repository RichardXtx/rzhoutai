<template>
  <div>
    <span>员工导入</span>
    <upload-excel :on-success="handleSuccess" />
  </div>

</template>

<script>
export default {
  name: 'Import',
  methods: {
    handleSuccess({ results, header }) {
      console.log(results)
      console.log(header)
    }
  }
}
</script>

<style>

</style>
