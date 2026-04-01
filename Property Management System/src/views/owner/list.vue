<template>
  <div class="owner-list-page">
    <!-- 顶部面包屑导航 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item><span style="display:inline-flex;align-items:center;gap:4px; white-space: nowrap;">
        <back-toindex></back-toindex>
      </span>
      </el-breadcrumb-item>
      <el-breadcrumb-item><span style="display:inline-flex;align-items:center;gap:6px; white-space: nowrap;">业主列表
        <el-tag type="success" size="mini">管理中</el-tag></span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 功能操作栏 -->
    <div class="operate-area">
      <div class="operate-left">
        <el-button 
          type="primary" 
          icon="el-icon-plus"
          size="small" 
          class="add-btn"
          @click="handleAddOwner"
        >添加业主</el-button>
        <el-button 
          type="danger" 
          icon="el-icon-delete"
          size="small" 
          class="delete-btn"
          @click="handleBatchDelete"
          :disabled="selectedIds.length === 0"
        >删除</el-button>
        <el-button 
          type="warning" 
          icon="el-icon-refresh" 
          plain
          size="small"
          class="refresh-btn"
          @click="handleRefresh"
        >刷新</el-button>
      </div>
      <div class="operate-right">
        <el-input 
          v-model="searchForm.ownerName" 
          placeholder="业主姓名" 
          class="search-input"
          clearable
          @keyup.enter="handleQuery"
        ></el-input>
        <el-button type="primary" @click="handleQuery" size="small" class="query-btn">查询</el-button>
        <el-button type="default" plain @click="handleReset" size="small" class="reset-btn">重置</el-button>
      </div>
    </div>

    <!-- 业主列表表格 -->
    <el-table
      ref="ownerTable"
      :data="ownerList"
      border
      style="width: 100%;"
      class="owner-table"
      :header-cell-style="{ backgroundColor: '#f5f7fa', fontWeight: 'normal' }"
      :cell-style="{ padding: '8px 0' }"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      empty-text="暂无业主数据"
      :loading="loading"
    >
      <el-table-column type="selection" width="40" align="center" />
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="ownerName" label="业主姓名" min-width="120" align="center" />
      <el-table-column prop="houseNo" label="房号" min-width="120" align="center" />
      <el-table-column prop="phone" label="联系电话" min-width="130" align="center" />
      <el-table-column prop="createTime" label="入住时间" min-width="150" align="center" />
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '正常' ? 'success' : 'danger'" size="small">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="handleEditOwner(scope.row)"
            title="编辑业主"
            style="background: #1890ff; border-color: #1890ff; margin-right:5px;"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            size="mini"
            circle
            @click="handleSingleDelete(scope.row)"
            title="删除业主"
            style="background: #fa8c16; border-color: #fa8c16;"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pageoff-set></pageoff-set>

    <!-- 统计栏 -->
    <div class="stats-area">
      显示第 {{ (pageNum - 1) * pageSize + 1 }} 到 {{ Math.min(pageNum * pageSize, total) }} 条记录, 总共 {{ total }} 条记录
    </div>

    <!-- 底部版权 -->
    <div class="footer">安居无忧物业管理平台</div>

    <!-- 新增/编辑业主弹窗 -->
    <el-dialog
      title="业主信息"
      :visible.sync="addDialogVisible"
      width="500px"
      @close="handleClose"
    >
      <el-form
        ref="addOwnerForm"
        :model="addOwnerForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="业主姓名" prop="ownerName">
          <el-input v-model="addOwnerForm.ownerName" placeholder="请输入业主姓名" />
        </el-form-item>
        <el-form-item label="房号" prop="houseNo">
          <el-input v-model="addOwnerForm.houseNo" placeholder="请输入房号" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="addOwnerForm.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="addOwnerForm.status">
            <el-radio label="正常">正常</el-radio>
            <el-radio label="禁用">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "OwnerList",
  data() {
    return {
      loading: false,
      searchForm: {
        ownerName: ""
      },
      addDialogVisible: false,
      addOwnerForm: {
        ownerName: "",
        houseNo: "",
        phone: "",
        status: "正常"
      },
      rules: {
        ownerName: [{ required: true, message: "请输入业主姓名", trigger: "blur" }],
        houseNo: [{ required: true, message: "请输入房号", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }]
      },
      editId: null,
      ownerList: [
        { id: 1, ownerName: "张三", houseNo: "1-1-101", phone: "13800138000", createTime: "2024-01-10 09:20:30", status: "正常" },
        { id: 2, ownerName: "李四", houseNo: "1-2-201", phone: "13900139000", createTime: "2024-02-15 14:10:20", status: "正常" },
        { id: 3, ownerName: "王五", houseNo: "2-1-302", phone: "13700137000", createTime: "2024-03-20 10:05:15", status: "禁用" },
        { id: 4, ownerName: "赵六", houseNo: "2-3-501", phone: "13600136000", createTime: "2024-04-05 16:30:45", status: "正常" }
      ],
      pageNum: 1,
      pageSize: 4,
      total: 4,
      selectedIds: []
    };
  },
  methods: {
    // 打开新增
    handleAddOwner() {
      this.editId = null;
      this.addDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.addOwnerForm.resetFields();
        this.addOwnerForm.status = "正常";
      });
    },
    // 打开编辑
    handleEditOwner(row) {
      this.editId = row.id;
      this.addDialogVisible = true;
      this.$nextTick(() => {
        this.addOwnerForm = { ...row };
      });
    },
    // 提交新增/编辑
    handleSubmit() {
      this.$refs.addOwnerForm.validate((valid) => {
        if (!valid) return;
        const data = { ...this.addOwnerForm };
        if (!this.editId) {
          data.id = Date.now();
          data.createTime = new Date().toLocaleString();
          this.ownerList.unshift(data);
          this.$message.success("添加成功");
        } else {
          const index = this.ownerList.findIndex(x => x.id === this.editId);
          this.ownerList[index] = { ...this.ownerList[index], ...data };
          this.$message.success("修改成功");
        }
        this.total = this.ownerList.length;
        this.addDialogVisible = false;
      });
    },
    // 关闭弹窗
    handleClose() {
      this.addDialogVisible = false;
    },
    // 查询
    handleQuery() {
  this.pageNum = 1;
  this.loading = true;
  setTimeout(() => {
    const keyword = this.searchForm.ownerName.trim();
    if (keyword) {
      // 过滤业主姓名
      this.ownerList = this.ownerList.filter(item => 
        item.ownerName.includes(keyword)
      );
    } else {
      // 为空还原全部数据
      this.ownerList = [
        { id: 1, ownerName: "张三", houseNo: "1-1-101", phone: "13800138000", createTime: "2024-01-10 09:20:30", status: "正常" },
        { id: 2, ownerName: "李四", houseNo: "1-2-201", phone: "13900139000", createTime: "2024-02-15 14:10:20", status: "正常" },
        { id: 3, ownerName: "王五", houseNo: "2-1-302", phone: "13700137000", createTime: "2024-03-20 10:05:15", status: "禁用" },
        { id: 4, ownerName: "赵六", houseNo: "2-3-501", phone: "13600136000", createTime: "2024-04-05 16:30:45", status: "正常" }
      ];
    }
    this.total = this.ownerList.length;
    this.loading = false;
  }, 400);
},
    // 重置
    handleReset() {
      this.searchForm.ownerName = "";
      this.pageNum = 1;
      this.handleQuery();
    },
    // 刷新
    handleRefresh() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$message.success("列表刷新成功");
      }, 500);
    },
    // 单个删除
    handleSingleDelete(row) {
      if (!row.id) return this.$message.warning("业主数据异常");
      this.$confirm("确定删除该业主？删除后不可恢复！", "提示", { type: "warning" })
        .then(() => {
          this.ownerList = this.ownerList.filter(item => item.id !== row.id);
          this.total = this.ownerList.length;
          this.$message.success("删除成功");
        })
        .catch(() => this.$message.info("已取消"));
    },
    // 批量删除
    handleBatchDelete() {
      if (this.selectedIds.length === 0) return this.$message.warning("请选择业主");
      this.$confirm(`确定删除选中的 ${this.selectedIds.length} 位业主？`, "提示", { type: "danger" })
        .then(() => {
          this.ownerList = this.ownerList.filter(item => !this.selectedIds.includes(item.id));
          this.total = this.ownerList.length;
          this.selectedIds = [];
          this.$refs.ownerTable.clearSelection();
          this.$message.success("批量删除成功");
        })
        .catch(() => this.$message.info("已取消"));
    },
    handleSelectionChange(val) {
      this.selectedIds = val.map(item => item.id);
    },
    handleRowClick(row) {
      this.$refs.ownerTable.toggleRowSelection(row);
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
.owner-list-page {
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

    .operate-left {
      display: flex;
      gap: 10px;
      .add-btn { border-color: #52c41a; }
      .delete-btn { background: #f5222d; border-color: #f5222d; }
    }

    .operate-right {
      display: flex;
      gap: 8px;
      .search-input { width: 160px; }
      .query-btn { background: #1890ff; border-color: #1890ff; }
    }
  }

  .owner-table {
    --el-table-row-hover-bg-color: #f8fafc;
    margin: 0;
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