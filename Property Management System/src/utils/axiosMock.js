// 纯前端模拟请求，匹配axios 封装
const mockAxios = {
  async post(url, params) {
    return new Promise(resolve => {
      setTimeout(() => {
        // 模拟登录规则（多角色版本）
        if (url === "/login") {
          // 模拟账号
          const userList = [
            { username: 'admin', password: '123456', roleId: '1', role: 'ADMIN', name: '超级管理员' },
            { username: 'wuye', password: '123456', roleId: '2', role: 'WUYE', name: '物业管理员' },
            { username: 'user', password: '123456', roleId: '3', role: 'USER', name: '普通业主' },
          ];

          // 查找匹配的用户
          const user = userList.find(
            (item) =>
              item.username === params.username &&
              item.password === params.password
          );

          // 校验验证码（长度4位即可）
          const codeValid = params.verifyCode?.length === 4;

          // 登录
          if (user && codeValid) {
            resolve({
              data: {
                code: 0,
                msg: "登录成功",
                data: {
                  token: user.username + "-token-123456",
                  roleId: user.roleId, // 角色ID
                  role: user.role,     // 角色标识
                  name: user.name,     // 角色名
                },
              },
            });
          } else {
            // 登录失败
            resolve({
              data: { code: -1, msg: "账号或密码或验证码错误" },
            });
          }
        }
      }, 600);
    });
  },
};
export default mockAxios