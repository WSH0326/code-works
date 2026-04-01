<template>
  <div class="home-container">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="sidebar">
      <!-- 侧边栏头部 -->
      <div class="sidebar-header">
        <img src="../assets/logo.png" width="60" height="60" alt="用户头像" class="avatar" />
        <p class="role-name">{{ roleName }}</p>
      </div>

      <!-- 权限菜单：根据角色自动显示 -->
      <el-menu
        :default-active="$route.path"
        class="sidebar-menu"
        background-color="#545C64"
        text-color="#fff"
        router
      >
        <!-- 数据看板：所有人可见 -->
        <el-menu-item index="/index">
          <i class="el-icon-house"></i>
          <span slot="title">数据看板</span>
        </el-menu-item>

        <!-- 业主管理：超管和物业可见 -->
        <el-submenu index="1" v-if="['1', '2'].includes(roleId)">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>业主管理</span>
          </template>
          <el-menu-item index="/owner/list">业主列表</el-menu-item>
          <el-menu-item index="/owner/record">入住记录</el-menu-item>
        </el-submenu>

        <!-- 缴费管理：超管和物业可见 -->
        <el-submenu index="2" v-if="['1', '2'].includes(roleId)">
          <template slot="title">
            <i class="el-icon-money"></i>
            <span>缴费管理</span>
          </template>
          <el-menu-item index="/order/list">缴费记录</el-menu-item>
          <el-menu-item index="/order/unpay">未缴提醒</el-menu-item>
        </el-submenu>

        <!-- 报修管理：所有人可见 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>报修管理</span>
          </template>
          <el-menu-item index="/repair/order">报修工单</el-menu-item>
          <el-menu-item index="/repair/dispatch">派单管理</el-menu-item>
        </el-submenu>

        <!-- 设施巡检：物业和管理员可见 -->
        <el-submenu index="4" v-if="['1', '2'].includes(roleId)">
          <template slot="title">
            <i class="el-icon-check"></i>
            <span>设施巡检</span>
          </template>
          <el-menu-item index="/inspect/record">巡检记录</el-menu-item>
          <el-menu-item index="/inspect/task">巡检任务</el-menu-item>
        </el-submenu>

        <!-- 系统管理：仅超级管理员可见 -->
        <el-submenu index="5" v-if="roleId === '1'">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/sys/user">用户管理</el-menu-item>
          <el-menu-item index="/sys/role">角色权限</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <!-- 主内容区 -->
    <el-container class="main-wrapper">
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
    // 从本地缓存取登录后的角色信息
    roleId: localStorage.getItem('roleId') || '3',
    roleName: localStorage.getItem('roleName') || '普通业主'
    };
  },
  methods:{}
};
</script>

<style lang="scss" scoped src="./HomeView.scss"></style>