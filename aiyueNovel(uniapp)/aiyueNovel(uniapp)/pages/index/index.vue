<template>
	<view class="container">
		<view class="top-bar">
			<text id="logo">爱阅小说阅读平台</text>
			<view class="icon-group">
				<van-icon name="bar-chart-o" size="23px" @click="goToBookShelf" />
				<van-icon name="contact-o" size="23px" @click="login" />
			</view>
		</view>
		
		<button @click="login">登录</button>
		
		<van-cell-group>
			<van-field :value="value" @input="onInputChange" placeholder="请输入书名.作者">
				<van-button slot="button" size="small" type="primary" @click="searchBook">
					搜索
				</van-button>
			</van-field>
		</van-cell-group>
		
		<van-cell title="精品推荐" />
		<scroll-view scroll-x="true" class="jingpin">
			<view style="display: flex;width: 1285px;">
				<view class="jingpin-item" v-for="(item,index) in jingpinList" :key="item.id" @click="getBookInfo"
					:data-id="item.id">
					<image src="" class="cover-placeholder" />
					<view id="titlename">{{item.title}}</view>
				</view>
			</view>
		</scroll-view>
		
		<van-cell title="热门推荐" />
		<view class="novelcontainer" v-for="(item,index) in bookList" :key="item.id">
			<view class="containbox" @click="getBookInfo" :data-id="item.id">
				<view class="novelimg">
					<image src="" mode="" class="cover-placeholder" />
				</view>
				<view class="novelinfo">
					<text id="novelname">{{item.title}}</text>
					<view id="bookauthor">作者:{{item.author}}</view>
					<view class="noveldesc">
						<rich-text :nodes="item.desc || '简介：这是一本精彩小说'" />
					</view>
				</view>
			</view>
		</view>
		
		<van-cell title="最新更新" value="更多 >>" />
		<view style="padding-bottom: 30rpx;" v-for="(item,index) in updateRankList" :key="item.id">
			<view class="bookinfo" @click="getBookInfo" :data-id="item.id">
				<view class="authoeinfo">
					<text id="bookname">{{index+1}}.{{item.title}}</text>
					<text> - </text>
					<text id="bookauthor">{{item.author}}</text>
				</view>
				<view id="bookdate">{{item.year || '未知时间'}}</view>
			</view>
			<view class="bookdesc">
				<rich-text :nodes="item.desc || '暂无简介'" />
			</view>
		</view>
		
		<van-tabbar v-model="active" @change="onTabbarChange">
			<van-tabbar-item icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item icon="clock-o" @click="goToReadHistory">阅读记录</van-tabbar-item>
			<van-tabbar-item icon="label-o" @click="goToBookShelf">书架</van-tabbar-item>
			<van-tabbar-item icon="user-o" @click="goToMine">我的</van-tabbar-item>
		</van-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 1,
				jingpinList: [],
				bookList: [],
				updateRankList: [],
				value: ""
			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			},
			onInputChange(e) {
				console.log(e);
				this.value = e.detail
			},
			searchBook() {
				const {
					value
				} = this;
				uni.navigateTo({
					url: `/pages/bookList/bookList?value=${encodeURIComponent(value)}`
				});
			},
			getjingpinList() {
				const mockData = [
					[],
					[],
					[],
					[],
					[{
							id: 1,
							title: "精品小说1",
							author: "作者A"
						},
						{
							id: 2,
							title: "精品小说2",
							author: "作者B"
						},
						{
							id: 3,
							title: "精品小说3",
							author: "作者C"
						}
					]
				]
				this.jingpinList = mockData[4]
			},
			getbookList() {
				const mockData = [
					[],
					[],
					[],
					[{
							id: 4,
							title: "热门小说1",
							author: "作者D"
						},
						{
							id: 5,
							title: "热门小说2",
							author: "作者E"
						},
						{
							id: 6,
							title: "热门小说3",
							author: "作者F"
						}
					]
				]
				this.bookList = mockData[3]
			},
			getUpdateRank() {
				const mockData = [{
						id: 7,
						title: "更新排行1",
						author: "作者G",
						desc: "这是最新更新小说3的简介。",
						year: "2025-12-20"
					},
					{
						id: 8,
						title: "更新排行2",
						author: "作者H",
						desc: "这是最新更新小说2的简介。",
						year: "2025-12-20"
					},
					{
						id: 9,
						title: "更新排行3",
						author: "作者I",
						desc: "这是最新更新小说3的简介。",
						year: "2025-12-20"
					}
				]
				this.updateRankList = mockData
			},
			onTabbarChange(event) {
				this.active = event.detail;
			},
			getBookInfo(e) {
				const Id = e.currentTarget.dataset.id;
				if (!Id) {
					uni.showToast({
						title: "书籍ID异常",
						icon: "none"
					});
					return;
				}
				uni.navigateTo({
					url: `/pages/bookDetail/bookDetail?Id=${Id}`
				});
			},
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
			goToBookShelf() {
				if (!this.checkLogin()) return;
				uni.navigateTo({
					url: "/pages/bookShelf/bookShelf"
				});
			},
			goToReadHistory() {
				if (!this.checkLogin()) return;
				uni.navigateTo({
					url: "/pages/readHistory/readHistory"
				});
			},
			goToMine() {
				uni.navigateTo({
					url: "/pages/mine/mine"
				})
			}
		},
		onLoad() {
			this.getjingpinList()
			this.getbookList()
			this.getUpdateRank()
		}
	}
</script>

<style>
	page {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
	}

	#logo {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}

	.icon-group {
		display: flex;
		gap: 20rpx;
	}

	.van-tab {
		background-color: green;
		color: white;
	}

	.novelcontainer {
		width: 390rpx;
		height: auto;
		margin-bottom: 20rpx;
	}

	.novelimg {
		padding: 0 15rpx;
	}

	.novelimg>image {
		width: 100px;
		height: 125px;
	}

	.containbox {
		display: flex;
		align-items: center;
	}

	.noveldesc {
		overflow: hidden;
		width: 240px;
		height: 70rpx;
		color: #a6a6a6;
		font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
	}

	.bookinfo {
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
	}

	.authorinfo {
		height: 44rpx;
		width: 448rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	#bookname {
		color: #333;
		font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
	}

	#bookauthor {
		color: #a6a6a6;
		font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
		margin-left: 10rpx;
	}

	#bookdate {
		color: #ff5722;
		font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
		font-style: italic
	}

	.bookdesc {
		overflow: hidden;
		height: 40rpx;
		color: #a6a6a6;
		font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
		padding: 0 20rpx;
	}

	.jingpin {
		width: 750rpx;
		height: 340rpx;
	}

	.jingpin-item>image {
		width: 100px;
		height: 125px;
	}

	.jingpin-item {
		width: 200rpx;
		height: 172rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#titlename {
		color: #333;
		font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
		margin-top: 10rpx;
		text-align: center;
	}

	van-tabbar {
		background: #ffffff !important;
		border-top: none !important;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.van-tabbar-item--active {
		color: #1677ff !important;
	}

	.van-tabbar-item {
		color: #666666 !important;
	}

	.van-tabbar-item__icon {
		font-size: 38rpx !important;
	}

	.van-tabbar-item__text {
		font-size: 24rpx !important;
		margin-top: 6rpx !important;
	}
</style>