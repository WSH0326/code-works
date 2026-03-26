// pages/login/login.js
import {
  initValidate,
  checkFormData
} from "../../utils/util"

Page({
  data: {
    checked: true,
    formData: {
      mobile: '',
      password: ''
    },
    checkData: {
      mobile: '',
      password: ''
    },
    rules: {
      mobile: {
        required: true,
        tel: true
      },
      password: {
        required: true,
        minlength: 6
      },
    },
    message: {
      mobile: {
        required: '请填写手机号码',
        tel: '请输入有效的手机号码'
      },
      password: {
        required: '请填写密码',
        minlength: "密码不能少于6位"
      }
    },
  },

  // 修改输入框
  onInputChange(e) {
    let key = `formData.${e.target.dataset.field}`;
    let msg = `checkData.${e.target.dataset.field}`;
    this.setData({
      [key]: e.detail,
      [msg]: ""
    })
  },

  onBoxChange(event) {
    this.setData({
      checked: event.detail
    });
  },

  // 提交表单
  onSubmit() {
    const { rules, message, formData } = this.data;
    const validateInstance = initValidate(rules, message);
    const { valid, errors } = checkFormData(validateInstance, formData);

    if (!valid) {
      this.setData({ checkData: errors });
      return;
    }

    // 校验通过，直接登录
    this.doLogin();
  },

  // 模拟登录
  doLogin() {
    wx.showToast({
      title: "登录成功",
      icon: "success"
    });

    // 模拟 token
    wx.setStorageSync("token", "mock_token_123456");

    // 跳首页
    setTimeout(() => {
      wx.reLaunch({
        url: "/pages/index/index"
      });
    }, 1000);
  },
});