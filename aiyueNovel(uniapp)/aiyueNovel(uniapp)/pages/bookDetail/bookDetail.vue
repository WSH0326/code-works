<template>
	<view class="container">
		<view class="detail-container">
			<view v-if="loading" class="loading">加载中...</view>

			<view v-else class="book-detail">
				<view class="book-pic">
					<image src="" mode="" class="cover-placeholder" />
				</view>

				<view class="book-base-info">
					<text class="book-name">{{bookInfo.bookName}}</text>
					<view class="book-author">作者：{{bookInfo.authorName}}</view>
					<view class="book-category">类别：{{bookInfo.catName || '未知分类'}}</view>
					<view>状态：{{bookInfo.status === 1 ? '连载中' : '已完结'}}</view>
					<view>更新：{{bookInfo.year|| '暂无'}}</view>
					<view class="book-word-count">评分：{{bookInfo.score || 0}}</view>
					<view class="book-visit-count">点击：{{bookInfo.visitCount || 0}}</view>
				</view>

				<view class="btn-group">
					<view class="custom-btn btn-read" @click="beginRead">开始阅读</view>
					<view class="custom-btn btn-shelf" @click="addToBookshelf">加入书架</view>
				</view>

				<view class="book-desc">
					<text class="desc-title">书籍简介：</text>
					<rich-text :nodes="bookInfo.bookDesc" />
				</view>

				<view class="collapse-title">最新章节</view>
				<view class="collapse-content">
					<view v-for="(item,index) in newIndex" :key="item.id" :data-bookindexid="item.id" @click="getIndex">
						{{item.indexName}}
					</view>
				</view>

				<view class="cell-item" @click="getAllIndex">
					<text>完整目录</text>
					<text>></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Id: "",
				firstIndexId: "",
				bookIndexId: "",
				bookInfo: {},
				loading: true,
				activeNames: ['1'],
				newIndex: [],
				indexList: [],
				Indextext: {},
				isInBookshelf: false,
				shelfLoading: false,
				shelfList: []
			}
		},
		methods: {
			onindexChange(event) {
				this.setData({
					activeNames: event.detail
				});
			},

			beginRead() {
				this.addReadHistory()
				const {
					Id,
					indexList
				} = this.data;
				if (!Id || indexList.length === 0) {
					uni.showToast({
						title: "暂无章节",
						icon: "none"
					});
					return;
				}
				const firstIndexId = indexList[0].id;
				uni.navigateTo({
					url: `/pages/Indextext/Indextext?Id=${Id}&bookIndexId=${firstIndexId}`
				});
			},

			getIndex(e) {
				const bookIndexId = e.currentTarget.dataset.bookindexid;
				uni.navigateTo({
					url: `/pages/Indextext/Indextext?Id=${this.data.Id}&bookIndexId=${bookIndexId}`
				});
			},

			getAllIndex() {
				uni.navigateTo({
					url: `/pages/allIndex/allIndex?Id=${this.data.Id}`
				});
			},

			addToBookshelf() {
				const {
					Id,
					bookInfo,
					firstIndexId
				} = this.data;

				let shelfList = uni.getStorageSync("shelfList") || [];

				const exist = shelfList.find(item => item.Id == Id);
				if (exist) {
					uni.showToast({
						title: "已在书架",
						icon: "none"
					});
					return;
				}

				shelfList.push({
					Id: Id,
					bookName: bookInfo.bookName,
					authorName: bookInfo.authorName,
					picUrl: bookInfo.picUrl,
					firstIndexId: firstIndexId || "1001"
				});

				uni.setStorageSync("shelfList", shelfList);

				uni.showToast({
					title: "加入书架成功"
				});
				this.setData({
					isInBookshelf: true
				});
			},

			addReadHistory() {
				const {
					Id,
					bookInfo
				} = this.data;
				if (!Id || !bookInfo) return;

				let readHistory = uni.getStorageSync("readHistory") || [];

				readHistory = readHistory.filter(item => item.bookId != Id);

				readHistory.unshift({
					bookId: Id,
					bookName: bookInfo.bookName,
					authorName: bookInfo.authorName,
					picUrl: bookInfo.picUrl,
					time: new Date().toLocaleString()
				});

				if (readHistory.length > 50) readHistory = readHistory.slice(0, 50);

				uni.setStorageSync("readHistory", readHistory);
			}
		},
		onLoad(options) {
			const bookId = options.Id;
			this.setData({
				Id: bookId
			});
			this.loadBookByClickId(bookId);
		},

		loadBookByClickId(bookId) {
			const bookData = {
				1: {
					bookName: "精品小说1",
					authorName: "作者A",
					picUrl: "/static/default.jpg",
					catName: "精品",
					status: 1,
					year: "2025-12-20",
					score: 9.5,
					visitCount: 12300,
					bookDesc: "这是精品小说1的详细简介，内容非常精彩。"
				},
				2: {
					bookName: "精品小说2",
					authorName: "作者B",
					picUrl: "/static/default.jpg",
					catName: "精品",
					status: 1,
					year: "2025-12-20",
					score: 9.6,
					visitCount: 11200,
					bookDesc: "这是精品小说2的详细简介，内容非常精彩。"
				},
				3: {
					bookName: "精品小说3",
					authorName: "作者C",
					picUrl: "/static/default.jpg",
					catName: "精品",
					status: 1,
					year: "2025-12-20",
					score: 9.7,
					visitCount: 15400,
					bookDesc: "这是精品小说3的详细简介，内容非常精彩。"
				},
				4: {
					bookName: "热门小说1",
					authorName: "作者D",
					picUrl: "/static/default.jpg",
					catName: "热门",
					status: 1,
					year: "2025-12-20",
					score: 9.8,
					visitCount: 28900,
					bookDesc: "这是热门小说1的详细简介，超级火爆，人人都在看！"
				},
				5: {
					bookName: "热门小说2",
					authorName: "作者E",
					picUrl: "/static/default.jpg",
					catName: "热门",
					status: 1,
					year: "2025-12-20",
					score: 9.7,
					visitCount: 25600,
					bookDesc: "这是热门小说2的详细简介，超级火爆，人人都在看！"
				},
				6: {
					bookName: "热门小说3",
					authorName: "作者F",
					picUrl: "/static/default.jpg",
					catName: "热门",
					status: 1,
					year: "2025-12-20",
					score: 9.6,
					visitCount: 23100,
					bookDesc: "这是热门小说3的详细简介，超级火爆，人人都在看！"
				},
				7: {
					bookName: "更新排行1",
					authorName: "作者G",
					picUrl: "/static/default.jpg",
					catName: "更新",
					status: 1,
					year: "2025-12-20",
					score: 9.9,
					visitCount: 32100,
					bookDesc: "这是最新更新小说1的简介。"
				},
				8: {
					bookName: "更新排行2",
					authorName: "作者H",
					picUrl: "/static/default.jpg",
					catName: "更新",
					status: 1,
					year: "2025-12-20",
					score: 9.8,
					visitCount: 31000,
					bookDesc: "这是最新更新小说2的简介。"
				},
				9: {
					bookName: "更新排行3",
					authorName: "作者I",
					picUrl: "/static/default.jpg",
					catName: "更新",
					status: 1,
					year: "2025-12-20",
					score: 9.7,
					visitCount: 29800,
					bookDesc: "这是最新更新小说3的简介。"
				}
			};

			const chapters = [{
					id: 1001,
					indexName: "第一章 开端"
				},
				{
					id: 1002,
					indexName: "第二章 发展"
				},
				{
					id: 1003,
					indexName: "第三章 高潮"
				}
			];

			const currentBook = bookData[bookId] || bookData[4];

			this.setData({
				bookInfo: currentBook,
				newIndex: chapters,
				indexList: chapters,
				firstIndexId: chapters[0].id,
				loading: false
			});
		}
	}
