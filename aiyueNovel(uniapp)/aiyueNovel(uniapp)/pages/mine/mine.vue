<template>
	<view class="container">
		<!-- 头像区域 -->
		<view class="avatar-box">
			<van-image round width="140rpx" height="140rpx" src="https://img95.699pic.com/element/40204/2746.png_860.png" />
			<view class="nickname">{{nickName}}</view>
			<view class="balance">账户余额：¥{{accountBalance}}</view>
		</view>
		
		<!-- 菜单列表 -->
		<van-cell-group inset class="menu-group">
			<van-cell icon="gold-coin-o" is-link title="充值中心" url="/pages/dashboard/index" />
		
			<van-cell icon="label-o" is-link title="我的书架" @click="goToBookShelf" />
		
			<van-cell icon="clock-o" is-link title="阅读历史" @click="getReadHistory" />
		</van-cell-group>
		
		<!-- 退出登录 -->
		<view class="exit-box">
			<van-button round type="danger" plain @click="exitLogin" custom-style="width:90%;">
				退出登录
			</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: "游客",
				accountBalance: "*",
				userinfo: {}
			}
		},
		methods: {
			getUserInfo() {
				const token = uni.getStorageSync("token");

				if (!token) {
					this.nickName = "游客";
					this.accountBalance = "*";
					this.userinfo = {};
					return;
				}

				const res = {
					data: {
						nickName: "18897918203",
						accountBalance: "100"
					}
				};

				const userinfo = res.data || {};
				const { nickName, accountBalance } = res.data;

				this.userinfo = userinfo;
				this.nickName = nickName;
				this.accountBalance = accountBalance;
			},

			// 登录校验
			checkLogin() {
				const token = uni.getStorageSync("token");
				if (!token) {
					uni.showToast({
						title: "请先登录",
						icon: "none"
					});
					uni.navigateTo({
						url: "/pages/login/login"
					});
					return false;
				}
				return true;
			},

			// 我的书架（带权限）
			goToBookShelf() {
				if (!this.checkLogin()) return;
				uni.navigateTo({
					url: "/pages/bookShelf/bookShelf"
				});
			},

			// 阅读历史（带权限）
			getReadHistory() {
				if (!this.checkLogin()) return;
				uni.navigateTo({
					url: "/pages/readHistory/readHistory"
				});
			},

			// 退出登录
			exitLogin() {
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							uni.clearStorageSync();
							uni.reLaunch({
								url: '/pages/login/login'
							});
							uni.showToast({
								title: '退出成功',
								icon: 'success'
							});
						}
					}
				});
			}
		},

		onLoad(options) {
			this.getUserInfo();
		},

		onShow() {
			this.getUserInfo();
		},
	}
</script>

<style>
	.avatar-box {
		text-align: center;
		margin: 40rpx 0;
	}

	.nickname {
		font-size: 36rpx;
		font-weight: bold;
		margin-top: 20rpx;
	}

	.balance {
		font-size: 28rpx;
		color: #666;
		margin-top: 10rpx;
	}

	.menu-group {
		margin: 20rpx;
	}

	.exit-box {
		text-align: center;
		margin-top: 80rpx;
	}
</style>