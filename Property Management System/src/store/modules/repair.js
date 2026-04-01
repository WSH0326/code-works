export default {
    namespaced: true, // 开启命名空间，避免冲突
    state: {
        // 本地模拟工单数据
        orderList: [
            { id: 1, type: '水电维修', area: '1号楼2单元', desc: '厨房水龙头漏水', status: 0, createTime: '2026-04-01', repairer: '' },
            { id: 2, type: '家电维修', area: '3号楼1单元', desc: '空调不制冷', status: 1, createTime: '2026-04-02', repairer: '张师傅' },
            { id: 3, type: '公共设施', area: '小区广场', desc: '健身器材损坏', status: 0, createTime: '2026-04-03', repairer: '' },
            { id: 4, type: '房屋维修', area: '2号楼3单元', desc: '墙面开裂', status: 2, createTime: '2026-03-30', repairer: '李师傅' }
        ],
        // 本地模拟Echarts图表数据
        orderChartData: {
            typeCount: [
                { name: '水电维修', value: 12 },
                { name: '家电维修', value: 8 },
                { name: '公共设施', value: 5 },
                { name: '房屋维修', value: 7 }
            ],
            trendData: [
                { date: '03-28', count: 3 },
                { date: '03-29', count: 5 },
                { date: '03-30', count: 4 },
                { date: '03-31', count: 6 },
                { date: '04-01', count: 7 }
            ]
        },
        // 筛选条件
        filterCondition: { area: '', repairer: '', status: '' }
    },
    mutations: {
        // 更新工单状态
        UPDATE_ORDER_STATUS(state, { id, status, repairer }) {
            const target = state.orderList.find(item => item.id === id)
            if (target) {
                target.status = status
                if (handler) target.repairer = repairer
            }
        },
        // 新增工单
        ADD_ORDER(state, order) {
            // 自动生成唯一ID，模拟后端主键
            order.id = Date.now()
            order.createTime = new Date().toLocaleDateString().replace(/\//g, '-')
            state.orderList.unshift(order)
        },
        // 设置筛选条件
        SET_FILTER_CONDITION(state, condition) {
            state.filterCondition = { ...state.filterCondition, ...condition }
        },
        // 编辑工单信息
        EDIT_ORDER(state, order) {
            const index = state.orderList.findIndex(item => item.id === order.id)
            if (index > -1) state.orderList[index] = order
        },
        // 删除工单
        DELETE_ORDER(state, id) {
            state.orderList = state.orderList.filter(item => item.id !== id)
        }
    },
    actions: {
        // 派单操作
        dispatchOrder({ commit }, data) {
            commit('UPDATE_ORDER_STATUS', { id: data.id, status: 1, repairer: data.repairer })
            // 模拟操作成功，返回结果给组件
            return Promise.resolve({ success: true, msg: '派单成功' })
        },
        // 完成工单操作
        completeOrder({ commit }, id) {
            commit('UPDATE_ORDER_STATUS', { id, status: 2 })
            return Promise.resolve({ success: true, msg: '工单已完成' })
        },
        // 新增工单操作
        addOrder({ commit }, order) {
            commit('ADD_ORDER', order)
            return Promise.resolve({ success: true, msg: '报修工单提交成功' })
        }
    }
}