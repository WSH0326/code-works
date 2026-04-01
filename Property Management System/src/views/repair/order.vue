<template>
  <div class="repair-list-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:4px">
          <back-toindex></back-toindex>
        </span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:6px">
          工单管理
          <el-tag type="success" size="mini">管理中</el-tag>
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 功能栏 -->
    <div class="operate-area">
      <div class="operate-left">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">新建工单</el-button>
        <el-button type="warning" icon="el-icon-refresh" size="small" plain @click="handleRefresh">刷新</el-button>
      </div>
      <div class="operate-right">
        <el-input v-model="searchForm.keyword" placeholder="工单号/业主姓名/房号" clearable class="search-input" @keyup.enter="handleQuery"></el-input>
        <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
        <el-button type="default" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 报修表格 -->
    <el-table
      ref="repairTable"
      :data="repairList"
      border
      style="width: 100%;"
      class="repair-table"
      :header-cell-style="{ backgroundColor: '#f5f7fa', fontWeight: 'normal' }"
      :cell-style="{ padding: '8px 0' }"
      empty-text="暂无报修工单"
      :loading="loading"
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ (pageNum-1)*pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="repairNo" label="工单号" min-width="180" align="center" />
      <el-table-column prop="ownerName" label="业主姓名" min-width="100" align="center" />
      <el-table-column prop="houseNo" label="房号" min-width="100" align="center" />
      <el-table-column prop="type" label="报修类型" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === '水电' ? 'primary' : (scope.row.type === '门禁' ? 'success' : 'warning')" size="mini">
            {{ scope.row.type }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="报修内容" min-width="220" align="center" />
      <el-table-column prop="status" label="工单状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '待派单' ? 'warning' : (scope.row.status === '处理中' ? 'primary' : 'success')" size="small">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="160" align="center" />
      <el-table-column label="操作" width="150" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-view"
            size="mini"
            @click="handleDetail(scope.row)"
            title="查看详情"
          ></el-button>
          <!-- 待派单状态显示派单按钮 -->
          <el-button
            type="success"
            icon="el-icon-right"
            size="mini"
            @click="handleDispatch(scope.row)"
            title="派单处理"
            v-if="scope.row.status === '待派单'"
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

    <!-- 新增/编辑弹窗 -->
    <el-dialog title="新建报修工单" :visible.sync="dialogVisible" width="550px">
      <el-form ref="repairForm" :model="repairForm" label-width="90px">
        <el-form-item label="房号" prop="houseNo">
          <el-input v-model="repairForm.houseNo" placeholder="请输入房号" />
        </el-form-item>
        <el-form-item label="业主姓名" prop="ownerName">
          <el-input v-model="repairForm.ownerName" placeholder="请输入业主姓名" />
        </el-form-item>
        <el-form-item label="报修类型" prop="type">
          <el-select v-model="repairForm.type" placeholder="请选择类型" style="width:100%">
            <el-option label="水电维修" value="水电"></el-option>
            <el-option label="门禁/道闸" value="门禁"></el-option>
            <el-option label="其他问题" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报修内容" prop="content">
          <el-input v-model="repairForm.content" type="textarea" :rows="4" placeholder="请详细描述问题"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交工单</el-button>
      </div>
    </el-dialog>

    <!-- 报修详情弹窗 -->
<el-dialog
  title="报修工单详情"
  :visible.sync="detailDialogVisible"
  width="500px"
  center
  close-on-click-modal="false"
>
  <div class="detail-content">
    <div class="detail-item">
      <label>工单号：</label>
      <span>{{ detailForm.repairNo || '—' }}</span>
    </div>
    <div class="detail-item">
      <label>业主姓名：</label>
      <span>{{ detailForm.ownerName || '—' }}</span>
    </div>
    <div class="detail-item">
      <label>房屋房号：</label>
      <span>{{ detailForm.houseNo || '—' }}</span>
    </div>
    <div class="detail-item">
      <label>联系电话：</label>
      <span>{{ detailForm.phone || '—' }}</span>
    </div>
    <div class="detail-item">
      <label>报修类型：</label>
      <span>{{ detailForm.type || '—' }}</span>
    </div>
    <div class="detail-item">
      <label>报修内容：</label>
      <span class="content">{{ detailForm.content || '无描述' }}</span>
    </div>
    <div class="detail-item">
      <label>报修时间：</label>
      <span>{{ detailForm.createTime || '—' }}</span>
    </div>
    <div class="detail-item">
      <label>处理状态：</label>
      <el-tag :type="detailForm.status === '已完成' ? 'success' : detailForm.status === '处理中' ? 'warning' : 'danger'">
        {{ detailForm.status || '—' }}
      </el-tag>
    </div>
  </div>

  <div slot="footer" class="dialog-footer">
    <el-button @click="detailDialogVisible = false">关闭</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: "RepairList",
  data() {
    return {
      loading: false,
      searchForm: { keyword: "" },
      dialogVisible: false,
      // 原始数据
      originList: [
        { id: 1, repairNo: "W202504010001", ownerName: "张三", houseNo: "1-1-101", type: "水电", content: "卫生间水管漏水", status: "待派单", createTime: "2025-04-01 09:10:22" },
        { id: 2, repairNo: "W202504010002", ownerName: "李四", houseNo: "1-2-201", type: "门禁", content: "大门门禁失灵", status: "处理中", createTime: "2025-04-01 10:20:11" },
        { id: 3, repairNo: "W202504020003", ownerName: "王五", houseNo: "2-1-302", type: "其他", content: "楼道灯不亮", status: "已完成", createTime: "2025-04-02 11:05:15" },
        { id: 4, repairNo: "W202504020004", ownerName: "赵六", houseNo: "2-3-501", type: "水电", content: "厨房插座没电", status: "待派单", createTime: "2025-04-02 15:30:33" },
      ],
      repairList: [],
      pageNum: 1,
      pageSize: 4,
      total: 4,
      // 表单数据
      repairForm: {
        houseNo: "",
        ownerName: "",
        type: "",
        content: ""
      },
     detailDialogVisible: false,
     detailForm: {}
    };
  },
  mounted() {
    this.repairList = [...this.originList];
  },
  methods: {
    // 查询
    handleQuery() {
      this.loading = true;
      setTimeout(() => {
        const key = this.searchForm.keyword.trim();
        if (key) {
          this.repairList = this.originList.filter(item =>
            item.repairNo.includes(key) || item.ownerName.includes(key) || item.houseNo.includes(key)
          );
        } else {
          this.repairList = [...this.originList];
        }
        this.loading = false;
      }, 300);
    },
    // 重置
    handleReset() {
      this.searchForm.keyword = "";
      this.repairList = [...this.originList];
    },
    // 刷新
    handleRefresh() {
      this.loading = true;
      setTimeout(() => {
        this.repairList = [...this.originList];
        this.loading = false;
        this.$message.success("刷新成功");
      }, 300);
    },
    // 新增
    handleAdd() {
      this.repairForm = { houseNo: "", ownerName: "", type: "", content: "" };
      this.dialogVisible = true;
    },
    // 提交
    handleSubmit() {
      const data = { ...this.repairForm };
      data.id = Date.now();
      data.repairNo = `W${new Date().format("yyyyMMdd")}${Math.floor(Math.random() * 1000)}`;
      data.status = "待派单";
      data.createTime = new Date().format("yyyy-MM-dd hh:mm:ss");
      this.originList.unshift(data);
      this.handleQuery();
      this.dialogVisible = false;
      this.$message.success("工单提交成功！");
    },
    // 详情
    handleDetail(row) {
       this.detailForm = { ...row }; // 复制数据
       this.detailDialogVisible = true; // 打开弹窗
    },
    // 派单 (跳转到派单管理页面)
    handleDispatch(row) {
      this.$router.push({ path: '/repair/dispatch', query: { repairId: row.id } });
    },
    handleSizeChange(val) { this.pageSize = val; },
    handleCurrentChange(val) { this.pageNum = val; }
  }
};
</script>

<style lang="scss" scoped>
.repair-list-page {
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
      .search-input { width: 220px; }
    }
  }

  .repair-table {
    margin: 0;
    --el-table-row-hover-bg-color: #f8fafc;
    .el-table__body tr:nth-child(even) { background: #fcfdfe; }
  }

.detail-content {
  padding: 10px 0;

  .detail-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    font-size: 14px;

    label {
      width: 90px;
      color: #909399;
      font-weight: normal;
    }

    span {
      color: #303133;
    }

    .content {
      line-height: 1.6;
    }
  }
}

.dialog-footer {
  text-align: right;
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