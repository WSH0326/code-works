<template>
  <div class="unpaid-list-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:4px">
          <back-toindex></back-toindex>
        </span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:6px">
          未缴提醒
          <el-tag type="warning" size="mini">待处理</el-tag>
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 功能栏 -->
    <div class="operate-area">
      <div class="operate-left">
        <el-button type="danger" icon="el-icon-bell" plain size="small" @click="handleRemindAll">一键提醒</el-button>
        <el-button type="warning" icon="el-icon-refresh" plain size="small" @click="handleRefresh">刷新</el-button>
      </div>
      <div class="operate-right">
        <el-input v-model="searchForm.keyword" placeholder="业主姓名/房号" clearable class="search-input" @keyup.enter="handleQuery"></el-input>
        <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
        <el-button type="default" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 未缴提醒表格 -->
    <el-table
      ref="unpaidTable"
      :data="unpaidList"
      border
      style="width: 100%;"
      class="unpaid-table"
      :header-cell-style="{ backgroundColor: '#f5f7fa', fontWeight: 'normal' }"
      :cell-style="{ padding: '8px 0' }"
      empty-text="暂无未缴记录"
      :loading="loading"
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ (pageNum-1)*pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="ownerName" label="业主姓名" min-width="100" align="center" />
      <el-table-column prop="houseNo" label="房号" min-width="100" align="center" />
      <el-table-column prop="month" label="欠费月份" min-width="120" align="center" />
      <el-table-column prop="amount" label="欠费金额" width="110" align="center">
        <template slot-scope="scope">¥{{ scope.row.amount }}</template>
      </el-table-column>
      <el-table-column prop="days" label="逾期天数" width="100" align="center">
        <template slot-scope="scope">
          <el-tag type="danger" size="small">{{ scope.row.days }} 天</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="缴费状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag type="warning" size="small">未缴费</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-bell"
            size="mini"
            @click="handleRemind(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            @click="handlePay(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pageoff-set></pageoff-set>

    <!-- 统计 -->
    <div class="stats-area">
      显示第 {{ total>0 ? (pageNum-1)*pageSize+1 : 0 }} 到 {{ total>0 ? Math.min(pageNum*pageSize,total) : 0 }} 条记录, 总共 {{ total }} 条记录
    </div>

    <!-- 底部 -->
    <div class="footer">安居无忧物业管理平台</div>
  </div>
</template>

<script>
export default {
  name: "UnpaidList",
  data() {
    return {
      loading: false,
      searchForm: { keyword: "" },
      unpaidList: [
        { id: 1, ownerName: "王五", houseNo: "2-1-302", month: "2025年04月", amount: "260.00", days: 12, status: "未缴费" },
        { id: 2, ownerName: "孙七", houseNo: "3-2-401", month: "2025年04月", amount: "280.00", days: 8, status: "未缴费" },
        { id: 3, ownerName: "周八", houseNo: "1-3-602", month: "2025年04月", amount: "260.00", days: 15, status: "未缴费" },
        { id: 4, ownerName: "吴九", houseNo: "2-2-201", month: "2025年04月", amount: "280.00", days: 5, status: "未缴费" },
      ],
      pageNum: 1,
      pageSize: 4,
      total: 4,
    };
  },
  methods: {
    // 查询
    handleQuery() {
      this.loading = true;
      setTimeout(() => {
        const key = this.searchForm.keyword.trim();
        if (key) {
          this.unpaidList = this.unpaidList.filter(item =>
            item.ownerName.includes(key) || item.houseNo.includes(key)
          );
        }
        this.loading = false;
      }, 300);
    },
    // 重置
    handleReset() {
      this.searchForm.keyword = "";
      this.unpaidList = [
        { id: 1, ownerName: "王五", houseNo: "2-1-302", month: "2025年04月", amount: "260.00", days: 12, status: "未缴费" },
        { id: 2, ownerName: "孙七", houseNo: "3-2-401", month: "2025年04月", amount: "280.00", days: 8, status: "未缴费" },
        { id: 3, ownerName: "周八", houseNo: "1-3-602", month: "2025年04月", amount: "260.00", days: 15, status: "未缴费" },
        { id: 4, ownerName: "吴九", houseNo: "2-2-201", month: "2025年04月", amount: "280.00", days: 5, status: "未缴费" },
      ];
      this.handleQuery();
    },
    // 刷新
    handleRefresh() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$message.success("刷新成功");
      }, 300);
    },
    // 单个提醒
    handleRemind(row) {
      this.$message.success(`已向【${row.ownerName}】发送缴费提醒！`);
    },
    // 一键提醒
    handleRemindAll() {
      this.$confirm("确定要向所有未缴业主发送提醒？", "提示", { type: "warning" })
        .then(() => {
          this.$message.success("已批量发送缴费提醒！");
        });
    },
    // 标记已缴
    handlePay(row) {
      this.unpaidList = this.unpaidList.filter(item => item.id !== row.id);
      this.total = this.unpaidList.length;
      this.$message.success(`【${row.ownerName}】已标记为已缴费`);
    },
    handleSizeChange(val) { this.pageSize = val; },
    handleCurrentChange(val) { this.pageNum = val; },
  },
};
</script>

<style lang="scss" scoped>
.unpaid-list-page {
  background: #fff;
  min-height: 100vh;
  font-size: 14px;
  color: #333;
  padding: 10px 15px 60px;
  position: relative;

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .header-right {
    position: absolute;
    right: 15px;
    top: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .operate-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    flex-wrap: wrap;
    gap: 10px;

    .operate-left {
      display: flex;
      gap: 10px;
    }

    .operate-right {
      display: flex;
      gap: 8px;
      .search-input { width: 180px; }
    }
  }

  .unpaid-table {
    margin: 0;
    --el-table-row-hover-bg-color: #f8fafc;
    .el-table__body tr:nth-child(even) { background: #fcfdfe; }
  }

  .stats-area {
    padding: 5px 0;
    font-size: 12px;
    color: #666;
  }

  .footer {
    text-align: center;
    font-size: 12px;
    color: #999;
    padding: 10px 0;
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>