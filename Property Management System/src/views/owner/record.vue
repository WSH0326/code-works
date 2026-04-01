<template>
  <div class="checkin-list-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:4px;white-space: nowrap;">
          <back-toindex></back-toindex>
        </span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:6px;white-space: nowrap;">
          入住记录管理
          <el-tag type="success" size="mini">管理中</el-tag>
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 功能操作栏 -->
    <div class="operate-area">
      <div class="operate-left">
        <el-button 
          type="warning" 
          icon="el-icon-refresh" 
          plain
          class="refresh-btn"
          @click="handleRefresh"
        >刷新</el-button>
      </div>
      <div class="operate-right">
        <el-input 
          v-model="searchForm.keyword" 
          placeholder="业主姓名/房号" 
          class="search-input"
          clearable
          @keyup.enter="handleQuery"
        ></el-input>
        <el-button type="primary" @click="handleQuery" class="query-btn">查询</el-button>
        <el-button type="default" plain @click="handleReset" class="reset-btn">重置</el-button>
      </div>
    </div>

    <!-- 入住记录表格 -->
    <el-table
      ref="checkinTable"
      :data="checkinList"
      border
      style="width: 100%;"
      class="checkin-table"
      :header-cell-style="{ backgroundColor: '#f5f7fa', fontWeight: 'normal' }"
      :cell-style="{ padding: '8px 0' }"
      empty-text="暂无入住记录"
      :loading="loading"
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="checkinNo" label="入住单号" min-width="180" align="center" />
      <el-table-column prop="ownerName" label="业主姓名" min-width="100" align="center" />
      <el-table-column prop="houseNo" label="房号" min-width="100" align="center" />
      <el-table-column prop="checkinTime" label="入住时间" min-width="160" align="center" />
      <el-table-column prop="checkoutTime" label="退房时间" min-width="160" align="center" />
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag 
            :type="scope.row.status === '已入住' ? 'success' : (scope.row.status === '已搬离' ? 'info' : 'warning')" 
            size="small"
          >
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="handleEdit(scope.row)"
            title="编辑记录"
            style="background: #fa8c16; border-color: #fa8c16;"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-view"
            size="mini"
            circle
            @click="handleDetail(scope.row)"
            title="查看详情"
            style="background: #1890ff; border-color: #1890ff; margin-right:5px;"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pageoff-set></pageoff-set>

    <!-- 统计栏 -->
    <div class="stats-area">
      显示第 {{ total>0 ? (pageNum - 1) * pageSize + 1 : 0 }} 到 {{ total>0 ? Math.min(pageNum * pageSize, total) : 0 }} 条记录, 总共 {{ total }} 条记录
    </div>

    <!-- 底部版权 -->
    <div class="footer">安居无忧物业管理平台</div>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑入住记录" :visible.sync="editDialogVisible" width="520px">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="入住单号">
          <el-input v-model="editForm.checkinNo" disabled />
        </el-form-item>
        <el-form-item label="业主姓名">
          <el-input v-model="editForm.ownerName" />
        </el-form-item>
        <el-form-item label="房号">
          <el-input v-model="editForm.houseNo" />
        </el-form-item>
        <el-form-item label="入住状态">
          <el-radio-group v-model="editForm.status" @change="handleStatusChange">
            <el-radio label="已入住">已入住</el-radio>
            <el-radio label="已搬离">已搬离</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 已搬离时显示搬离时间 -->
    <el-form-item label="搬离时间" v-show="editForm.status === '已搬离'">
      <el-date-picker
        v-model="editForm.checkoutTime"
        type="datetime"
        placeholder="请选择搬离时间"
        style="width:100%"
      ></el-date-picker>
    </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpdate">保存修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CheckinList",
  data() {
    return {
      loading: false,
      searchForm: { keyword: "" },
      // 原始数据（用于还原）
      originList: [
        { id: 1, checkinNo: "IN202504010001", ownerName: "张三", houseNo: "1-1-101", checkinTime: "2025-04-01 08:30:22", status: "已入住" },
        { id: 2, checkinNo: "IN202504010002", ownerName: "李四", houseNo: "1-2-201", checkinTime: "2025-04-01 09:12:11", checkoutTime: "2025-04-15 10:30:00", status: "已搬离" },
        { id: 3, checkinNo: "IN202504020003", ownerName: "王五", houseNo: "2-1-302", checkinTime: "2025-04-02 10:20:15", checkoutTime: "", status: "已入住" },
        { id: 4, checkinNo: "IN202504020004", ownerName: "赵六", houseNo: "2-3-501", checkinTime: "2025-04-02 16:40:33", checkoutTime: "2025-04-25 14:20:00", status: "已搬离" }
      ],
      checkinList: [],
      pageNum: 1,
      pageSize: 4,
      total: 4,
      editDialogVisible: false,
      editForm: {
      checkinNo: '',
      ownerName: '',
      houseNo: '',
      checkinTime: '',
      checkoutTime: '',
      status: '已入住'
      },
      currentId: null,
      leaveTime:''
    };
  },
  mounted() {
    this.checkinList = [...this.originList];
  },
  methods: {
    // 真实搜索
    handleQuery() {
      this.loading = true;
      setTimeout(() => {
        const key = this.searchForm.keyword.trim();
        if (key) {
          this.checkinList = this.originList.filter(item =>
            item.ownerName.includes(key) || item.houseNo.includes(key)
          );
          this.$message.info(`搜索：${key}`);
        } else {
          this.checkinList = [...this.originList];
        }
        this.total = this.checkinList.length;
        this.loading = false;
      }, 300);
    },
    // 重置
    handleReset() {
      this.searchForm.keyword = "";
      this.handleQuery();
    },
    // 刷新
    handleRefresh() {
      this.loading = true;
      setTimeout(() => {
        this.checkinList = [...this.originList];
        this.total = this.checkinList.length;
        this.loading = false;
        this.$message.success("刷新成功");
      }, 300);
    },
    // 状态切换时自动填时间
    handleStatusChange(val) {
  if (val === '已搬离') {
       this.editForm.checkoutTime = new Date().toLocaleString()
  } else {
    this.editForm.checkinTime = new Date().toLocaleString()
  }
},
    // 详情
    handleDetail(row) {
      this.$message.info(`入住单号：${row.checkinNo} | 业主：${row.ownerName}`);
    },
    // 编辑
    handleEdit(row) {
      this.currentId = row.id;
      // 不覆盖整个 editForm，只赋值
      this.editForm = {
    checkinNo: row.checkinNo || '',
    ownerName: row.ownerName || '',
    houseNo: row.houseNo || '',
    checkinTime: row.checkinTime || '',
    checkoutTime: row.checkoutTime || '',
    status: row.status || '已入住'
  }
      this.editDialogVisible = true;
    },
    // 保存修改
    handleUpdate() {
      const index = this.originList.findIndex(x => x.id === this.currentId);
      this.originList[index] = { ...this.editForm };
      this.handleQuery();
      this.editDialogVisible = false;
      this.$message.success("修改成功");
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.checkin-list-page {
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

  .checkin-table {
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