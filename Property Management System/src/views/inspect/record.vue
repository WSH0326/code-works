<template>
  <div class="inspect-record-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:4px">
          <back-toindex></back-toindex>
        </span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:6px">
          巡检记录管理
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
        <el-input v-model="searchForm.keyword" placeholder="任务号/巡检区域/巡检人员" clearable class="search-input" @keyup.enter="handleQuery"></el-input>
        <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
        <el-button type="default" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 巡检记录表格 -->
    <el-table
      ref="recordTable"
      :data="recordList"
      border
      style="width: 100%;"
      class="record-table"
      :header-cell-style="{ backgroundColor: '#f5f7fa', fontWeight: 'normal' }"
      :cell-style="{ padding: '8px 0' }"
      empty-text="暂无巡检记录"
      :loading="loading"
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ (pageNum-1)*pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="taskNo" label="关联任务号" min-width="180" align="center" />
      <el-table-column prop="area" label="巡检区域" min-width="120" align="center" />
      <el-table-column prop="worker" label="巡检人员" min-width="110" align="center" />
      <el-table-column prop="inspectTime" label="巡检时间" min-width="160" align="center" />
      <el-table-column prop="result" label="巡检结果" width="110" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.result === '正常' ? 'success' : 'danger'"
            size="small"
          >
            {{ scope.row.result }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="problem" label="问题描述" min-width="200" align="center">
        <template slot-scope="scope">{{ scope.row.problem || "无" }}</template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-view"
            size="mini"
            @click="handleDetail(scope.row)"
            title="查看详情"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-download"
            size="mini"
            @click="handleExport(scope.row)"
            title="导出记录"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    
    <!-- 统计 -->
    <div class="stats-area">
      显示第 {{ total>0 ? (pageNum-1)*pageSize+1 : 0 }} 到 {{ total>0 ? Math.min(pageNum*pageSize,total) : 0 }} 条记录, 总共 {{ total }} 条记录
    </div>

    <!-- 分页 -->
    <pageoff-set></pageoff-set>

    <!-- 底部 -->
    <div class="footer">安居无忧物业管理平台</div>

    <!-- 详情弹窗 -->
    <el-dialog title="巡检记录详情" :visible.sync="detailDialog" width="550px">
      <el-form label-width="100px" :model="detailForm" disabled>
        <el-form-item label="关联任务号">
          <el-input :value="detailForm.taskNo" />
        </el-form-item>
        <el-form-item label="巡检区域">
          <el-input :value="detailForm.area" />
        </el-form-item>
        <el-form-item label="巡检人员">
          <el-input :value="detailForm.worker" />
        </el-form-item>
        <el-form-item label="巡检时间">
          <el-input :value="detailForm.inspectTime" />
        </el-form-item>
        <el-form-item label="巡检结果">
          <el-input :value="detailForm.result" />
        </el-form-item>
        <el-form-item label="问题描述">
          <el-input :value="detailForm.problem" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="处理建议">
          <el-input :value="detailForm.suggest" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="detailDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "InspectRecord",
  data() {
    return {
      loading: false,
      searchForm: { keyword: "" },
      detailDialog: false,
      detailForm: {},

      originList: [
        {
          id: 1,
          taskNo: "XJ202504010001",
          area: "1号楼楼道",
          worker: "李师傅",
          inspectTime: "2025-04-01 09:30:00",
          result: "正常",
          problem: "",
          suggest: "无异常，继续保持巡检频率"
        },
        {
          id: 2,
          taskNo: "XJ202504020003",
          area: "2号楼电梯",
          worker: "王师傅",
          inspectTime: "2025-04-02 15:00:00",
          result: "异常",
          problem: "2号楼1单元电梯门关闭卡顿，需维修",
          suggest: "联系电梯维修人员上门检修，暂时不影响使用"
        },
        {
          id: 3,
          taskNo: "XJ202504010002",
          area: "小区门禁设施",
          worker: "张师傅",
          inspectTime: "2025-04-01 10:00:00",
          result: "正常",
          problem: "",
          suggest: "门禁灵敏度正常，定期清洁即可"
        },
        {
          id: 4,
          taskNo: "XJ202504020004",
          area: "小区绿化区域",
          worker: "李师傅",
          inspectTime: "2025-04-02 14:30:00",
          result: "异常",
          problem: "部分绿植叶片发黄，缺水严重",
          suggest: "安排绿化人员及时浇水，检查土壤湿度"
        }
      ],
      recordList: [],
      pageNum: 1,
      pageSize: 4,
      total: 4
    };
  },
  mounted() {
    this.recordList = [...this.originList];
  },
  methods: {
    handleQuery() {
      this.loading = true;
      setTimeout(() => {
        const key = this.searchForm.keyword.trim();
        if (key) {
          this.recordList = this.originList.filter(item =>
            item.taskNo.includes(key) ||
            item.area.includes(key) ||
            item.worker.includes(key)
          );
        } else {
          this.recordList = [...this.originList];
        }
        this.loading = false;
      }, 300);
    },
    handleReset() {
      this.searchForm.keyword = "";
      this.recordList = [...this.originList];
    },
    handleRefresh() {
      this.loading = true;
      setTimeout(() => {
        this.recordList = [...this.originList];
        this.loading = false;
        this.$message.success("刷新成功");
      }, 300);
    },
    // 查看详情
    handleDetail(row) {
      this.detailForm = { ...row };
      this.detailDialog = true;
    },
    // 导出记录
    handleExport(row) {
      this.$message.success(`已导出【${row.taskNo}】巡检记录`);
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
.inspect-record-page {
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
      .search-input { width: 220px; }
    }
  }

  .record-table {
    margin: 0;
    --el-table-row-hover-bg-color: #f8fafc;
    .el-table__body tr:nth-child(even) { background: #fcfdfe; }
  }

  .stats-area { padding: 5px 0; font-size: 12px; color: #666; }
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