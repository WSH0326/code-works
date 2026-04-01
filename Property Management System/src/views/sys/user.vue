<template>
  <div class="user-list-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:4px">
          <back-toindex></back-toindex>
        </span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:6px">
          用户管理
          <el-tag type="success" size="mini">管理中</el-tag>
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 功能栏 -->
    <div class="operate-area">
      <div class="operate-left">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">新增用户</el-button>
        <el-button type="warning" icon="el-icon-refresh" size="small" plain @click="handleRefresh">刷新</el-button>
      </div>
      <div class="operate-right">
        <el-input v-model="searchForm.keyword" placeholder="用户名/姓名/手机号" clearable class="search-input" @keyup.enter="handleQuery"></el-input>
        <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
        <el-button type="default" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      ref="userTable"
      :data="userList"
      border
      style="width:100%"
      class="user-table"
      :header-cell-style="{backgroundColor:'#f5f7fa',fontWeight:'normal'}"
      :cell-style="{padding:'8px 0'}"
      empty-text="暂无用户"
      :loading="loading"
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ (pageNum-1)*pageSize + scope.$index +1 }}</template>
      </el-table-column>
      <el-table-column prop="username" label="登录账号" min-width="120" align="center" />
      <el-table-column prop="realName" label="真实姓名" min-width="100" align="center" />
      <el-table-column prop="phone" label="手机号" min-width="130" align="center" />
      <el-table-column prop="roleName" label="所属角色" min-width="120" align="center" />
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" size="small">
            {{ scope.row.status ===1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="160" align="center" />
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row)"></el-button>
          <el-button type="warning" icon="el-icon-setting" size="mini" @click="handleRole(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pageoff-set></pageoff-set>

    <div class="stats-area">
      显示第 {{ total>0 ? (pageNum-1)*pageSize+1 :0 }} 到 {{ total>0 ? Math.min(pageNum*pageSize,total) :0 }} 条记录，共 {{ total }} 条
    </div>

    <div class="footer">安居无忧物业管理平台</div>

    <!-- 新增/编辑弹窗 -->
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="550px">
      <el-form label-width="80px" :model="form">
        <el-form-item label="登录账号">
          <el-input v-model="form.username" :disabled="isEdit" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.realName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="form.roleId" placeholder="选择角色" style="width:100%">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="物业管理员" value="2"></el-option>
            <el-option label="普通业主" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色弹窗 -->
<el-dialog title="分配角色" :visible.sync="roleDialog" width="460px">
  <el-form label-width="80px">
    <el-form-item label="用户名称">
      <el-input :value="currentUser.realName" disabled />
    </el-form-item>
    <el-form-item label="分配角色">
      <el-radio-group v-model="selectedRole">
        <el-radio label="管理员" />
        <el-radio label="物业人员" />
        <el-radio label="维修人员" />
        <el-radio label="普通用户" />
      </el-radio-group>
    </el-form-item>
  </el-form>
  <div slot="footer">
    <el-button @click="roleDialog = false">取消</el-button>
    <el-button type="primary" @click="saveRole">保存角色</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserView",
  data() {
    return {
      loading: false,
      searchForm: { keyword: "" },
      dialogVisible: false,
      isEdit: false,
      form: {},
      roleDialog: false,
      currentUser: {},
      selectedRole: '',
      originList: [
        { id:1, username:"admin", realName:"系统管理员", phone:"13800138000", roleId:"1", roleName:"超级管理员", status:1, createTime:"2025-01-01 10:00:00" },
        { id:2, username:"wuye", realName:"物业小张", phone:"13900139000", roleId:"2", roleName:"物业管理员", status:1, createTime:"2025-01-02 11:00:00" },
        { id:3, username:"zhangsan", realName:"张三", phone:"13700137000", roleId:"3", roleName:"普通业主", status:1, createTime:"2025-01-03 09:00:00" },
        { id:4, username:"lisi", realName:"李四", phone:"13600136000", roleId:"3", roleName:"普通业主", status:0, createTime:"2025-01-04 15:00:00" },
      ],
      userList: [],
      pageNum:1, pageSize:4, total:4
    }
  },
  mounted(){ this.userList = [...this.originList] },
  methods:{
    handleQuery(){
      this.loading = true
      setTimeout(()=>{
        const key = this.searchForm.keyword.trim()
        if(key){
          this.userList = this.originList.filter(i=>
            i.username.includes(key) || i.realName.includes(key) || i.phone.includes(key)
          )
        }else{
          this.userList = [...this.originList]
        }
        this.loading = false
      },300)
    },
    handleReset(){ this.searchForm.keyword=""; this.handleQuery() },
    handleRefresh(){ this.handleQuery(); this.$message.success("刷新成功") },
    handleAdd(){ this.isEdit=false; this.form={status:1}; this.dialogVisible=true },
    handleEdit(row){ this.isEdit=true; this.form={...row}; this.dialogVisible=true },
    handleSubmit(){
      if(this.isEdit){
        const idx = this.originList.findIndex(i=>i.id===this.form.id)

        if (this.form.roleId === '1') {
      this.form.roleName = '超级管理员'
    } else if (this.form.roleId === '2') {
      this.form.roleName = '物业管理员'
    } else if (this.form.roleId === '3') {
      this.form.roleName = '普通业主'
    }

        this.originList[idx] = {...this.form}
        this.$message.success("修改成功")
      }else{
        this.form.id = Date.now()
        this.form.createTime = new Date().toLocaleString()
        this.originList.unshift(this.form)
        this.$message.success("新增成功")
      }
      this.dialogVisible=false
      this.handleQuery()
    },
    // 打开分配角色
handleRole(row) {
  this.currentUser = { ...row }
  this.selectedRole = row.roleName
  this.roleDialog = true
},

// 保存角色
saveRole() {
  if (!this.selectedRole) {
    this.$message.warning('请选择一个角色')
    return
  }

   const target = this.originList.find(x => x.id === this.currentUser.id)
  if (target) {
    target.roleName = this.selectedRole

     if (this.selectedRole === '管理员') {
    target.roleId = '1'
  } else if (this.selectedRole === '物业人员' || this.selectedRole === '维修人员') {
    target.roleId = '2'
  } else if (this.selectedRole === '普通用户') {
    target.roleId = '3'
  }
}

  // 保存到当前用户
  this.handleQuery()
  this.$message.success(`成功为【${this.currentUser.realName}】分配角色：${this.selectedRole}`)
  this.roleDialog = false
},
    handleDelete(row){
      this.$confirm("确认删除？","提示",{type:"warning"}).then(()=>{
        this.originList = this.originList.filter(i=>i.id!==row.id)
        this.handleQuery()
        this.$message.success("删除成功")
      })
    },
    handleSizeChange(v){ this.pageSize=v },
    handleCurrentChange(v){ this.pageNum=v }
  }
}
</script>

<style lang="scss" scoped>
.user-list-page {
  background:#fff; min-height:100vh; font-size:14px; color:#333;
  padding:10px 15px 60px; position:relative;
  .breadcrumb{
    display: flex;
    align-items: center;
    margin-bottom:10px
  }
  .header-right{position:absolute; right:15px; top:15px; display:flex; align-items:center; gap:8px}
  .operate-area{display:flex; justify-content:space-between; align-items:center; padding:10px 0; flex-wrap:wrap; gap:10px}
  .operate-right{display:flex; gap:8px; .search-input{width:220px}}
  .user-table{margin:0; --el-table-row-hover-bg-color:#f8fafc; .el-table__body tr:nth-child(even){background:#fcfdfe}}
  .stats-area{padding:5px 0; font-size:12px; color:#666}
  .footer{text-align:center; font-size:12px; color:#999; padding:10px 0; border-top:1px solid #eee; position:absolute; bottom:0; left:0; width:100%}
}
</style>