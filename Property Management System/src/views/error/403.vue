<template>
  <div class="error-403">
    <div class="container">
      <h1>403</h1>
      <h2>Forbidden · 暂无访问权限</h2>
      <p>抱歉，您当前账号没有权限访问该页面</p>
      <el-button type="primary" @click="$router.push('/index')">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.error-403 {
  width: 100vw;
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  text-align: center;
  padding: 40px;
}

.container h1 {
  font-size: 120px;
  margin: 0;
  color: #f56c6c;
}

.container h2 {
  font-size: 24px;
  color: #333;
  margin: 10px 0;
}

.container p {
  color: #909399;
  margin-bottom: 30px;
}
</style>