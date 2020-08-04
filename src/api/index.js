import request from '@/utils/request'

import { getToken } from '@/utils/authcookie'


//得到用户信息






//首页   http://192.168.1.109:8110/app/book/index/list/169
export function index() {
    var info = JSON.parse(getToken())
    return request({
        url: `/app/book/index/list/${info.userId}`,
        method: 'get'
    })
}

//分类
export function getCategory() {
    return request({
        url: '/book-type/list',
        method: 'get'
    })
}

// 根据id获取图书信息 /app/book/index/get/{curPage}/{pageRows}/{id}/{userId}
export function getBookDesc(op) {
    var info = JSON.parse(getToken())
    op.isHotSearch = op.isHotSearch ? op.isHotSearch : '0'
    return request({
        url: `/app/book/index/get/${op.curPage}/${op.pageRows}/${op.id}/${info.userId}/${op.isHotSearch}`,
        method: 'get'
    })
}

// 保存购物车对象 /order/cart/save
export function saveCartItem(data) {
    return request({
        url: `/order/cart/save`,
        method: 'post',
        data
    })
}

// 更多书单  
export function getList(op) {
    return request({
        url: `/book/index-list/list/${op.curPage}/${op.pageRows}`,
        method: 'get'
    })
}

//根据id获取书单对象  /book/index-list/get/{curPage}/{pageRows}/{id}
export function getListItem(op) {
    return request({
        url: `/book/index-list/get/${op.curPage}/${op.pageRows}/${op.id}`,
        method: 'get'
    })
}

//热门搜索 /app/book/index/getHotBook/{curPage}/{pageRows}/{keyWord}/{userId}
export function getHotBook(op) {
    var info = JSON.parse(getToken())
    return request({
        url: `/app/book/index/getHotBook/${op.curPage}/${op.pageRows}/${op.keyWord}/${info.userId}`,
        method: 'get'
    })
}

// app/book/index/getNewBookList/1/6 本周新书更多
export function getNewBookList(op) {
    return request({
        url: `/app/book/index/getNewBookList/${op.curPage}/${op.pageRows}`,
        method: 'get'
    })
}

//热搜词
export function getHotBookItem() {
    return request({
        url: `/app/book/index/getHotSearchBookList/1/6`,
        method: 'get'
    })
}


//保存购物车  /order/cart/save
export function saveCart(op) {
    var info = JSON.parse(getToken())
    let data = {
        "bookId": op.id,
        "bookIsbn": op.isbn,
        "bookName": op.title,
        "bookPic": op.minImage || op.squareImage,
        "price": op.price,
        "quantity": 1,
        "book_category_id": op.categoryId,
        "book_press": op.press,
        "userId": info.userId,
        "userNickName": info.userNickName
    }
    return request({
        url: `/order/cart/save`,
        method: 'post',
        data
    })
}

//查询购物车书籍  /order/cart/list/{curPage}/{pageRows}/{userId}
export function getCartList(op) {
    var info = JSON.parse(getToken())
    return request({
        url: `/order/cart/list/${op.curPage}/${op.pageRows}/${info.userId}`,
        method: 'get'
    })
}

//删除购物车信息  /order/cart/removeById/{ids}
export function removeByCartId(ids) {
    return request({
        url: `/order/cart/removeById/${ids}`,
        method: 'DELETE'
    })
}

//保存地址  /order/receive-address/save
export function saveAddress(data) {
    return request({
        url: `/order/receive-address/save`,
        method: 'post',
        data
    })
}

//根据ID修改会员收货地址表对象 /order/receive-address/update  
export function updateAddress(data) {
    return request({
        url: `/order/receive-address/update`,
        method: 'put',
        data
    })
}

// /order/receive-address/removeById/{ids}
//根据ids删除,多个对象请用英文状态下的逗号隔开
export function removeAddress(ids) {
    return request({
        url: `/order/receive-address/removeById/${ids}`,
        method: 'DELETE',
    })
}


// /order/receive-address/list/{curPage}/{pageRows}/{userId}
// 分页查询会员收货地址表书籍列表
export function getAddress(data) {
    var info = JSON.parse(getToken())
    return request({
        url: `/order/receive-address/list/${data.curPage}/${data.pageRows}/${info.userId}`,
        method: 'GET',
    })
}

// /order/receive-address/get/{id}
// 根据ID获取会员收货地址表对象
export function getAddressId(id) {
    return request({
        url: `/order/receive-address/get/${id}`,
        method: 'GET',
    })
}

// /app/book/index/getChildCategoryBookList/{curPage}/{pageRows}/{categoryId}
// 根据id 分类得到故事
export function getChildCategoryBookList(op) {
    return request({
        url: `/app/book/index/getChildCategoryBookList/${op.curPage}/${op.pageRows}/${op.categoryId}`,
        method: 'GET',
    })
}

// /book/couponHistory/list/1/6/169
// 分页查询优惠券使用、领取历史表列表
export function getcouponList(op) {
    var info = JSON.parse(getToken())
    return request({
        url: `/app/book/index/getChildCategoryBookList/${op.curPage}/${op.pageRows}/${info.userId}`,
        method: 'GET',
    })
}

// 提交订单 /order/save
export function postOrder(data) {
    var info = JSON.parse(getToken())
    return request({
        url: `/order/save`,
        method: 'post',
        data
    })
}

// 快递表  order/express/list
export function expressList() {
    return request({
        url: `order/express/list`,
        method: 'get',
    })
}

//订单  /order/list/{curPage}/{pageRows}/{userId}/{status}/{orderType}
export function getOrderType(data) {
    var info = JSON.parse(getToken())
    return request({
        url: `/order/list/${data.curPage}/${data.pageRows}/${info.userId}/${data.status}/${data.orderType}`,
        method: 'get',
    })
}

//  分页查询订单中的书籍列表 /order/orderItem/list/{curPage}/{pageRows}/{orderSn}
export function getOrderItem(data) {
    return request({
        url: `/order/orderItem/list/${data.curPage}/${data.pageRows}/${data.orderSn}`,
        method: 'get',
    })
}

// 修改订单  /order/update
export function updateOrder(data) {
    return request({
        url: `/order/update`,
        method: 'put',
        data
    })
}

//  删除订单  /order/removeById/{ids}
export function removeOrder(ids) {
    return request({
        url: `/order/removeById/${ids}`,
        method: 'DELETE',
    })
}

// /book/couponHistory/list/1/6/169
export function getCouponHistory(data) {
    var info = JSON.parse(getToken())
    return request({
        url: `/book/couponHistory/list/${data.curPage }/${data.pageRows}/${info.userId}`,
        method: 'get',
    })
}

//  根据优惠券码领取优惠券 /book/coupon/getCouponByCode/{code}/{userId}/{userNickName}
export function getCouponByCode(code) {
    var info = JSON.parse(getToken())
    return request({
        url: `/book/coupon/getCouponByCode/${code}/${info.userId}/${info.userNickName}`,
        method: 'get',
    })
}

//  /book/coupon/get/{id} 根据编号获取优惠券
export function getCoupan(id) {
    return request({
        url: `/book/coupon/get/${id}`,
        method: 'get',
    })
}