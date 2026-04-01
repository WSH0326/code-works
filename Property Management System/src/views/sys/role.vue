<template>
  <div class="role-list-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:4px">
          <back-toindex></back-toindex>
        </span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="display:inline-flex;align-items:center;gap:6px">
          权限管理
          <el-tag type="success" size="mini">管理中</el-tag>
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 功能栏 -->
    <div class="operate-area">
      <div class="operate-left">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">新增角色</el-button>
        <el-button type="warning" icon="el-icon-refresh" plain size="small" @click="handleRefresh">刷新</el-button>
      </div>
      <div class="operate-right">
        <el-input v-model="searchForm.keyword" placeholder="角色名称" clearable style="width:220px" @keyup.enter="handleQuery"></el-input>
        <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
        <el-button type="default" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      :data="roleList"
      border
      style="width:100%"
      :header-cell-style="{backgroundColor:'#f5f7fa'}"
      :cell-style="{padding:'8px 0'}"
      empty-text="暂无角色"
      :loading="loading"
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ (pageNum-1)*pageSize + scope.$index +1 }}</template>
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" min-width="140" align="center" />
      <el-table-column prop="remark" label="角色描述" min-width="200" align="center" />
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status===1?'success':'danger'" size="small">
            {{ scope.row.status===1?'启用':'禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="160" align="center" />
      <el-table-column label="操作" width="220" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-user-solid" size="mini" @click="handlePermission(scope.row)"></el-button>
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

    <!-- 弹窗 -->
    <el-dialog title="角色信息" :visible.sync="dialogVisible" width="500px">
      <el-form label-width="80px" :model="form">
        <el-form-item label="角色名称"><el-input v-model="form.roleName" /></el-form-item>
        <el-form-item label="角色描述"><el-input v-model="form.remark" type="textarea" :rows="3" /></el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio><el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </el-dialog>

    <!-- 权限分配 -->
    <el-dialog title="分配权限" :visible.sync="permDialog" width="600px">
      <el-tree
        :data="permList"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="{children:'children',label:'label'}"
      ></el-tree>
      <div slot="footer">
        <el-button @click="permDialog=false">取消</el-button>
        <el-button type="primary" @click="savePerm">保存权限</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "RoleView",
  data() {
    return {
      loading: false,
      searchForm: { keyword: "" },
      dialogVisible: false,
      permDialog: false,
      isEdit: false,
      form: {},
      originList: [
        { id:1, roleName:"超级管理员", remark:"拥有所有权限", status:1, createTime:"2025-01-01 10:00:00" },
        { id:2, roleName:"物业管理员", remark:"负责订单、报修、巡检、派单", status:1, createTime:"2025-01-02 11:00:00" },
        { id:3, roleName:"普通业主", remark:"仅查看自己信息、缴费、报修", status:1, createTime:"2025-01-03 09:00:00" },
      ],
      roleList: [],
      pageNum:1, pageSize:4, total:3,
      permList: [
        { id:1, label:"系统管理", children: [
          { id:11, label:"用户管理" },{ id:12, label:"角色权限" },{ id:13, label:"菜单管理" }
        ]},
        { id:2, label:"订单管理", children: [
          { id:21, label:"缴费订单" },{ id:22, label:"未缴提醒" },{ id:23, label:"报修工单" },{ id:24, label:"派单管理" }
        ]},
        { id:3, label:"巡检管理", children: [
          { id:31, label:"巡检任务" },{ id:32, label:"巡检记录" }
        ]}
      ]
    }
  },
  mounted(){ this.roleList = [...this.originList] },
  methods:{
    handleQuery(){
      this.loading=true
      setTimeout(()=>{
        const key = this.searchForm.keyword.trim()
        if(key) this.roleList = this.originList.filter(i=>i.roleName.includes(key))
        else this.roleList = [...this.originList]
        this.loading=false
      },300)
    },
    handleReset(){ this.searchForm.keyword=""; this.handleQuery() },
    handleRefresh(){ this.handleQuery(); this.$message.success("刷新成功") },
    handleAdd(){ this.isEdit=false; this.form={status:1}; this.dialogVisible=true },
    handleEdit(row){ this.isEdit=true; this.form={...row}; this.dialogVisible=true },
    handleSubmit(){
      if(this.isEdit){
        const idx = this.originList.findIndex(i=>i.id===this.form.id)
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
    handlePermission(row){ this.permDialog=true; this.form=row },
    savePerm(){ this.$message.success("权限分配成功"); this.permDialog=false },
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
.role-list-page {
  background:#fff; min-height:100vh; font-size:14px; color:#333;
  padding:10px 15px 60px; position:relative;
  .breadcrumb{
    display: flex;
    align-items: center;
    margin-bottom:10px
  }
  .header-right{position:absolute; right:15px; top:15px; display:flex; align-items:center; gap:8px}
  .operate-area{display:flex; justify-content:space-between; align-items:center; padding:10px 0; flex-wrap:wrap; gap:10px}
  .operate-right{display:flex; gap:8px}
  .stats-area{padding:5px 0; font-size:12px; color:#666}
  .footer{text-align:center; font-size:12px; color:#999; padding:10px 0; border-top:1px solid #eee; position:absolute; bottom:0; left:0; width:100%}
}
</style>