<template>
  <div class="dispatch-list-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:4px">
          <back-toindex></back-toindex>
        </span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:6px">
          派单管理
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
        <el-input v-model="searchForm.keyword" placeholder="工单号/业主/维修人员" clearable class="search-input" @keyup.enter="handleQuery"></el-input>
        <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
        <el-button type="default" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 派单表格 -->
    <el-table
      ref="dispatchTable"
      :data="dispatchList"
      border
      style="width: 100%;"
      class="dispatch-table"
      :header-cell-style="{ backgroundColor: '#f5f7fa', fontWeight: 'normal' }"
      :cell-style="{ padding: '8px 0' }"
      empty-text="暂无派单记录"
      :loading="loading"
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ (pageNum-1)*pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="repairNo" label="工单号" min-width="180" align="center" />
      <el-table-column prop="ownerName" label="业主姓名" min-width="100" align="center" />
      <el-table-column prop="houseNo" label="房号" min-width="100" align="center" />
      <el-table-column prop="repairType" label="报修类型" width="100" align="center">
        <template slot-scope="scope">
          <el-tag type="info" size="small">{{ scope.row.repairType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="worker" label="维修人员" min-width="110" align="center" />
      <el-table-column prop="status" label="派单状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '待接单' ? 'warning'
              : scope.row.status === '处理中' ? 'primary'
              : 'success'"
            size="small"
          >
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="dispatchTime" label="派单时间" min-width="160" align="center" />
      <el-table-column label="操作" width="160" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleAssign(scope.row)"
            title="分配人员"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            @click="handleFinish(scope.row)"
            title="完成工单"
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

    <!-- 派单弹窗 -->
    <el-dialog title="分配维修人员" :visible.sync="assignDialog" width="500px">
      <el-form label-width="80px">
        <el-form-item label="工单号">
          <el-input :value="currentRow.repairNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="业主">
          <el-input :value="currentRow.ownerName" disabled></el-input>
        </el-form-item>
        <el-form-item label="选择维修人员">
          <el-select v-model="selectWorker" placeholder="请选择人员" style="width:100%">
            <el-option label="李师傅" value="李师傅"></el-option>
            <el-option label="张师傅" value="张师傅"></el-option>
            <el-option label="王师傅" value="王师傅"></el-option>
            <el-option label="刘师傅" value="刘师傅"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="assignDialog = false">取消</el-button>
        <el-button type="primary" @click="saveAssign">确认派单</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DispatchList",
  data() {
    return {
      loading: false,
      searchForm: { keyword: "" },
      assignDialog: false,
      currentRow: {},
      selectWorker: "",
      repairId: "",
      currentOrder: null, 

      originList: [
        {
          id: 1,
          repairNo: "W202504010001",
          ownerName: "张三",
          houseNo: "1-1-101",
          repairType: "水电",
          worker: "待分配",
          status: "待接单",
          dispatchTime: "2025-04-01 09:30:00"
        },
        {
          id: 2,
          repairNo: "W202504010002",
          ownerName: "李四",
          houseNo: "1-2-201",
          repairType: "门禁",
          worker: "张师傅",
          status: "处理中",
          dispatchTime: "2025-04-01 10:15:00"
        },
        {
          id: 3,
          repairNo: "W202504020003",
          ownerName: "王五",
          houseNo: "2-1-302",
          repairType: "其他",
          worker: "王师傅",
          status: "已完成",
          dispatchTime: "2025-04-02 11:20:00"
        },
        {
          id: 4,
          repairNo: "W202504020004",
          ownerName: "赵六",
          houseNo: "2-3-501",
          repairType: "水电",
          worker: "待分配",
          status: "待接单",
          dispatchTime: "2025-04-02 16:00:00"
        }
      ],
      dispatchList: [],
      pageNum: 1,
      pageSize: 4,
      total: 4
    };
  },
   created() {
  // 接收上一页传来的 repairId
  this.repairId = this.$route.query.repairId;

  // 把原始数据给列表
  this.dispatchList = [...this.originList];

  // 有 id 就只保留这一条，其他全部不显示
  if (this.repairId) {
    this.dispatchList = this.originList.filter(item => {
      return item.id == this.repairId;
    });
  }

  // 更新总数
  this.total = this.dispatchList.length;
},
  mounted() {
  },
  methods: {
    handleQuery() {
      this.loading = true;
      setTimeout(() => {
        const key = this.searchForm.keyword.trim();
        if (key) {
          this.dispatchList = this.originList.filter(item =>
            item.repairNo.includes(key) ||
            item.ownerName.includes(key) ||
            item.worker.includes(key)
          );
        } else {
          this.dispatchList = [...this.originList];
        }
        this.loading = false;
      }, 300);
    },
    handleReset() {
      this.searchForm.keyword = "";
      this.dispatchList = [...this.originList];
    },
    handleRefresh() {
      this.loading = true;
      setTimeout(() => {
        this.dispatchList = [...this.originList];
        this.loading = false;
        this.$message.success("刷新成功");
      }, 300);
    },
    // 派单
    handleAssign(row) {
      this.currentRow = row;
      this.selectWorker = row.worker === "待分配" ? "" : row.worker;
      this.assignDialog = true;
    },
    saveAssign() {
      if (!this.selectWorker) {
        this.$message.warning("请选择维修人员");
        return;
      }
      const item = this.originList.find(x => x.id === this.currentRow.id);
      if (item) {
        item.worker = this.selectWorker;
        item.status = "处理中";
      }
      this.handleQuery();
      this.assignDialog = false;
      this.$message.success("派单成功");
    },
    // 完成工单
    handleFinish(row) {
      const item = this.originList.find(x => x.id === row.id);
      if (item) {
        item.status = "已完成";
        this.originList.splice(item, 1);
      }
      this.handleQuery();
      this.$message.success("工单已完成");
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
.dispatch-list-page {
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

    .operate-right {
      display: flex;
      gap: 8px;
      .search-input { width: 200px; }
    }
  }

  .dispatch-table {
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