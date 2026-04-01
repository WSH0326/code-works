<template>
  <el-container class="main-content">
    <!-- 顶部导航栏 -->
    <el-header class="top-nav">
      <el-button icon="el-icon-menu" type="text"></el-button>
      <div class="top-title">安居无忧物业管理平台 - 数据看板</div>
      <div class="user-area">
        <span>{{ roleName }}</span>
        <el-button type="text" class="logout-btn" @click="logout">退出登录</el-button>
      </div>
    </el-header>

    <!-- 内容区域 -->
    <el-main class="content-wrap">
      <!-- 数据统计卡片 → 物业核心数据 -->
      <div class="stats-card-group">
        <el-card class="stats-card" shadow="hover">
          <div class="stats-header">
            <span>业主总数</span>
            <el-tag type="info">实时</el-tag>
          </div>
          <div class="stats-value">862</div>
          <div class="stats-desc">小区在住业主户数</div>
        </el-card>

        <el-card class="stats-card" shadow="hover">
          <div class="stats-header">
            <span>报修工单</span>
            <el-tag type="primary">实时</el-tag>
          </div>
          <div class="stats-value">27</div>
          <div class="stats-desc">今日待处理工单数</div>
        </el-card>

        <el-card class="stats-card" shadow="hover">
          <div class="stats-header">
            <span>缴费总额</span>
            <el-tag type="success">实时</el-tag>
          </div>
          <div class="stats-value">¥12.6W</div>
          <div class="stats-desc">本月物业费收缴金额</div>
        </el-card>

        <el-card class="stats-card" shadow="hover">
          <div class="stats-header">
            <span>设施巡检</span>
            <el-tag type="warning">实时</el-tag>
          </div>
          <div class="stats-value">98%</div>
          <div class="stats-desc">本月设施巡检完成率</div>
        </el-card>
      </div>

      <!-- 报表统计 + 项目信息 -->
      <el-row :gutter="20">
        <!-- 左侧 Echarts 报表区域 -->
        <el-col :span="16">
          <el-card class="report-card">
            <div class="report-header">
              <span>物业运营趋势报表</span>
              <el-tag type="info">
                <i class="el-icon-user"></i>业主新增
              </el-tag>
              <el-tag type="primary">
                <i class="el-icon-s-tools"></i>报修工单
              </el-tag>
              <el-tag type="success">
                <i class="el-icon-money"></i>缴费金额
              </el-tag>
              <el-tag type="warning">
                <i class="el-icon-check"></i>巡检完成
              </el-tag>
            </div>
            <!-- Echarts 图表容器 -->
            <div id="propertyChart" style="width:100%;height:320px;"></div>
          </el-card>
        </el-col>

        <!-- 右侧：物业项目信息 -->
        <el-col :span="8">
          <el-card class="project-card" style="margin-top: 20px;">
            <div class="project-header">运营数据</div>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="报修响应效率">提升80%</el-descriptions-item>
              <el-descriptions-item label="业主缴费率">提升65%</el-descriptions-item>
              <el-descriptions-item label="巡检规范化率">100%</el-descriptions-item>
              <el-descriptions-item label="系统状态"><el-tag type="success">正常运行中</el-tag></el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
      </el-row>

      <!-- 底部版权 -->
      <div class="footer">© 2026 安居无忧物业管理平台 版权所有</div>
    </el-main>
  </el-container>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Home',
  data() {
    return {
      roleId: localStorage.getItem('roleId'),
    roleName: localStorage.getItem('roleName')
    }
  },
  mounted() {
    // 这里可直接接 Echarts 图表
    this.initEcharts()
  },
  methods: {
    // 初始化物业可视化图表
    initEcharts() {
      this.myChart = echarts.init(document.getElementById('propertyChart'))
      this.myChart.setOption({
  title: {
    text: '1-7月物业运营数据',
    left: 'center',
    top: 10,
    textStyle: { fontSize: 22 }
  },
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['业主新增', '报修工单', '缴费金额', '巡检完成'],
    top: 40,
    left: 'center',
    itemGap: 30
  },
  grid: {
    left: '5%',
    right: '12%', // 给右Y轴留出空间
    bottom: '8%',
    top: '22%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
  },
  // 左Y轴：只给缴费金额柱状图用
  yAxis: [
    {
      type: 'value',
      name: '缴费金额(元)',
      min: 0,
      max: 3500,
      position: 'left',
      splitLine: { lineStyle: { color: '#e5e5e5' } }
    },
    // 右Y轴：给所有折线数据用
    {
      type: 'value',
      name: '数量/完成率',
      min: 0,
      max: 120, // 适配巡检完成率(100)和工单/业主数
      position: 'right',
      splitLine: { show: false } // 隐藏右Y轴网格线，避免干扰
    }
  ],
  series: [
    {
      name: '业主新增',
      type: 'line',
      yAxisIndex: 1, // 绑定到右Y轴
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: { color: '#4a78d4', borderColor: '#fff', borderWidth: 2 },
      data: [12, 13, 10, 15, 18, 20, 16]
    },
    {
      name: '报修工单',
      type: 'line',
      yAxisIndex: 1, // 绑定到右Y轴
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: { color: '#86c440', borderColor: '#fff', borderWidth: 2 },
      data: [5, 7, 3, 6, 9, 4, 6]
    },
    {
      name: '缴费金额',
      type: 'bar',
      yAxisIndex: 0, // 绑定到左Y轴
      itemStyle: { color: '#4a4e69' },
      barWidth: '60%',
      data: [2200, 3100, 1900, 2400, 2900, 3200, 2700]
    },
    {
      name: '巡检完成',
      type: 'line',
      yAxisIndex: 1, // 绑定到右Y轴
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: { color: '#ff9a44', borderColor: '#fff', borderWidth: 2 },
      data: [100, 100, 98, 100, 99, 100, 98]
    }
  ]
})
    },

    // 退出登录
    logout() {
      this.$confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除登录状态 + 跳转到登录页
        this.$router.push('/login')
        this.$message.success('退出成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  height: 100vh;
  margin: 0;
  padding: 0;
}

.top-nav {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  .top-title {
    font-size: 16px;
    font-weight: 500;
  }
  .user-area {
    display: flex;
    align-items: center;
    gap: 15px;
  }
}
.content-wrap {
  background: #f5f7fa;
  padding: 20px;
}

/* 统计卡片 */
.stats-card-group {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  .stats-card {
    flex: 1;
    .stats-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      font-size: 14px;
    }
    .stats-value {
      font-size: 28px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }
    .stats-desc {
      font-size: 12px;
      color: #999;
    }
  }
}

/* 报表卡片 */
.report-card {
  height: 400px;
  .report-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .chart-wrap {
    width: 100%;
    height: 320px;
  }
}

/* 项目信息卡片 */
.project-card {
   .el-descriptions {
    margin-top: 10px;
  }
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
</style>