</script>

<style>
	.detail-container {
		padding: 20rpx;
	}

	.loading {
		text-align: center;
		padding: 50rpx 0;
		font-size: 28rpx;
		color: #999;
	}

	.book-detail {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.book-pic {
		width: 200rpx;
		height: 280rpx;
		margin: 0 auto;
	}

	.book-pic image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 10rpx;
	}

	.book-base-info {
		text-align: center;
	}

	.book-name {
		font-size: 36rpx;
		font-weight: bold;
	}

	.book-author {
		font-size: 28rpx;
		color: #666;
		margin: 10rpx 0;
	}

	.book-category,
	.book-word-count {
		font-size: 26rpx;
		color: #999;
	}

	.btn-group {
		margin: 0 auto;
		display: flex;
	}

	.custom-btn {
		padding: 12rpx 30rpx;
		border-radius: 6rpx;
		font-size: 26rpx;
		margin: 0 10rpx;
	}

	.btn-read {
		background: #3eaf7c;
		color: #fff;
	}

	.btn-shelf {
		background: #fff;
		color: #000;
		border: 1rpx solid #000;
	}

	.book-desc {
		padding: 20rpx;
		background: #f5f5f5;
		border-radius: 10rpx;
	}

	.desc-title {
		font-size: 28rpx;
		font-weight: bold;
		display: block;
		margin-bottom: 10rpx;
	}

	.collapse-title {
		padding: 20rpx;
		background: #f5f5f5;
		border-radius: 10rpx;
		font-size: 28rpx;
		font-weight: bold;
	}

	.collapse-content {
		padding: 20rpx;
		font-size: 26rpx;
		line-height: 1.8;
	}

	.chapter-item {
		padding: 8rpx 0;
	}

	.cell-item {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		background: #f5f5f5;
		border-radius: 10rpx;
		font-size: 28rpx;
		margin-top: 10rpx;
	}
</style>