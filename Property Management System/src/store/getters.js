// 全局跨模块计算属性，直接用本地状态派生
export default {
    // 待处理工单数量
    waitHandleOrderCount: state => state.workOrder.orderList.filter(item => item.status === 0).length,
    // 当前登录用户信息
    currentUser: state => state.user.userInfo,
    // 未缴费用总额
    unpaidFeeTotal: state => state.fee.feeList.filter(item => !item.isPay).reduce((total, item) => total + item.amount, 0)
}