// pages/allIndex/allIndex.js
Page({
  data: {
    Id: "",
    allIndex: []
  },

  // 获取目录
  getAllIndex(bookId) {
    console.log("接收的书籍ID：", bookId);

    // 和首页、阅读页 ID 完全对应
    const chapterData = {
      1: [
        { id: 1001, indexName: "第一章 初入江湖" },
        { id: 1002, indexName: "第二章 修炼功法" },
        { id: 1003, indexName: "第三章 小试牛刀" }
      ],
      2: [
        { id: 2001, indexName: "第一章 神秘传承" },
        { id: 2002, indexName: "第二章 宗门试炼" },
        { id: 2003, indexName: "第三章 名扬四海" }
      ],
      4: [
        { id: 4001, indexName: "第一章 陨落的天才" },
        { id: 4002, indexName: "第二章 觉醒系统" },
        { id: 4003, indexName: "第三章 横扫八方" }
      ],
      5: [
        { id: 5001, indexName: "第一章 末日降临" },
        { id: 5002, indexName: "第二章 基地建设" },
        { id: 5003, indexName: "第三章 幸存者联盟" }
      ]
    };

    const list = chapterData[bookId] || [];
    this.setData({
      allIndex: list
    });
    console.log("目录数据：", list);
  },

  // 点击目录跳转到阅读页
  getText(e) {
    const clickIndex = e.currentTarget.dataset.index;
    const Id = this.data.Id;
    const bookIndexId = this.data.allIndex[clickIndex]?.id || "";

    wx.navigateTo({
      url: `/pages/Indextext/Indextext?Id=${Id}&bookIndexId=${bookIndexId}`
    });
  },

  onLoad(options) {
    const Id = options.Id;
    this.setData({ Id });
    this.getAllIndex(Id);
  }
});