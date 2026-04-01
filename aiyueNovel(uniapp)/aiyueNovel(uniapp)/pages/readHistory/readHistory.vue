<template>
	<view class="container">
		<!-- 加载中 -->
		<view v-if="loading" class="loading">
			加载中...
		</view>

		<!-- 空数据 -->
		<view v-else-if="empty" class="empty">
			暂无阅读记录
		</view>

		<!-- 阅读历史列表 -->
		<view v-else class="history-list">
			<view class="item" v-for="item in readList" :key="item.id">
				<view class="info" @click="toReadBook" :data-id="item.id">
					<text class="title">{{ item.title }}</text>
					<text class="time">{{ item.time }}</text>
				</view>
				<view class="del" @click="removeHistory" :data-id="item.id">
					删除
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookId: "",
				curr: 1,
				limit: 20,
				readList: [],
				empty: false,
				loading: true
			}
		},
		methods:{
			// 获取阅读历史
			getReadHistory() {
				this.loading = true;

				// 从本地缓存读取阅读历史
				const localHistory = uni.getStorageSync("readHistory") || [];

				setTimeout(() => {
					this.readList = localHistory;
					this.empty = localHistory.length === 0;
					this.loading = false;
				}, 300);
			},

			// 跳转到书籍详情
			toReadBook(e) {
				const bookId = e.currentTarget.dataset.id;
				if (!bookId) {
					uni.showToast({
						title: "书籍信息异常",
						icon: "none"
					});
					return;
				}
				uni.navigateTo({
					url: `/pages/bookDetail/bookDetail?Id=${bookId}`,
				});
			},

			// 删除阅读历史
			removeHistory(e) {
				const bookId = e.currentTarget.dataset.id;
				let localHistory = uni.getStorageSync("readHistory") || [];
				localHistory = localHistory.filter(item => item.id != bookId);

				uni.setStorageSync("readHistory", localHistory);

				this.readList = localHistory;
				this.empty = localHistory.length === 0;

				uni.showToast({
					title: "已移除",
					icon: "success"
				});
			}
		},

		onLoad(options) {
			this.getReadHistory();
			const bookId = options.Id;
			this.bookId = bookId;
		},

		onPullDownRefresh() {
			this.getReadHistory();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 500);
		},

		onReachBottom() {
			uni.showToast({
				title: "没有更多数据了",
				icon: "none"
			});
		}
	}
</script>

<style scoped>
	.container {
		padding: 20rpx;
		background: #f5f5f5;
		min-height: 100vh;
	}

	.loading {
		text-align: center;
		padding: 40rpx 0;
		color: #666;
	}

	.empty {
		text-align: center;
		padding: 60rpx 0;
		color: #999;
	}

	.history-list {
		background: #fff;
		border-radius: 12rpx;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx;
		border-bottom: 1rpx solid #eee;
	}

	.item:last-child {
		border-bottom: none;
	}

	.info {
		flex: 1;
	}

	.title {
		display: block;
		font-size: 30rpx;
		color: #333;
		margin-bottom: 8rpx;
	}

	.time {
		font-size: 24rpx;
		color: #999;
	}

	.del {
		color: #ff4444;
		font-size: 26rpx;
		padding: 10rpx;
	}
</style>