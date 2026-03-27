<template>
	<view class="container">
		<view v-if="loading" class="loading">
			加载书架中...
		</view>
		
		<view v-else-if="empty" class="empty-shelf">
			<text>你的书架还是空的~</text>
			<button @click="goToHome">去添加书籍</button>
		</view>
		
		<view v-else class="shelf-container">
			<view v-for="(item,index) in shelfList" :key="item.Id" class="book-card">
				<view class="book-main" @click="toReadBook" :data-id="item.Id"
					:data-firstindexid="item.firstIndexId">
					<image class="cover" :src="item.picUrl || '/static/default-cover.png'"></image>
					
					<view class="book-info">
						<text class="book-name">{{item.bookName}}</text>
						<text class="author" v-if="item.authorName">作者：{{item.authorName}}</text>
					</view>
				</view>
				
				<button class="del-btn" @click="removeFromShelf" :data-id="item.Id">
					移除
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curr: 1,
				limit: 20,
				shelfList: [],
				loading: true,
				empty: false
			}
		},
		methods: {
			getShelfList() {
				this.loading = true;
				const localShelf = uni.getStorageSync("shelfList") || [];
				this.shelfList = localShelf;
				this.empty = localShelf.length === 0;
				this.loading = false;
			},

			toReadBook(e) {
				const {
					id,
					firstindexid
				} = e.currentTarget.dataset;
				if (!id || !firstindexid) {
					uni.showToast({
						title: "书籍信息异常",
						icon: "none"
					});
					return;
				}
				uni.navigateTo({
					url: `/pages/bookDetail/bookDetail?Id=${id}&bookIndexId=${firstindexid}`
				});
			},

			removeFromShelf(e) {
				const bookId = e.currentTarget.dataset.id;

				uni.showModal({
					title: "提示",
					content: "确定从书架移除该书籍吗？",
					success: (res) => {
						if (res.confirm) {
							let shelfList = uni.getStorageSync("shelfList") || [];
							shelfList = shelfList.filter(book => book.Id !== bookId);
							uni.setStorageSync("shelfList", shelfList);

							this.shelfList = shelfList;
							this.empty = shelfList.length === 0;

							uni.showToast({
								title: "移除成功",
								icon: "success"
							});
						}
					}
				});
			},

			goToHome() {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		},

		onLoad() {
			this.getShelfList();
		}
	}
</script>

<style>
	.loading {
		text-align: center;
		padding: 40rpx;
		font-size: 28rpx;
		color: #666;
	}

	.empty-shelf {
		text-align: center;
		padding: 80rpx 0;
	}

	.empty-shelf text {
		display: block;
		margin-bottom: 30rpx;
		color: #999;
	}

	.empty-shelf button {
		background: #2b6cbc;
		color: white;
		border-radius: 50rpx;
	}

	.shelf-container {
		padding: 20rpx;
	}

	.book-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: white;
		border-radius: 16rpx;
		padding: 25rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.book-main {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.cover {
		width: 120rpx;
		height: 160rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
		background: #f5f5f5;
	}

	.book-info {
		flex: 1;
	}

	.book-name {
		font-size: 32rpx;
		font-weight: bold;
		display: block;
		margin-bottom: 10rpx;
	}

	.author {
		font-size: 26rpx;
		color: #999;
	}

	.del-btn {
		font-size: 24rpx;
		background: #ff4444;
		color: white;
		border-radius: 30rpx;
		padding: 8rpx 20rpx;
		border: none;
		margin-left: 20rpx;
	}
</style>