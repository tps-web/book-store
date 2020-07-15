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