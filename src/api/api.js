import request from '@/utils/request'

export default {
    gamesList(params) {
        return request({
            url: '/unite/games',
            method: 'get',
            params
        })
    },
    queryOrder(data) {
        return request({
            url: '/unite/order_status',
            method: 'post',
            data
        })
    },
    staticClick(params) {
        return request({
            url: '/unite/click',
            method: 'get',
            params
        })
    },

}