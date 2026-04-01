<template>
  <div class="inspect-task-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:4px">
          <back-toindex></back-toindex>
        </span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:6px">
          巡检任务管理
          <el-tag type="success" size="mini">管理中</el-tag>
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 功能栏 -->
    <div class="operate-area">
      <div class="operate-left">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">新建巡检任务</el-button>
        <el-button type="warning" icon="el-icon-refresh" plain size="small" @click="handleRefresh">刷新</el-button>
      </div>
      <div class="operate-right">
        <el-input v-model="searchForm.keyword" placeholder="任务号/巡检区域/巡检人员" clearable class="search-input" @keyup.enter="handleQuery"></el-input>
        <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
        <el-button type="default" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 巡检任务表格 -->
    <el-table
      ref="taskTable"
      :data="taskList"
      border
      style="width: 100%;"
      class="task-table"
      :header-cell-style="{ backgroundColor: '#f5f7fa', fontWeight: 'normal' }"
      :cell-style="{ padding: '8px 0' }"
      empty-text="暂无巡检任务"
      :loading="loading"
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ (pageNum-1)*pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="taskNo" label="任务号" min-width="180" align="center" />
      <el-table-column prop="area" label="巡检区域" min-width="120" align="center" />
      <el-table-column prop="type" label="巡检类型" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === '公共区域' ? 'primary' : 'info'" size="small">
            {{ scope.row.type }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="worker" label="巡检人员" min-width="110" align="center" />
      <el-table-column prop="startTime" label="开始时间" min-width="160" align="center" />
      <el-table-column prop="endTime" label="截止时间" min-width="160" align="center" />
      <el-table-column prop="status" label="任务状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '未开始' ? 'warning'
              : scope.row.status === '进行中' ? 'primary'
              : 'success'"
            size="small"
          >
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.row)"
            title="编辑任务"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            @click="handleStart(scope.row)"
            title="开始任务"
            v-if="scope.row.status === '未开始'"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            size="mini"
            @click="handleCancel(scope.row)"
            title="取消任务"
            v-if="scope.row.status !== '已完成'"
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

    <!-- 新建/编辑弹窗 -->
    <el-dialog title="新建巡检任务" :visible.sync="dialogVisible" width="550px">
      <el-form ref="taskForm" :model="taskForm" label-width="90px">
        <el-form-item label="巡检区域" prop="area">
          <el-input v-model="taskForm.area" placeholder="请输入巡检区域（如：1号楼楼道）" />
        </el-form-item>
        <el-form-item label="巡检类型" prop="type">
          <el-select v-model="taskForm.type" placeholder="请选择类型" style="width:100%">
            <el-option label="公共区域" value="公共区域"></el-option>
            <el-option label="设施设备" value="设施设备"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检人员" prop="worker">
          <el-select v-model="taskForm.worker" placeholder="请选择巡检人员" style="width:100%">
            <el-option label="李师傅" value="李师傅"></el-option>
            <el-option label="张师傅" value="张师傅"></el-option>
            <el-option label="王师傅" value="王师傅"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="taskForm.startTime"
            type="datetime"
            placeholder="选择开始时间"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间" prop="endTime">
          <el-date-picker
            v-model="taskForm.endTime"
            type="datetime"
            placeholder="选择截止时间"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交任务</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "InspectTask",
  data() {
    return {
      loading: false,
      searchForm: { keyword: "" },
      dialogVisible: false,
      currentRow: {},
      isEdit: false,

      originList: [
        {
          id: 1,
          taskNo: "XJ202504010001",
          area: "1号楼楼道",
          type: "公共区域",
          worker: "李师傅",
          startTime: "2025-04-01 08:00:00",
          endTime: "2025-04-01 12:00:00",
          status: "进行中"
        },
        {
          id: 2,
          taskNo: "XJ202504010002",
          area: "小区门禁设施",
          type: "设施设备",
          worker: "张师傅",
          startTime: "2025-04-01 09:00:00",
          endTime: "2025-04-01 11:00:00",
          status: "未开始"
        },
        {
          id: 3,
          taskNo: "XJ202504020003",
          area: "2号楼电梯",
          type: "设施设备",
          worker: "王师傅",
          startTime: "2025-04-02 14:00:00",
          endTime: "2025-04-02 16:00:00",
          status: "已完成"
        },
        {
          id: 4,
          taskNo: "XJ202504020004",
          area: "小区绿化区域",
          type: "公共区域",
          worker: "李师傅",
          startTime: "2025-04-02 10:00:00",
          endTime: "2025-04-02 15:00:00",
          status: "未开始"
        }
      ],
      taskList: [],
      pageNum: 1,
      pageSize: 4,
      total: 4,

      taskForm: {
        area: "",
        type: "",
        worker: "",
        startTime: "",
        endTime: ""
      }
    };
  },
  mounted() {
    this.taskList = [...this.originList];
  },
  methods: {
    handleQuery() {
      this.loading = true;
      setTimeout(() => {
        const key = this.searchForm.keyword.trim();
        if (key) {
          this.taskList = this.originList.filter(item =>
            item.taskNo.includes(key) ||
            item.area.includes(key) ||
            item.worker.includes(key)
          );
          this.$message.info(`查询：${key}`);
        } else {
          this.taskList = [...this.originList];
        }
        this.loading = false;
      }, 300);
    },
    handleReset() {
      this.searchForm.keyword = "";
      this.taskList = [...this.originList];
      this.$message.info("已重置");
    },
    handleRefresh() {
      this.loading = true;
      setTimeout(() => {
        this.taskList = [...this.originList];
        this.loading = false;
        this.$message.success("刷新成功");
      }, 300);
    },
    // 新建任务
    handleAdd() {
      this.isEdit = false;
      this.taskForm = { area: "", type: "", worker: "", startTime: "", endTime: "" };
      this.dialogVisible = true;
    },
    // 编辑任务
    handleEdit(row) {
      this.isEdit = true;
      this.currentRow = row;
      this.taskForm = { ...row };
      this.dialogVisible = true;
    },
    // 提交任务
    handleSubmit() {
      if (!this.taskForm.area || !this.taskForm.worker || !this.taskForm.startTime || !this.taskForm.endTime) {
        this.$message.warning("请填写完整任务信息");
        return;
      }
      if (this.isEdit) {
        // 编辑
        const index = this.originList.findIndex(x => x.id === this.currentRow.id);
        this.originList[index] = { ...this.taskForm, taskNo: this.currentRow.taskNo, status: this.currentRow.status };
        this.$message.success("任务编辑成功");
      } else {
        // 新建
        const newTask = {
          ...this.taskForm,
          id: Date.now(),
          taskNo: `XJ${new Date().format("yyyyMMdd")}${Math.floor(Math.random() * 1000)}`,
          status: "未开始"
        };
        this.originList.unshift(newTask);
        this.$message.success("任务创建成功");
      }
      this.handleQuery();
      this.dialogVisible = false;
    },
    // 开始任务
    handleStart(row) {
      const item = this.originList.find(x => x.id === row.id);
      if (item) {
        item.status = "进行中";
      }
      this.handleQuery();
      this.$message.success("巡检任务已开始");
    },
    // 取消任务
    handleCancel(row) {
      this.$confirm("确定要取消该巡检任务？", "提示", { type: "warning" })
        .then(() => {
          const item = this.originList.find(x => x.id === row.id);
          if (item) {
            item.status = "未开始";
          }
          this.handleQuery();
          this.$message.success("巡检任务已取消");
        });
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
.inspect-task-page {
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

  .task-table {
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