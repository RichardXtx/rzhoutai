<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <UploadExcel :on-success="handleSuccess" :before-upload="beforeUpload" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    beforeUpload(file) {
      return true
    },
    handleSuccess({ results, header }) {
      console.log(results)
      console.log(header)
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
