<template>
  <!-- 全局通用分页组件 -->
  <div class="pagination-area">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[4, 8, 12, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 当前页
    currentPage: {
      type: Number,
      required: true
    },
    // 每页条数
    pageSize: {
      type: Number,
      required: true
    },
    // 总条数
    total: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('page-size-change', val)
    },
    handleCurrentChange(val) {
      this.$emit('page-current-change', val)
    }
  }
}
</script>

<style scoped>
.pagination-area { padding: 15px 0; text-align: right; }
</style>