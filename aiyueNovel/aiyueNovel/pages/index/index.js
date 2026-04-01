// index.js
Page({
  data: {
    active: 1,
    jingpinList: [],
    bookList: [],
    updateRankList: [],
    value:""
  },
  login() {
    wx.navigateTo({
      url: "/pages/login/login"
    })
  },
  onInputChange(e){
    console.log(e);
    this.setData({
      value:e.detail
    })
  },
  searchBook(){
    const { value } = this.data;
      wx.navigateTo({
        url: `/pages/bookList/bookList?value=${encodeURIComponent(value)}`
      });
    },
  getjingpinList() {
    // ===================== 模拟数据开始 =====================
    const mockData = [
      [],[],[],[],
      [
        { id: 1, title: "精品小说1", author: "作者A" },
        { id: 2, title: "精品小说2", author: "作者B" },
        { id: 3, title: "精品小说3", author: "作者C" }
      ]
    ]
    this.setData({
      jingpinList: mockData[4]
    })
  },
  getbookList() {
    // ===================== 模拟数据开始 =====================
    const mockData = [
      [],[],[],
      [
        { id: 4, title: "热门小说1", author: "作者D" },
        { id: 5, title: "热门小说2", author: "作者E" },
        { id: 6, title: "热门小说3", author: "作者F" }
      ]
    ]
    this.setData({
      bookList: mockData[3]
    })
  },
  getUpdateRank() {
    // ===================== 模拟数据开始 =====================
    const mockData = [
      { id: 7, title: "更新排行1", author: "作者G",desc: "这是最新更新小说3的简介。",year: "2025-12-20"  },
      { id: 8, title: "更新排行2", author: "作者H",desc: "这是最新更新小说2的简介。",year: "2025-12-20"  },
      { id: 9, title: "更新排行3", author: "作者I",desc: "这是最新更新小说3的简介。",year: "2025-12-20" }
    ]
    this.setData({
      updateRankList: mockData
    })
  },
  onTabbarChange(event) {
    this.setData({
      active: event.detail
    });
  },
  getBookInfo(e) {
    const Id = e.currentTarget.dataset.id;
    if (!Id) {
      wx.showToast({ title: "书籍ID异常", icon: "none" });
      return;
    }
    // 直接跳转
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?Id=${Id}`
    });
  },
  // 登录校验
  checkLogin() {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.showToast({
        title: "请先登录",
        icon: "none"
      });
      wx.navigateTo({
        url: "/pages/login/login"
      });
      return false;
    }
    return true;
  },

  // 我的书架（带权限）
  goToBookShelf() {
    if (!this.checkLogin()) return;
    wx.navigateTo({
      url: "/pages/bookShelf/bookShelf"
    });
  },

  // 阅读历史（带权限）
  goToReadHistory() {
    if (!this.checkLogin()) return;
    wx.navigateTo({
      url: "/pages/readHistory/readHistory"
    });
  },

  goToMine(){
    wx.navigateTo({ url:"/pages/mine/mine" })
  },
  onLoad() {
    this.getjingpinList()
    this.getbookList()
    this.getUpdateRank()
  }
})