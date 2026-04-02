Page({
  data: {
    params: {
      curr: 1,
      limit: 10,
      sort: "last_index_update_time",
      keyword: ""
    },
    bookList: [],
    pages: 0,
    isLoading: false
  },

  // 搜索书籍
  searchBook() {
    if (this.data.isLoading) return;
    this.setData({ isLoading: true });

    // 模拟所有书籍数据
    const allBooks = [
      { id: 1, bookName: "精品小说1", authorName: "作者A", picUrl: "/static/default.jpg", catName: "精品", desc: "这是精品小说1的详细简介，内容非常精彩。" },
      { id: 2, bookName: "精品小说2", authorName: "作者B", picUrl: "/static/default.jpg", catName: "精品", desc: "这是精品小说2的详细简介，内容非常精彩。" },
      { id: 3, bookName: "精品小说3", authorName: "作者C", picUrl: "/static/default.jpg", catName: "精品", desc: "这是精品小说3的详细简介，内容非常精彩。" },
      { id: 4, bookName: "热门小说1", authorName: "作者D", picUrl: "/static/default.jpg", catName: "热门", desc: "这是热门小说1的详细简介，超级火爆，人人都在看！" },
      { id: 5, bookName: "热门小说2", authorName: "作者E", picUrl: "/static/default.jpg", catName: "热门", desc: "这是热门小说2的详细简介，超级火爆，人人都在看！" },
      { id: 6, bookName: "热门小说3", authorName: "作者F", picUrl: "/static/default.jpg", catName: "热门", desc: "这是热门小说3的详细简介，超级火爆，人人都在看！" },
      { id: 7, bookName: "更新排行1", authorName: "作者G", picUrl: "/static/default.jpg", catName: "更新", desc: "这是最新更新小说1的简介。" },
      { id: 8, bookName: "更新排行2", authorName: "作者H", picUrl: "/static/default.jpg", catName: "这是最新更新小说2的简介。" },
      { id: 9, bookName: "更新排行3", authorName: "作者I", picUrl: "/static/default.jpg", catName: "更新", desc: "这是最新更新小说3的简介。" },
    ];

    const keyword = this.data.params.keyword || "";
    let filteredBooks = allBooks;

    // 搜索过滤
    if (keyword.trim()) {
      filteredBooks = allBooks.filter(item =>
        item.bookName.includes(keyword)
      );
    }

    setTimeout(() => {
      this.setData({
        bookList: filteredBooks,
        pages: 1,
        isLoading: false
      });
    }, 300);
  },

  onLoad(options) {
    const keyword = options.value ? decodeURIComponent(options.value) : "";
    this.setData({
      "params.keyword": keyword,
      "params.curr": 1,
      bookList: []
    }, () => {
      this.searchBook();
    });
  },

  onReachBottom() {
    if (this.data.isLoading || this.data.params.curr >= this.data.pages) return;
    this.setData({
      "params.curr": this.data.params.curr + 1
    }, () => {
      this.searchBook();
    });
  },

  // 跳转到书籍详情
  getBookInfo(e) {
    const bookId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?Id=${bookId}`
    });
  }
});