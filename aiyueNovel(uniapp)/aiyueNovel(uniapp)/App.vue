<script>
	export default {
		onLaunch() {
		    // 展示本地存储能力
		    const logs = wx.getStorageSync('logs') || []
		    logs.unshift(Date.now())
		    wx.setStorageSync('logs', logs)
		
		    // 登录
		    wx.login({
		      success: res => {
		        // 发送 res.code 到后台换取 openId, sessionKey, unionId
		      }
		    })
		  },
		  globalData: {
		    userInfo: null
		  }
	}
</script>

<style>
	.container {
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: space-between;
	  padding: 200rpx 0;
	  box-sizing: border-box;
	} 
	
	/* 封面占位样式（无图片，纯颜色） */
	.cover-placeholder {
	  width: 200rpx;
	  height: 260rpx;
	  background-color: #e6f7ff;
	  border-radius: 8rpx;
	}
</style>
