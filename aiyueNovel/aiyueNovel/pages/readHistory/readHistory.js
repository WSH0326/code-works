// pages/readHistory/readHistory.js
Page({
  data: {
    bookId: "",
    curr: 1,
    limit: 20,
    readList: [],
    empty: false,
    loading: true
  },

  // 获取阅读历史
  getReadHistory() {
    this.setData({ loading: true });

    // 从本地缓存读取阅读历史
    const localHistory = wx.getStorageSync("readHistory") || [];

    setTimeout(() => {
      this.setData({
        readList: localHistory,
        empty: localHistory.length === 0,
        loading: false
      });
    }, 300);
  },

  // 跳转到书籍详情
  toReadBook(e) {
    const bookId  = e.currentTarget.dataset.id;
    if (!bookId) {
      wx.showToast({ title: "书籍信息异常", icon: "none" });
      return;
    }
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?Id=${bookId}`,
    });
  },

  // 删除阅读历史
  removeHistory(e) {
    const bookId = e.currentTarget.dataset.id;
    let localHistory = wx.getStorageSync("readHistory") || [];
    localHistory = localHistory.filter(item => item.id != bookId);

    wx.setStorageSync("readHistory", localHistory);

    this.setData({
      readList: localHistory,
      empty: localHistory.length === 0
    });

    wx.showToast({ title: "已移除", icon: "success" });
  },

  onLoad(options) {
    this.getReadHistory();
    const bookId = options.Id;
    this.setData({ bookId });
  },

  onPullDownRefresh() {
    this.getReadHistory();
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    wx.showToast({ title: "没有更多数据了", icon: "none" });
  }
});