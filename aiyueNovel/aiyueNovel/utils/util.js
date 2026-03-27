import WxValidate from './WxValidate';

// 初始化验证器
export const initValidate = (rules, messages) => {
  return new WxValidate(rules, messages);
};

// 校验表单数据
export const checkFormData = (validateInstance, formData) => {
  const check = validateInstance.checkForm(formData);
  const errors = validateInstance.errorList || [];

  if (!check) {
    let errorMessages = {};
    errors.forEach((item) => {
      errorMessages[item.param] = item.msg;
    });
    return {
      valid: false,
      errors: errorMessages
    };
  } else {
    return {
      valid: true,
      errors: {}
    };
  }
};


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime,
  initValidate,
  checkFormData,
}