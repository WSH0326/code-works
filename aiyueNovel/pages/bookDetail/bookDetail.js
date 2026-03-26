// bookDetail.js
Page({
  data: {
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
  },

  onindexChange(event) {
    this.setData({ activeNames: event.detail });
  },

  beginRead() {
    this.addReadHistory()
    const { Id, indexList } = this.data;
    if (!Id || indexList.length === 0) {
      wx.showToast({ title: "暂无章节", icon: "none" });
      return;
    }
    const firstIndexId = indexList[0].id;
    wx.navigateTo({
      url: `/pages/Indextext/Indextext?Id=${Id}&bookIndexId=${firstIndexId}`
    });
  },

  getIndex(e) {
    const bookIndexId = e.currentTarget.dataset.bookindexid;
    wx.navigateTo({
      url: `/pages/Indextext/Indextext?Id=${this.data.Id}&bookIndexId=${bookIndexId}`
    });
  },

  getAllIndex() {
    wx.navigateTo({
      url: `/pages/allIndex/allIndex?Id=${this.data.Id}`
    });
  },

  addToBookshelf() {
    const { Id,bookInfo,firstIndexId } = this.data;
  
    // 取出书架
    let shelfList = wx.getStorageSync("shelfList") || [];
  
    // 去重
    const exist = shelfList.find(item => item.Id == Id);
    if (exist) {
      wx.showToast({ title: "已在书架", icon: "none" });
      return;
    }

    // 存入正确格式
    shelfList.push({
      Id: Id,
      bookName: bookInfo.bookName,
      authorName: bookInfo.authorName,
      picUrl: bookInfo.picUrl,
      firstIndexId: firstIndexId || "1001"
    });
  
    // 保存到本地
    wx.setStorageSync("shelfList", shelfList);
  
    wx.showToast({ title: "加入书架成功" });
    this.setData({ isInBookshelf: true });
  },

  addReadHistory() {
    const { Id, bookInfo } = this.data;
    if (!Id || !bookInfo) return;
  
    let readHistory = wx.getStorageSync("readHistory") || [];
  
    // 去重
    readHistory = readHistory.filter(item => item.bookId != Id);
  
    // 添加到最前面
    readHistory.unshift({
      bookId: Id,
      bookName: bookInfo.bookName,
      authorName: bookInfo.authorName,
      picUrl: bookInfo.picUrl,
      time: new Date().toLocaleString()
    });
  
    // 最多保存 50 条
    if (readHistory.length > 50) readHistory = readHistory.slice(0, 50);
  
    wx.setStorageSync("readHistory", readHistory);
  },

  // ==========================
  // 根据 Id 显示对应书籍
  // ==========================
  onLoad(options) {
    const bookId = options.Id;
    this.setData({ Id: bookId });
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

    // 模拟章节
    const chapters = [
      { id: 1001, indexName: "第一章 开端" },
      { id: 1002, indexName: "第二章 发展" },
      { id: 1003, indexName: "第三章 高潮" }
    ];

    const currentBook = bookData[bookId] || bookData[4]; // 默认=热门小说1

    this.setData({
      bookInfo: currentBook,
      newIndex: chapters,
      indexList: chapters,
      firstIndexId: chapters[0].id,
      loading: false
    });
  }
});