<template>
  <div class="dict-page">
    <!-- 顶部导航栏（面包屑+操作按钮） -->
    <div class="page-header">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item><i class="el-icon-menu"></i>首页</el-breadcrumb-item>
        <el-breadcrumb-item class="active-breadcrumb">数据字典<el-tag type="success" size="mini">编辑中</el-tag></el-breadcrumb-item>
      </el-breadcrumb>

      <div class="header-right">
        <el-button type="text" class="arrow-btn"
          ><i class="el-icon-arrow-right"></i
        ></el-button>
        <el-dropdown>
          <el-button type="text">关闭操作<i class="el-icon-arrow-down"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>关闭当前</el-dropdown-item>
            <el-dropdown-item>关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 个人中心图标按钮 -->
        <el-button
          type="text"
          class="user-btn"
          icon="el-icon-user"
          @click="handleProfile"
          title="个人中心"
        ></el-button>
        <!-- 退出登录图标按钮 -->
        <el-button
          type="text"
          class="logout-btn"
          icon="el-icon-switch-button"
          @click="handleLogout"
          title="退出登录"
        ></el-button>
      </div>
    </div>

<div class="table-wrap">
    <!-- 操作栏+筛选区 -->
    <div class="operate-bar">
      <div class="btn-group">
        <!-- 绑定新增按钮点击事件 -->
        <el-button
          type="success"
          icon="el-icon-plus"
          class="add-btn"
          size="small"
          @click="handleAdd"
          >添加</el-button
        >
        <!-- 绑定批量删除按钮点击事件 -->
        <el-button
          type="danger"
          icon="el-icon-delete"
          class="del-btn"
          size="small"
          @click="handleBatchDelete"
          >删除</el-button
        >
      </div>

      <div class="filter-area">
        <el-select
          v-model="queryType"
          placeholder="选择类别"
          class="filter-select"
        >
          <el-option label="小说推荐类型" value="book_rec_type"></el-option>
          <el-option label="作品方向" value="work_direction"></el-option>
          <el-option label="页面显示类型" value="page_type"></el-option>
        </el-select>
        <el-button
          type="primary"
          class="query-btn"
          size="small"
          @click="handleQuery"
          >查询</el-button
        >
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table
      ref="dictTable"
      :data="dictList"
      border
      style="width: 100%"
      class="dict-table"
      :loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="编号" width="80" align="center" />
      <el-table-column prop="name" label="标签名" min-width="120" />
      <el-table-column prop="value" label="数据值" width="80" align="center" />
      <el-table-column prop="type" label="类型" min-width="120" />
      <el-table-column prop="description" label="描述" min-width="150" />
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <!-- 绑定编辑按钮点击事件 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            class="table-btn"
            @click="handleEdit(scope.row)"
          ></el-button>
          <!-- 绑定单行删除按钮点击事件 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            class="table-btn"
            @click="handleDelete(scope.row)"
          ></el-button>
          <!-- 绑定新增子项按钮点击事件 -->
          <el-button
            type="info"
            icon="el-icon-plus"
            size="mini"
            class="table-btn"
            @click="handleAddChild(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>

    <!-- 分页区 -->
    <div class="pagination-area">
      <!-- 处理无数据时的分页计算边界问题 -->
      <span class="total-text"
        >显示第 {{ total > 0 ? (currentPage - 1) * pageSize + 1 : 0 }} 到第
        {{ total > 0 ? Math.min(currentPage * pageSize, total) : 0 }}
        条记录，总共{{ total }}条记录 每页显示</span
      >
      <el-select
        v-model="pageSize"
        placeholder="10"
        class="page-size-select"
        style="width: 60px"
        @change="handleSizeChange"
      >
        <el-option label="10" value="10"></el-option>
        <el-option label="20" value="20"></el-option>
        <el-option label="50" value="50"></el-option>
      </el-select>
      <span class="total-text">条记录</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
        class="pagination"
      ></el-pagination>
    </div>

    <!-- 底部版权 -->
    <div class="footer">小说精品屋后台管理系统</div>

    <!-- 修复：补充新增/编辑弹窗组件 -->
    <el-dialog
      title="字典项编辑"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        ref="dictForm"
        :model="form"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="标签名" prop="name">
          <el-input v-model="form.name" placeholder="请输入标签名"></el-input>
        </el-form-item>
        <el-form-item label="数据值" prop="value">
          <el-input v-model="form.value" placeholder="请输入数据值"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="小说推荐类型" value="book_rec_type"></el-option>
            <el-option label="作品方向" value="work_direction"></el-option>
            <el-option label="页面显示类型" value="page_type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="请输入描述信息"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DictManagement",
  data() {
    return {
      // 分页查询参数（与模板分页逻辑绑定）
      params: {
        limit: 10, // 每页条数（对应pageSize）
        offset: 0, // 分页偏移量
        type: "", // 筛选类型（对应queryType）
      },
      // 分页控件绑定值（模板中直接使用）
      total: 0, // 总记录数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页条数（与el-select绑定）
      loading: false, // 表格加载状态（与模板loading绑定）
      // 表单弹窗相关（新增/编辑用）
      dialogFormVisible: false, // 弹窗显隐
      form: {
        // 新增/编辑表单数据
        id: "",
        name: "",
        value: "",
        type: "",
        description: "",
      },
      // 表单校验规则
      formRules: {
        name: [{ required: true, message: "请输入标签名", trigger: "blur" }],
        value: [{ required: true, message: "请输入数据值", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
      },
      // 表格数据（与模板dictList绑定）
      dictList: [],
      queryType: "", // 筛选类型（与el-select绑定）
      selectedRows: [], // 表格选中行（批量删除用）
      // 模拟全量数据（替代接口）
      mockData: [
        {
          id: 1,
          name: "玄幻",
          value: "xuanhuan",
          type: "book_rec_type",
          description: "小说推荐-玄幻类型",
        },
        {
          id: 2,
          name: "言情",
          value: "yanqing",
          type: "book_rec_type",
          description: "小说推荐-言情类型",
        },
        {
          id: 3,
          name: "男频",
          value: "nanpin",
          type: "work_direction",
          description: "作品方向-男频",
        },
        {
          id: 4,
          name: "女频",
          value: "nvpian",
          type: "work_direction",
          description: "作品方向-女频",
        },
        {
          id: 5,
          name: "首页轮播",
          value: "banner",
          type: "page_type",
          description: "页面显示-首页轮播",
        },
        {
          id: 6,
          name: "分类页",
          value: "category",
          type: "page_type",
          description: "页面显示-分类页",
        },
        {
          id: 7,
          name: "都市",
          value: "dushi",
          type: "book_rec_type",
          description: "小说推荐-都市类型",
        },
        {
          id: 8,
          name: "悬疑",
          value: "xuanyi",
          type: "book_rec_type",
          description: "小说推荐-悬疑类型",
        },
        {
          id: 9,
          name: "出版",
          value: "chuban",
          type: "work_direction",
          description: "作品方向-出版",
        },
        {
          id: 10,
          name: "免费页",
          value: "free",
          type: "page_type",
          description: "页面显示-免费页",
        },
        {
          id: 11,
          name: "仙侠",
          value: "xianxia",
          type: "book_rec_type",
          description: "小说推荐-仙侠类型",
        },
      ],
    };
  },
  created() {
    // 页面初始化加载列表
    this.getlist();
  },
  methods: {
    /**
     * 加载字典列表
     */
    getlist() {
      this.loading = true;
      // 模拟接口延迟
      setTimeout(() => {
        this.loading = false;
        // 1. 筛选数据（根据queryType过滤）
        let filteredData = this.mockData;
        if (this.queryType) {
          filteredData = this.mockData.filter(
            (item) => item.type === this.queryType
          );
        }
        // 2. 分页处理
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.dictList = filteredData.slice(start, end);
        this.total = filteredData.length;
        // 同步分页参数到params（保持与模板逻辑一致）
        this.params.limit = this.pageSize;
        this.params.offset = start;
        this.params.type = this.queryType;
      }, 500);
    },

    /**
     * 每页条数改变（适配模板@change事件）
     * @param {Number} val 新的每页条数
     */
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1; // 重置页码到第一页
      this.getlist();
    },

    /**
     * 当前页改变（适配模板@current-change事件）
     * @param {Number} val 新的页码
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },

    /**
     * 查询按钮点击（适配模板@click事件）
     */
    handleQuery() {
      this.currentPage = 1; // 筛选后重置页码
      this.getlist();
    },

    /**
     * 表格选中行变化（批量操作）
     * @param {Array} val 选中的行数据
     */
    handleSelectionChange(val) {
      this.selectedRows = val;
    },

    /**
     * 新增按钮点击
     */
    handleAdd() {
      // 重置表单
      this.form = {
        id: "",
        name: "",
        value: "",
        type: "",
        description: "",
      };
      // 打开新增弹窗
      this.dialogFormVisible = true;
      // 重置表单校验
      this.$nextTick(() => {
        this.$refs.dictForm?.clearValidate();
      });
    },

    /**
     * 编辑按钮点击（适配模板操作列）
     * @param {Object} row 当前行数据
     */
    handleEdit(row) {
      this.form = { ...row }; // 深拷贝行数据
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dictForm?.clearValidate();
      });
    },

    /**
     * 单行删除按钮点击（适配模板操作列）
     * @param {Object} row 当前行数据
     */
    handleDelete(row) {
      this.$confirm("确定要删除该字典项吗？删除后无法恢复！", "提示", {
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            // 从模拟数据中删除
            const index = this.mockData.findIndex((item) => item.id === row.id);
            if (index > -1) {
              this.mockData.splice(index, 1);
              this.$message.success("删除成功");
              this.getlist(); // 刷新列表
            } else {
              this.$message.error("删除失败：数据不存在");
            }
            // 清空选中状态
            this.$nextTick(() => {
              this.$refs.dictTable?.clearSelection();
            });
          }, 500);
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },

    /**
     * 批量删除按钮点击（适配模板顶部删除按钮）
     */
    handleBatchDelete() {
      if (this.selectedRows.length === 0) {
        this.$message.warning("请选择要删除的字典项");
        return;
      }

      this.$confirm(
        `确定要删除选中的${this.selectedRows.length}条字典项吗？删除后无法恢复！`,
        "提示",
        {
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            // 获取选中ID列表
            const selectedIds = this.selectedRows.map((item) => item.id);
            // 过滤模拟数据
            this.mockData = this.mockData.filter(
              (item) => !selectedIds.includes(item.id)
            );
            this.$message.success("批量删除成功");
            this.getlist(); // 刷新列表
            // 清空选中状态
            this.$nextTick(() => {
              this.$refs.dictTable?.clearSelection();
            });
          }, 500);
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },

    /**
     * 新增子项按钮点击（适配模板操作列）
     * @param {Object} row 当前行数据
     */
    handleAddChild(row) {
      this.form = {
        id: "",
        name: "",
        value: "",
        type: row.type, // 继承父项类型
        description: "",
        parentId: row.id, // 子项关联父ID
      };
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dictForm?.clearValidate();
      });
    },

    /**
     * 表单提交（新增/编辑）
     */
    handleSubmit() {
      // 修复：判断表单ref是否存在，避免无弹窗时报错
      if (!this.$refs.dictForm) {
        this.$message.warning("表单未加载完成，请重试");
        return;
      }
      // 表单校验
      this.$refs.dictForm.validate((valid) => {
        if (!valid) return;

        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          if (this.form.id) {
            // 编辑逻辑
            const index = this.mockData.findIndex(
              (item) => item.id === this.form.id
            );
            if (index > -1) {
              this.mockData[index] = { ...this.form };
              this.$message.success("编辑成功");
            } else {
              this.$message.error("编辑失败：数据不存在");
            }
          } else {
            // 新增逻辑：生成唯一ID
            const newId =
              Math.max(...this.mockData.map((item) => item.id), 0) + 1;
            this.mockData.push({
              ...this.form,
              id: newId,
            });
            this.$message.success("新增成功");
          }
          this.dialogFormVisible = false;
          this.getlist(); // 刷新列表
        }, 500);
      });
    },

    /**
     * 新增：弹窗关闭事件（重置表单）
     */
    handleDialogClose() {
      this.$refs.dictForm?.clearValidate();
      this.form = {
        id: "",
        name: "",
        value: "",
        type: "",
        description: "",
      };
    },

    //个人中心点击事件
    handleProfile() {
      // 跳转到个人中心页面（根据项目实际路由调整路径）
      this.$router.push("/user/profile");
      this.$message.info("进入个人中心");
    },
    //退出登录点击事件
    handleLogout() {
      this.$confirm("确定要退出登录吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          // 清除本地存储的登录信息
          window.sessionStorage.removeItem("token");
          window.sessionStorage.removeItem("userInfo");
          // 跳转到登录页
          this.$router.push("/login");
          this.$message.success("退出登录成功");
        })
        .catch(() => {
          this.$message.info("已取消退出");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dict-page {
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  overflow: hidden;

  // 顶部导航栏
  .page-header {
  height: 40px;
  line-height: 40px;
  background: #fff;
  border-bottom: 2px solid #1890ff;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  .breadcrumb {
    line-height: 40px;
    .active-breadcrumb {
      color: #1890ff;
      font-weight: 500;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.table-wrap {
  flex: 1;
  background: #fff;
  border: 1px solid #e6e9ed;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

  // 操作栏
  .operate-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .btn-group {
      display: flex;
    }

    .filter-area {
      display: flex;
      align-items: center;
      gap: 10px;

      .filter-select {
        width: 150px;
        height: 33px !important;
        margin-right: 10px;
      }
    }

    .add-btn {
      background: #1ab394;
      border-color: #1ab394;
      color: #fff;
      margin-right: 10px;
    }

    .del-btn {
      background: #ed5565;
      border-color: #ed5565;
      color: #fff;
    }

    .query-btn {
      background: #1c84c6;
      border-color: #1c84c6;
      color: #fff;
    }
  }

  // 表格
  .dict-table {
    font-size: 14px;
    margin-bottom: 15px;

    .el-table-column {
      font-size: 14px;
    }

    .dict-table {
      font-size: 14px;
      margin-bottom: 15px;

      .el-table-column {
        font-size: 14px;
      }
    }

    // 操作按钮样式
    .table-btn {
      width: 30px;
      height: 30px;
      padding: 0;
      margin: 0 2px;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      // // 匹配删除按钮橙色
      // &.el-button--danger {
      //   background: #ff7a45;
      //   border-color: #ff7a45;
      // }
    }
  }

  // 分页区
  .pagination-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    font-size: 12px;
    color: #666;

    .total-text {
      margin-right: 5px;
    }

    .page-size-select {
      margin: 0 5px;
    }

    .pagination {
      .el-pagination__page-number {
        min-width: 28px;
        height: 28px;
        line-height: 28px;
        margin: 0 2px;
      }
    }
  }
}

.footer {
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #999;
  font-size: 12px;
  border-top: 1px solid #eee;
  margin-top: 20px;
}
</style>