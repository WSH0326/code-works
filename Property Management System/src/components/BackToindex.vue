<template>
  <el-button
    type="text"
    icon="el-icon-menu"
    class="breadcrumb-btn"
    @click="$router.push('/index')"
  >
    首页
  </el-button>
</template>

<script>
export default {
  name: 'BackToindex'
}
</script>

<style scoped>
/* 让按钮和面包屑完全一样的样式 */
:deep(.breadcrumb-btn) {
  margin: 0;
  padding: 0 !important;
  font-size: 14px !important;
  color: #606266 !important;
  line-height: 1 !important;
}

:deep(.breadcrumb-btn:hover) {
  color: #1989fa !important;
}
</style>