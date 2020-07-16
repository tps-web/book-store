import request from '@/utils/request'

//得到用户信息
export function getInfo() {
    return request({
        url: '/user',
        method: 'get',
    })
}
//绘本
export function getBookList() {
    return request({
        url: '/bookList',
        method: 'get',
    })
}

//地址 (默认)
export function getAddress() {
    return request({
        url: '/defaultAddresss',
        method: 'get'
    })
}

//地址 (没有默认)
export function address() {
    return request({
        url: '/addresss',
        method: 'get'
    })
}

export function coupon() {
    return request({
        url: '/coupon',
        method: 'get'
    })
}