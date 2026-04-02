<template>
	<view class="container">
		<view class="toolbar">
			<text @click="getLastIndex">上一章</text>
			<text @click="getAllIndex">目录</text>
			<text @click="getNextIndex">下一章</text>
		</view>

		<view class="content-wrap" v-if="!isEmptyObject(Indextext)">
			<view class="chapter-title">{{Indextext.title}}</view>
			<view class="chapter-content">{{Indextext.content}}</view>
		</view>

		<view class="empty-tip" v-else>暂无章节内容</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Id: "",
				bookIndexId: "",
				currentIndex: 0,
				Indextext: {},
				loading: true,
				indexList: []
			}
		},
		methods: {
			replaceHtmlSymbols(obj) {
				if (typeof obj === 'string') {
					return obj
						.replace(/&nbsp;/g, ' ')
						.replace(/<br\s*\/?>/gi, '\n')
						.replace(/&amp;/g, '&')
						.replace(/&lt;/g, '<')
						.replace(/&gt;/g, '>');
				}
				if (typeof obj === 'object' && obj !== null) {
					for (let key in obj) {
						obj[key] = this.replaceHtmlSymbols(obj[key]);
					}
				}
				return obj;
			},

			isEmptyObject(obj) {
				return Object.keys(obj).length === 0;
			},

			setScreenBrightness() {
				uni.setScreenBrightness({
					value: 0.7
				});
			},

			cacheChapter() {
				const { Id, bookIndexId, Indextext } = this;
				const key = `chapter_${Id}_${bookIndexId}`;
				uni.setStorageSync(key, Indextext);
			},

			preloadNextChapter() {
				const { currentIndex, indexList } = this;
				if (currentIndex + 1 >= indexList.length) return;
				const nextId = indexList[currentIndex + 1].id;
				console.log("预加载下一章：" + nextId);
			},

			saveReadProgress() {
				const { Id, bookIndexId, Indextext } = this;
				const progress = {
					bookId: Id,
					chapterId: bookIndexId,
					title: Indextext.title,
					time: new Date().toLocaleString()
				};
				uni.setStorageSync("lastRead", progress);
			},

			getLocalChapterList(bookId) {
				const allChapters = {
					1: [{
							id: 1001,
							indexName: "第一章 初入江湖"
						},
						{
							id: 1002,
							indexName: "第二章 修炼功法"
						},
						{
							id: 1003,
							indexName: "第三章 小试牛刀"
						}
					],
					2: [{
							id: 2001,
							indexName: "第一章 神秘传承"
						},
						{
							id: 2002,
							indexName: "第二章 宗门试炼"
						},
						{
							id: 2003,
							indexName: "第三章 名扬四海"
						}
					],
					4: [{
							id: 4001,
							indexName: "第一章 陨落的天才"
						},
						{
							id: 4002,
							indexName: "第二章 觉醒系统"
						},
						{
							id: 4003,
							indexName: "第三章 横扫八方"
						}
					],
					5: [{
							id: 5001,
							indexName: "第一章 末日降临"
						},
						{
							id: 5002,
							indexName: "第二章 基地建设"
						},
						{
							id: 5003,
							indexName: "第三章 幸存者联盟"
						}
					]
				};
				return allChapters[bookId] || allChapters[4];
			},

			getLocalText(bookId, chapterId) {
				const contentData = {
					1001: {
						title: "第一章 初入江湖",
						content: "这是精品小说1的第一章内容，主角踏上了修仙之路……"
					},
					1002: {
						title: "第二章 修炼功法",
						content: "主角获得神秘功法，修为一日千里……"
					},
					4001: {
						title: "第一章 陨落的天才",
						content: "曾经的天才一朝落魄，却意外获得逆天系统……"
					},
					4002: {
						title: "第二章 觉醒系统",
						content: "系统激活，主角从此逆袭人生，无人能挡！"
					},
					2001: {
						title: "第一章 神秘传承",
						content: "意外获得上古传承，从此一路高歌猛进……"
					},
					5001: {
						title: "第一章 末日降临",
						content: "丧尸围城，主角如何绝境求生……"
					}
				};
				return contentData[chapterId] || {
					title: "章节缺失",
					content: "该章节内容不存在~"
				};
			},

			getText() {
				const { Id, bookIndexId } = this;
				if (!Id || !bookIndexId) {
					uni.showToast({
						title: "参数异常",
						icon: "none"
					});
					return;
				}

				const content = this.getLocalText(Id, bookIndexId);
				this.Indextext = this.replaceHtmlSymbols(content);
				this.loading = false;

				this.setScreenBrightness();
				this.cacheChapter();
				this.preloadNextChapter();
				this.saveReadProgress();
			},

			getLastIndex() {
				const { currentIndex, indexList } = this;
				if (currentIndex <= 0) {
					uni.showToast({
						title: "已是第一章",
						icon: "none"
					});
					return;
				}
				const newIndex = currentIndex - 1;
				const prevId = indexList[newIndex].id;
				this.currentIndex = newIndex;
				this.bookIndexId = prevId;
				this.getText();
			},

			getNextIndex() {
				const { currentIndex, indexList } = this;
				if (currentIndex >= indexList.length - 1) {
					uni.showToast({
						title: "已是最后一章",
						icon: "none"
					});
					return;
				}
				const newIndex = currentIndex + 1;
				const nextId = indexList[newIndex].id;
				this.currentIndex = newIndex;
				this.bookIndexId = nextId;
				this.getText();
			},

			getAllIndex() {
				uni.navigateTo({
					url: `/pages/allIndex/allIndex?Id=${this.Id}`
				});
			}
		},

		onLoad(options) {
			const Id = options.Id;
			const bookIndexId = options.bookIndexId;

			if (!Id || !bookIndexId) {
				uni.showToast({
					title: "参数错误",
					icon: "none"
				});
				return;
			}

			const indexList = this.getLocalChapterList(Id);
			const currentIndex = indexList.findIndex(i => i.id == bookIndexId) || 0;

			this.Id = Id;
			this.bookIndexId = bookIndexId;
			this.indexList = indexList;
			this.currentIndex = currentIndex;

			this.getText();
		}
	}
</script>

<style>
	.container {
		padding: 30rpx;
		font-size: 32rpx;
		line-height: 1.8;
		background: #fdfbf6;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.container>view:first-child {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 25rpx;
		background: #fff;
		border-radius: 12rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
		margin-bottom: 30rpx;
		color: #2a64b5;
		font-weight: 500;
	}

	.content-wrap {
		padding: 40rpx 30rpx;
		border-radius: 16rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.chapter-title {
		font-size: 38rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 30rpx;
		color: #222;
		letter-spacing: 2rpx;
	}

	.chapter-content {
		font-size: 31rpx;
		color: #333;
		line-height: 2.0;
		letter-spacing: 1rpx;
		white-space: pre-wrap;
		word-wrap: break-word;
		text-align: justify;
	}

	.empty-tip {
		font-size: 28rpx;
		color: #999;
		text-align: center;
		margin-top: 60rpx;
	}

	.debug-info {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;
	}

	.chapter-image {
		width: 100%;
		border-radius: 8rpx;
		margin-bottom: 20rpx;
	}

	.raw-data {
		font-size: 28rpx;
		white-space: pre-wrap;
		color: #999;
	}
</style>