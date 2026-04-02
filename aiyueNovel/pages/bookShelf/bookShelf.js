// pages/bookShelf/bookShelf.js
Page({
  data: {
    curr: 1,
    limit: 20,
    shelfList: [],
    loading: true,
    empty: false
  },

  // 获取书架列表
  getShelfList() {
    this.setData({ loading: true });

    // 从本地缓存读取书架
    const localShelf = wx.getStorageSync("shelfList") || [];
    
    this.setData({
      shelfList: localShelf,
      empty: localShelf.length === 0,
      loading: false
    });
  },

  // 跳转到阅读
  toReadBook(e) {
    const { id, firstindexid } = e.currentTarget.dataset;
    if (!id || !firstindexid) {
      wx.showToast({ title: "书籍信息异常", icon: "none" });
      return;
    }
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?Id=${id}&bookIndexId=${firstindexid}`
    });
  },

  // 移除书架
  removeFromShelf(e) {
    const bookId = e.currentTarget.dataset.id;

    wx.showModal({
      title: "提示",
      content: "确定从书架移除该书籍吗？",
      success: (res) => {
        if (res.confirm) {
          // 从本地缓存删除
          let shelfList = wx.getStorageSync("shelfList") || [];
          shelfList = shelfList.filter(book => book.Id !== bookId);
          wx.setStorageSync("shelfList", shelfList);

          this.setData({
            shelfList,
            empty: shelfList.length === 0
          });

          wx.showToast({ title: "移除成功", icon: "success" });
        }
      }
    });
  },

  goToHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  onLoad() {
    this.getShelfList();
  }
});