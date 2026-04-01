<template>
  <div class="login-page">
    <el-card class="login-card" shadow="hover">
      <h1 class="title">安居无忧物业管理平台</h1>

      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        :rules="validateRules"
        ref="loginFormRef"
        class="login-form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
            autocomplete="off"
            clearable
          >
            <i class="el-icon-user" slot="prefix"></i>
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
            show-password
            clearable
          >
            <i class="el-icon-key" slot="prefix"></i>
          </el-input>
        </el-form-item>

        <!-- 验证码（点击刷新） -->
        <el-form-item prop="verifyCode">
          <div class="verify-wrapper">
            <el-input
              v-model="loginForm.verifyCode"
              placeholder="验证码"
              autocomplete="off"
              clearable
            >
              <i class="el-icon-picture-outline" slot="prefix"></i>
            </el-input>
            <img
              :src="verifyUrl"
              class="verify-img"
              alt="验证码"
              @click="refreshVerify"
            />
          </div>
        </el-form-item>

        <el-form-item>
        <div class="login-options">
      <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
      <span class="forgot-pwd" @click="goToReset">忘记密码？</span>
       </div>
       </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="handleLogin"
            :loading="loading"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import mockAxios from '@/utils/axiosMock'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        verifyCode: ''
      },
      validateRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 20, message: '账号长度 3-20 位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 20, message: '密码长度 4-20 位', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      verifyUrl: '',
      loading: false,
      rememberMe:false
    }
  },

  created() {
    this.refreshVerify()
  },

  methods: {
    refreshVerify() {
      this.verifyUrl = `https://dummyimage.com/120x40/009688/fff&text=${Math.random().toString().slice(-4)}`
    },

    goToReset() {
  this.$message.info('请联系系统管理员重置密码');
    },

    handleLogin() {
  this.$refs.loginFormRef.validate(async valid => {
    if (!valid) return

    try {
      this.loading = true
      const { data } = await mockAxios.post('/login', this.loginForm)

      if (data.code === 0) {
        // 记住密码逻辑
        if (this.loginForm.rememberMe) {
          // 勾选存账号密码
          localStorage.setItem('username', this.loginForm.username)
          localStorage.setItem('password', this.loginForm.password)
          localStorage.setItem('rememberMe', 'true')
        } else {
          // 没勾选清空
          localStorage.removeItem('username')
          localStorage.removeItem('password')
          localStorage.removeItem('rememberMe')
        }

        // 原有登录存储
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('roleId', data.data.roleId)
        localStorage.setItem('roleName', data.data.name)
        
        this.$store.commit('user/SET_TOKEN', data.data.token)
        this.$store.commit('user/SET_USER_INFO', data.data)

        this.$message.success('登录成功：' + data.data.name)
        setTimeout(() => this.$router.push('/index'), 800)
      } else {
        this.$message.error(data.msg || '账号/密码/验证码错误')
        this.refreshVerify()
      }
    } catch (err) {
      this.$message.error('系统异常')
    } finally {
      this.loading = false
    }
  })
}
  },
  created(){
    // 自动读取记住密码
  const rememberMe = localStorage.getItem('rememberMe') === 'true'
  if (rememberMe) {
    this.loginForm.username = localStorage.getItem('username')
    this.loginForm.password = localStorage.getItem('password')
    this.loginForm.rememberMe = true
  }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background: url("../assets/bgc.png") no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 460px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  .title {
    text-align: center;
    font-size: 24px;
    color: #1989fa;
    margin: 20px 0 30px;
  }
}

.login-form {
  padding: 0 40px 30px;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 20px 0;
  font-size: 14px;
}

.remember-me {
  color: #666;
  cursor: pointer;
}

/* 忘记密码 */
.forgot-pwd {
  color: #409eff;
  cursor: pointer;
  transition: color 0.2s;
}

.forgot-pwd:hover {
  color: #66b1ff;
  text-decoration: underline;
}

.verify-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;

  .verify-img {
    width: 120px;
    height: 40px;
    border-radius: 4px;
    cursor: pointer;
  }
}

.login-btn {
  width: 100%;
  background: #1989fa;
  border-color: #1989fa;
}
</style>