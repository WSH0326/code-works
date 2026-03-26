// pages/mine/mine.js
Page({
  data: {
    nickName: "游客",
    accountBalance: "*",
    userinfo: {}
  },

  getUserInfo() {
    const token = wx.getStorageSync("token");
    
    if (!token) {
      this.setData({
        nickName: "游客",
        accountBalance: "*",
        userinfo: {}
      });
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

    this.setData({
      userinfo,
      nickName,
      accountBalance
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
  getReadHistory() {
    if (!this.checkLogin()) return;
    wx.navigateTo({
      url: "/pages/readHistory/readHistory"
    });
  },

  // 退出登录
  exitLogin() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.reLaunch({
            url: '/pages/login/login'
          });
          wx.showToast({
            title: '退出成功',
            icon: 'success'
          });
        }
      }
    });
  },

  onLoad(options) {
    this.getUserInfo();
  },

  onShow() {
    this.getUserInfo();
  },

  onReady() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {}
});