import axios from "axios";
import { Message } from "element-ui";
import router from "./router";
import store from "./store";

//创建axios的实例
const request = axios.create({
  baseURL: "/api",
  timeout: 5000
})

//请求拦截器----发送请求之前操作
//比如：1.携带token 2.修改header，携带公用参数
request.interceptors.request.use(conf => {
  conf.headers["content-type"] = "application/x-www-form-urlencoded;charset=UTF-8"
  return conf
})

//响应拦截器----得到数据，提前处理
//1.返回data 2.处理公用错误
request.interceptors.response.use(
  (conf) => {
    return conf.data;
  },
  // 修复后：补充错误捕获+状态处理
  (error) => {
    console.error('请求错误：', error);
    const status = error.response?.status;
    const currentPath = router.currentRoute.path;

    // 401未登录：清空状态+跳登录页
    if (status === 401) {
      if (!currentPath.includes('/login')) {
        store.commit('user/logout'); // 调用logout彻底清空
        Message.error('登录状态已过期，请重新登录');
        router.push('/login');
      }
    }
    // 403权限不足：跳403页（需先配置路由）
    else if (status === 403) {
      if (!currentPath.includes('/error/403')) {
        Message({ duration: 1000, message: error.response.data.msg || '权限不足', type: 'error' });
        router.push('/error/403');
      }
    }
    // 其他错误（500/超时）
    else {
      Message.error(error.message || '服务器请求失败');
    }
    return Promise.reject(error); // 抛出错误，让路由守卫捕获
  }
);

export default request