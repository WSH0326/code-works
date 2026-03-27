<template>
	<view class="container">
		<view class="page-container">
			<view v-for="(item,index) in bookList" :key="item.id" class="novelcontainer">
				<view class="containbox" @click="getBookInfo" :data-id="item.id">
					<view class="novelimg">
						<image src="" mode="aspectFill" class="cover-placeholder"></image>
					</view>
					<view class="novelinfo">
						<view id="novelname">{{item.bookName}}</view>
						<view id="bookauthor">{{item.authorName}}</view>
						<view class="noveldesc">{{item.desc || '暂无简介'}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					curr: 1,
					limit: 10,
					sort: "last_index_update_time",
					keyword: ""
				},
				bookList: [],
				pages: 0,
				isLoading: false
			}
		},
		methods: {
			// 搜索书籍
			searchBook() {
				if (this.isLoading) return;
				this.isLoading = true;

				// 模拟所有书籍数据
				const allBooks = [{
						id: 1,
						bookName: "精品小说1",
						authorName: "作者A",
						picUrl: "/static/default.jpg",
						catName: "精品",
						desc: "这是精品小说1的详细简介，内容非常精彩。"
					},
					{
						id: 2,
						bookName: "精品小说2",
						authorName: "作者B",
						picUrl: "/static/default.jpg",
						catName: "精品",
						desc: "这是精品小说2的详细简介，内容非常精彩。"
					},
					{
						id: 3,
						bookName: "精品小说3",
						authorName: "作者C",
						picUrl: "/static/default.jpg",
						catName: "精品",
						desc: "这是精品小说3的详细简介，内容非常精彩。"
					},
					{
						id: 4,
						bookName: "热门小说1",
						authorName: "作者D",
						picUrl: "/static/default.jpg",
						catName: "热门",
						desc: "这是热门小说1的详细简介，超级火爆，人人都在看！"
					},
					{
						id: 5,
						bookName: "热门小说2",
						authorName: "作者E",
						picUrl: "/static/default.jpg",
						catName: "热门",
						desc: "这是热门小说2的详细简介，超级火爆，人人都在看！"
					},
					{
						id: 6,
						bookName: "热门小说3",
						authorName: "作者F",
						picUrl: "/static/default.jpg",
						catName: "热门",
						desc: "这是热门小说3的详细简介，超级火爆，人人都在看！"
					},
					{
						id: 7,
						bookName: "更新排行1",
						authorName: "作者G",
						picUrl: "/static/default.jpg",
						catName: "更新",
						desc: "这是最新更新小说1的简介。"
					},
					{
						id: 8,
						bookName: "更新排行2",
						authorName: "作者H",
						picUrl: "/static/default.jpg",
						catName: "更新",
						desc: "这是最新更新小说2的简介。"
					},
					{
						id: 9,
						bookName: "更新排行3",
						authorName: "作者I",
						picUrl: "/static/default.jpg",
						catName: "更新",
						desc: "这是最新更新小说3的简介。"
					},
				];

				const keyword = this.params.keyword || "";
				let filteredBooks = allBooks;

				// 搜索过滤
				if (keyword.trim()) {
					filteredBooks = allBooks.filter(item =>
						item.bookName.includes(keyword)
					);
				}

				setTimeout(() => {
					this.bookList = filteredBooks;
					this.pages = 1;
					this.isLoading = false;
				}, 300);
			},

			// 跳转到书籍详情
			getBookInfo(e) {
				const bookId = e.currentTarget.dataset.id;
				uni.navigateTo({
					url: `/pages/bookDetail/bookDetail?Id=${bookId}`
				});
			}
		},

		onLoad(options) {
			const keyword = options.value ? decodeURIComponent(options.value) : "";
			this.params.keyword = keyword;
			this.params.curr = 1;
			this.bookList = [];
			this.searchBook();
		},

		onReachBottom() {
			if (this.isLoading || this.params.curr >= this.pages) return;
			this.params.curr = this.params.curr + 1;
			this.searchBook();
		},
	}
</script>

<style>
	.page-container {
		padding: 10rpx;
		min-height: 100vh;
		background-color: #f5f5f5;
	}

	/* 空数据提示 */
	.empty-tips {
		text-align: center;
		padding: 100rpx 0;
		font-size: 28rpx;
		color: #999;
	}

	/* 单本书籍条目容器 */
	.novelcontainer {
		padding: 15rpx;
		background-color: #fff;
		margin-bottom: 10rpx;
		border-radius: 8rpx;
	}

	/* 点击区域（flex布局，避免内容错乱） */
	.containbox {
		display: flex;
		align-items: flex-start;
		gap: 20rpx;
	}

	/* 书籍封面容器 */
	.novelimg {
		flex-shrink: 0;
		width: 120rpx;
		height: 160rpx;
	}

	.novelimg image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	/* 书籍信息区域 */
	.novelinfo {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	/* 书名样式 */
	#novelname {
		font-size: 32rpx;
		font-weight: 600;
		line-height: 40rpx;
		color: #333;
	}

	/* 作者样式 */
	#bookauthor {
		font-size: 26rpx;
		color: #999;
		margin: 10rpx 0;
	}

	/* 简介样式 */
	.noveldesc {
		font-size: 24rpx;
		color: #666;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* 加载更多 / 分页提示 */
	.page-tips {
		text-align: center;
		padding: 20rpx 0;
		font-size: 26rpx;
		color: #999;
	}
</style>