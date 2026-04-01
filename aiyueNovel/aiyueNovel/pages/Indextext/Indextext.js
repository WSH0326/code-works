// pages/Indextext/Indextext.js

// 格式化文本
function replaceHtmlSymbols(obj) {
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
      obj[key] = replaceHtmlSymbols(obj[key]);
    }
  }
  return obj;
}

// 判断空对象
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

Page({
  data: {
    Id: "",
    bookIndexId: "",
    currentIndex: 0,
    Indextext: {},
    loading: true,
    indexList: []
  },

  isEmptyObject: isEmptyObject,

  // ==========================
  // 亮度调节
  // ==========================
  setScreenBrightness() {
    wx.setScreenBrightness({ value: 0.7 });
  },

  // ==========================
  // 章节缓存
  // ==========================
  cacheChapter() {
    const { Id, bookIndexId, Indextext } = this.data;
    const key = `chapter_${Id}_${bookIndexId}`;
    wx.setStorageSync(key, Indextext);
  },

  // ==========================
  // 章节预加载
  // ==========================
  preloadNextChapter() {
    const { currentIndex, indexList } = this.data;
    if (currentIndex + 1 >= indexList.length) return;
    const nextId = indexList[currentIndex + 1].id;
    console.log("预加载下一章：" + nextId);
  },

  // ==========================
  // 阅读进度保存
  // ==========================
  saveReadProgress() {
    const { Id, bookIndexId, Indextext } = this.data;
    const progress = {
      bookId: Id,
      chapterId: bookIndexId,
      title: Indextext.title,
      time: new Date().toLocaleString()
    };
    wx.setStorageSync("lastRead", progress);
  },

  // ==========================
  // 本地模拟章节数据
  // ==========================
  getLocalChapterList(bookId) {
    const allChapters = {
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
    return allChapters[bookId] || allChapters[4];
  },

  // ==========================
  // 本地获取章节内容
  // ==========================
  getLocalText(bookId, chapterId) {
    const contentData = {
      1001: { title: "第一章 初入江湖", content: "这是精品小说1的第一章内容，主角踏上了修仙之路……" },
      1002: { title: "第二章 修炼功法", content: "主角获得神秘功法，修为一日千里……" },
      4001: { title: "第一章 陨落的天才", content: "曾经的天才一朝落魄，却意外获得逆天系统……" },
      4002: { title: "第二章 觉醒系统", content: "系统激活，主角从此逆袭人生，无人能挡！" },
      2001: { title: "第一章 神秘传承", content: "意外获得上古传承，从此一路高歌猛进……" },
      5001: { title: "第一章 末日降临", content: "丧尸围城，主角如何绝境求生……" }
    };
    return contentData[chapterId] || { title: "章节缺失", content: "该章节内容不存在~" };
  },

  // ==========================
  // 阅读页核心：加载章节内容
  // ==========================
  getText() {
    const { Id, bookIndexId } = this.data;
    if (!Id || !bookIndexId) {
      wx.showToast({ title: "参数异常", icon: "none" });
      return;
    }

    const content = this.getLocalText(Id, bookIndexId);
    this.setData({
      Indextext: replaceHtmlSymbols(content),
      loading: false
    });

    this.setScreenBrightness();  // 亮度
    this.cacheChapter();        // 缓存
    this.preloadNextChapter();  // 预加载
    this.saveReadProgress();    // 保存进度
  },

  // ==========================
  // 上一章
  // ==========================
  getLastIndex() {
    const { currentIndex, indexList } = this.data;
    if (currentIndex <= 0) {
      wx.showToast({ title: "已是第一章", icon: "none" });
      return;
    }
    const newIndex = currentIndex - 1;
    const prevId = indexList[newIndex].id;
    this.setData({
      currentIndex: newIndex,
      bookIndexId: prevId
    });
    this.getText();
  },

  // ==========================
  // 下一章
  // ==========================
  getNextIndex() {
    const { currentIndex, indexList } = this.data;
    if (currentIndex >= indexList.length - 1) {
      wx.showToast({ title: "已是最后一章", icon: "none" });
      return;
    }
    const newIndex = currentIndex + 1;
    const nextId = indexList[newIndex].id;
    this.setData({
      currentIndex: newIndex,
      bookIndexId: nextId
    });
    this.getText();
  },

  // 目录
  getAllIndex() {
    wx.navigateTo({
      url: `/pages/allIndex/allIndex?Id=${this.data.Id}`
    });
  },

  // ==========================
  // 页面加载
  // ==========================
  onLoad(options) {
    const Id = options.Id;
    const bookIndexId = options.bookIndexId;

    if (!Id || !bookIndexId) {
      wx.showToast({ title: "参数错误", icon: "none" });
      return;
    }

    const indexList = this.getLocalChapterList(Id);
    const currentIndex = indexList.findIndex(i => i.id == bookIndexId) || 0;

    this.setData({
      Id,
      bookIndexId,
      indexList,
      currentIndex
    });

    this.getText();
  }
});