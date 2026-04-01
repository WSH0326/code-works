(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/bookDetail/bookDetail"],{

/***/ 88:
/*!**************************************************************************************************************************************!*\
  !*** C:/Users/26163/OneDrive/桌面/code works/aiyueNovel(uniapp)/aiyueNovel(uniapp)/main.js?{"page":"pages%2FbookDetail%2FbookDetail"} ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _bookDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/bookDetail/bookDetail.vue */ 89));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_bookDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 89:
/*!*******************************************************************************************************************!*\
  !*** C:/Users/26163/OneDrive/桌面/code works/aiyueNovel(uniapp)/aiyueNovel(uniapp)/pages/bookDetail/bookDetail.vue ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bookDetail_vue_vue_type_template_id_d1a5e9f4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bookDetail.vue?vue&type=template&id=d1a5e9f4& */ 90);
/* harmony import */ var _bookDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bookDetail.vue?vue&type=script&lang=js& */ 92);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _bookDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _bookDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _bookDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bookDetail.vue?vue&type=style&index=0&lang=css& */ 94);
/* harmony import */ var _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _bookDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _bookDetail_vue_vue_type_template_id_d1a5e9f4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _bookDetail_vue_vue_type_template_id_d1a5e9f4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _bookDetail_vue_vue_type_template_id_d1a5e9f4___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/bookDetail/bookDetail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 90:
/*!**************************************************************************************************************************************************!*\
  !*** C:/Users/26163/OneDrive/桌面/code works/aiyueNovel(uniapp)/aiyueNovel(uniapp)/pages/bookDetail/bookDetail.vue?vue&type=template&id=d1a5e9f4& ***!
  \**************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_template_id_d1a5e9f4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./bookDetail.vue?vue&type=template&id=d1a5e9f4& */ 91);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_template_id_d1a5e9f4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_template_id_d1a5e9f4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_template_id_d1a5e9f4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_template_id_d1a5e9f4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 91:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/26163/OneDrive/桌面/code works/aiyueNovel(uniapp)/aiyueNovel(uniapp)/pages/bookDetail/bookDetail.vue?vue&type=template&id=d1a5e9f4& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 92:
/*!********************************************************************************************************************************************!*\
  !*** C:/Users/26163/OneDrive/桌面/code works/aiyueNovel(uniapp)/aiyueNovel(uniapp)/pages/bookDetail/bookDetail.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./bookDetail.vue?vue&type=script&lang=js& */ 93);
/* harmony import */ var _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 93:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/26163/OneDrive/桌面/code works/aiyueNovel(uniapp)/aiyueNovel(uniapp)/pages/bookDetail/bookDetail.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
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
    };
  },
  methods: {
    onindexChange: function onindexChange(event) {
      this.setData({
        activeNames: event.detail
      });
    },
    beginRead: function beginRead() {
      this.addReadHistory();
      var _this$data = this.data,
        Id = _this$data.Id,
        indexList = _this$data.indexList;
      if (!Id || indexList.length === 0) {
        uni.showToast({
          title: "暂无章节",
          icon: "none"
        });
        return;
      }
      var firstIndexId = indexList[0].id;
      uni.navigateTo({
        url: "/pages/Indextext/Indextext?Id=".concat(Id, "&bookIndexId=").concat(firstIndexId)
      });
    },
    getIndex: function getIndex(e) {
      var bookIndexId = e.currentTarget.dataset.bookindexid;
      uni.navigateTo({
        url: "/pages/Indextext/Indextext?Id=".concat(this.data.Id, "&bookIndexId=").concat(bookIndexId)
      });
    },
    getAllIndex: function getAllIndex() {
      uni.navigateTo({
        url: "/pages/allIndex/allIndex?Id=".concat(this.data.Id)
      });
    },
    addToBookshelf: function addToBookshelf() {
      var _this$data2 = this.data,
        Id = _this$data2.Id,
        bookInfo = _this$data2.bookInfo,
        firstIndexId = _this$data2.firstIndexId;
      var shelfList = uni.getStorageSync("shelfList") || [];
      var exist = shelfList.find(function (item) {
        return item.Id == Id;
      });
      if (exist) {
        uni.showToast({
          title: "已在书架",
          icon: "none"
        });
        return;
      }
      shelfList.push({
        Id: Id,
        bookName: bookInfo.bookName,
        authorName: bookInfo.authorName,
        picUrl: bookInfo.picUrl,
        firstIndexId: firstIndexId || "1001"
      });
      uni.setStorageSync("shelfList", shelfList);
      uni.showToast({
        title: "加入书架成功"
      });
      this.setData({
        isInBookshelf: true
      });
    },
    addReadHistory: function addReadHistory() {
      var _this$data3 = this.data,
        Id = _this$data3.Id,
        bookInfo = _this$data3.bookInfo;
      if (!Id || !bookInfo) return;
      var readHistory = uni.getStorageSync("readHistory") || [];
      readHistory = readHistory.filter(function (item) {
        return item.bookId != Id;
      });
      readHistory.unshift({
        bookId: Id,
        bookName: bookInfo.bookName,
        authorName: bookInfo.authorName,
        picUrl: bookInfo.picUrl,
        time: new Date().toLocaleString()
      });
      if (readHistory.length > 50) readHistory = readHistory.slice(0, 50);
      uni.setStorageSync("readHistory", readHistory);
    }
  },
  onLoad: function onLoad(options) {
    var bookId = options.Id;
    this.setData({
      Id: bookId
    });
    this.loadBookByClickId(bookId);
  },
  loadBookByClickId: function loadBookByClickId(bookId) {
    var bookData = {
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
    var chapters = [{
      id: 1001,
      indexName: "第一章 开端"
    }, {
      id: 1002,
      indexName: "第二章 发展"
    }, {
      id: 1003,
      indexName: "第三章 高潮"
    }];
    var currentBook = bookData[bookId] || bookData[4];
    this.setData({
      bookInfo: currentBook,
      newIndex: chapters,
      indexList: chapters,
      firstIndexId: chapters[0].id,
      loading: false
    });
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 94:
/*!****************************************************************************************************************************************************!*\
  !*** C:/Users/26163/OneDrive/桌面/code works/aiyueNovel(uniapp)/aiyueNovel(uniapp)/pages/bookDetail/bookDetail.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Downloads/HBuilderX.4.76.202508210301/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./bookDetail.vue?vue&type=style&index=0&lang=css& */ 95);
/* harmony import */ var _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_202508210301_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bookDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 95:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/26163/OneDrive/桌面/code works/aiyueNovel(uniapp)/aiyueNovel(uniapp)/pages/bookDetail/bookDetail.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[88,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/bookDetail/bookDetail.js.map