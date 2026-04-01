<template>
  <div class="order-list-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:4px">
          <back-toindex></back-toindex>
        </span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:6px">
          缴费订单管理
          <el-tag type="success" size="mini">管理中</el-tag>
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 功能栏 -->
    <div class="operate-area">
      <div class="operate-left">
        <el-button type="warning" icon="el-icon-refresh" plain size="small" @click="handleRefresh">刷新</el-button>
      </div>
      <div class="operate-right">
        <el-input v-model="searchForm.keyword" placeholder="订单号/业主姓名" clearable class="search-input" @keyup.enter="handleQuery"></el-input>
        <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
        <el-button type="default" plain size="small" @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 订单表格 -->
    <el-table
      ref="orderTable"
      :data="orderList"
      border
      style="width: 100%;"
      class="order-table"
      :header-cell-style="{ backgroundColor: '#f5f7fa', fontWeight: 'normal' }"
      :cell-style="{ padding: '8px 0' }"
      empty-text="暂无缴费订单"
      :loading="loading"
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ (pageNum-1)*pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="orderNo" label="订单号" min-width="180" align="center" />
      <el-table-column prop="ownerName" label="业主姓名" min-width="100" align="center" />
      <el-table-column prop="houseNo" label="房号" min-width="100" align="center" />
      <el-table-column prop="amount" label="缴费金额" width="110" align="center">
        <template slot-scope="scope">¥{{ scope.row.amount }}</template>
      </el-table-column>
      <el-table-column prop="status" label="支付状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '已支付' ? 'success' : 'warning'" size="small">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="160" align="center" />
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
  name: "OrderList",
  data() {
    return {
      loading: false,
      searchForm: { keyword: "" },
      orderList: [
        { id: 1, orderNo: "P202504010001", ownerName: "张三", houseNo: "1-1-101", amount: "260.00", status: "已支付", createTime: "2025-04-01 08:30:22" },
        { id: 2, orderNo: "P202504010002", ownerName: "李四", houseNo: "1-2-201", amount: "280.00", status: "已支付", createTime: "2025-04-01 09:12:11" },
        { id: 3, orderNo: "P202504020003", ownerName: "王五", houseNo: "2-1-302", amount: "260.00", status: "待支付", createTime: "2025-04-02 10:20:15" },
        { id: 4, orderNo: "P202504020004", ownerName: "赵六", houseNo: "2-3-501", amount: "280.00", status: "已支付", createTime: "2025-04-02 16:40:33" },
      ],
      pageNum: 1,
      pageSize: 4,
      total: 4,
    };
  },
  methods: {
    // 真实搜索
handleQuery() {
  this.loading = true;
  setTimeout(() => {
    const originList = this.$options.data().orderList;
    const keyword = this.searchForm.keyword.trim();
    if (keyword) {
      // 模糊搜索
      this.orderList = originList.filter(item => {
        return (
          item.ownerName.includes(keyword) ||
          item.orderNo.includes(keyword)
        );
      });
    } else {
      // 空关键词显示全部
      this.orderList = [...originList];
    }
    this.loading = false;
  }, 300);
},

// 重置搜索
handleReset() {
  this.searchForm.keyword = "";
  this.handleQuery();
},

// 刷新
handleRefresh() {
  this.loading = true;
  setTimeout(() => {
    this.orderList = [...this.orderList]; // 恢复原始数据
    this.searchForm.keyword = ""; // 清空搜索框
    this.loading = false;
    this.$message.success("刷新成功");
  }, 400);
},

// 每页条数改变
handleSizeChange(val) {
  this.pageSize = val;
  this.handleQuery(); // 切换条数 → 重新查询
},

// 页码改变
handleCurrentChange(val) {
  this.pageNum = val;
  this.handleQuery(); // 切换页码 → 重新查询
},
  },
};
</script>

<style lang="scss" scoped>
.order-list-page {
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

  .operate-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    flex-wrap: wrap;
    gap: 10px;

    .operate-right {
      display: flex;
      gap: 8px;
      .search-input { width: 180px; }
    }
  }

  .order-table {
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