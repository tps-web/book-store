import { setToken, getToken } from '@/utils/authcookie'
import {
    saveCart,
    getCartList,
    removeByCartId,
    saveAddress,
    getAddress,
    updateAddress,
    getCouponHistory,
    isRendOrder,
    getOrderType,
    getAllDataByType,
    isExpressOreder,
    updateCart
} from '@/api'
// var info = JSON.parse(getToken())
import { formatAddress } from '@/utils'
import {
    Toast
} from 'vant'
export default {
    getUserInfoChange({ dispatch, state, commit }) {
        var total = 0
        isRendOrder().then(res => {
            isExpressOreder().then(response => {
                var expressNum = response.data.total
                total = res.data.total + expressNum
                    // console.log(total)
                commit('ISRENDORDER', total)
            })
        })
    },
    //得到用户信息
    getUserInfo({ dispatch, state, commit }) {
        var info = JSON.parse(getToken())
        commit('USER_INFO', info)
        dispatch('getCartList')
            // getInfo().then(res => {
            //     commit('USER_INFO', res.data)
            // })
        var total = 0
        isRendOrder().then(res => {
            isExpressOreder().then(response => {
                var expressNum = response.data.total
                total = res.data.total + expressNum
                    // console.log(total)
                commit('ISRENDORDER', total)
            })
        })
        let addressOp = { curPage: 1, pageRows: 10 }
        getAddress(addressOp).then(res => {
                // console.log(res.data.rows)
                state.addressTotal = res.data.total
                dispatch('getALLAddressList')
                    // state.shippingAddress = res.data
                commit('DEFAULT_ADDRESS', formatAddress(res.data.rows))
            })
            // coupon().then(res => {
            //     commit('USER_COUPON', res.data)
            // })
    },
    //分页查询购物车
    getCartList({ dispatch, state, commit }) {
        var info = JSON.parse(getToken())
        let data = { curPage: 1, pageRows: 3, userId: info.userId }
        getCartList(data).then(res => {
            // console.log(res.data)
            state.cartTotal = res.data.total
            dispatch('getAllCartList')
                // if (data.curPage == 1) {
                //     state.allCartArr = res.data.rows
                // } else {
                //     state.allCartArr.concat(res.data.rows)
                // }
        })
    },
    //查询全部购物车
    getAllCartList({ dispatch, commit, state }) {
        // console.log(state.shopCart)
        var info = JSON.parse(getToken())
            // console.log(state.cartTotal)
        let data = { curPage: 1, pageRows: state.cartTotal, userId: info.userId }
        getCartList(data).then(res => {
            state.allCartArr = res.data.rows
                // console.log(state.allCartArr)
            commit('ALL_CART', state.allCartArr)
        })
    },
    //保存购物车
    addCart({ state, commit, dispatch }, goods) {
        var info = JSON.parse(getToken())
        let shopCart = state.shopCart
            // console.log(goods)
            //用户是否为空
        if (state.userInfo) {
            if (shopCart[goods.id]) {
                Toast('购物车已有此书')
                console.log(shopCart[goods.id])
            } else {
                let op = {
                    "bookId": goods.id,
                    "bookIsbn": goods.isbn,
                    "bookName": goods.title,
                    // "bookPic": goods.minImage || goods.squareImage,
                    "bookPic": goods.squareImage,
                    "price": goods.promotionAmount ? goods.promotionAmount : goods.price,
                    "rebatePrice": goods.promotionAmount,
                    "quantity": 1,
                    "book_category_id": goods.categoryId,
                    "book_press": goods.press,
                    "userId": info.userId,
                    "userNickName": info.userNickName
                }
                saveCart(op).then(res => {
                    Toast('加入购物车成功！')
                        // console.log(res)
                    dispatch('getCartList')
                })
            }
        } else {
            // Toast('没有用户信息')
            const u = navigator.userAgent;
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
            if (isIOS) {
                Toast('测试')
                let op = { "method": "jsCallIosGetUserId", "data": { "value": "" } }
                window.webkit.messageHandlers.jsCallIosGetUserId.postMessage(JSON.stringify(op))
            } else if (isAndroid) {
                window.android.jsCallAndroidGetUserId();
            }
        }
    },
    //添加购物车
    updataCart({ state, commit, dispatch }, data) {
        // console.log(data)
        let op = {
            id: data.id,
            quantity: data.quantity,
            userId: state.userInfo.userId,
            userNickName: state.userInfo.userNickName
        }
        updateCart(op).then(res => {
            dispatch('getCartList')
        })
    },
    //删除购物车
    deleteGoods({ state, commit }) {
        // console.log(state.shopCart)
        var deleteArr = []
        Object.values(state.shopCart).forEach((goods, index) => {
            if (goods.checked) {
                // console.log(goods.id)
                deleteArr.push(goods.cartId)
            }
        })
        var ids = deleteArr.join()
            // console.log(ids)
        removeByCartId(ids).then(res => {
            // console.log(res)
            commit('DELETE_SELECT_GOODS')
        })
    },
    //保存地址
    saveAddress({ state, commit, dispatch }, data) {
        data.userId = state.userInfo.userId
        saveAddress(data).then(res => {
            // console.log(res)
            dispatch('getALLAddressList')
        })
    },
    //更新地址
    updateAddress({ state, commit, dispatch }, data) {
        data.userId = state.userInfo.userId
        updateAddress(data).then(res => {
            dispatch('getALLAddressList')
        })
    },
    //分页查询地址
    getAddressList({ state, commit }, data) {

    },
    //全部地址 
    getALLAddressList({ state, commit }) {
        let addressOp = { curPage: 1, pageRows: state.addressTotal + state.addresssNum }
        state.addresssNum++
            getAddress(addressOp).then(res => {
                // console.log(res.data.rows)
                state.shippingAddress = formatAddress(res.data.rows)
            })
    },
    //优惠券
    couponHistory({ state, commit }, data) {
        getCouponHistory(data).then(res => {
            let op = res.data.rows
            op.page = data
            commit('USER_COUPON', op)
            commit('COUPON_TOTAL', res.data.total)
        })
    },
    //待支付数目
    wraitPayTotal({ state, commit }) {
        getAllDataByType('自动关闭订单时间').then(res => {
                state.timeData = res.data.rows[0].dataContent
                    // console.log(res.data.rows[0].dataContent)
            })
            // 0->待付款；1->待发货；2->待收货；3->待评价
            // TabTotal: {
            //     wraitTotal: 0,
            //     wraitRentTotal: 0,
            //     receiveTotal: 0
            //      returnTotal:0
            // }
            //待支付
        let op = { curPage: 1, orderType: 0, pageRows: 1, status: 0 }
        getOrderType(op).then(res => {
                // console.log(res.data.total)
                state.TabTotal.wraitTotal = res.data.total
            })
            //待发货
        let op1 = { curPage: 1, orderType: 0, pageRows: 1, status: 1 }
        getOrderType(op1).then(res => {
                // console.log(res.data.total)
                state.TabTotal.wraitRentTotal = res.data.total
            })
            //待收货
        let op2 = { curPage: 1, orderType: 0, pageRows: 1, status: 2 }
        getOrderType(op2).then(res => {
                // console.log(res.data.total)
                state.TabTotal.receiveTotal = res.data.total
            })
            //待归还
        let op3 = { curPage: 1, orderType: 1, pageRows: 1, status: 3 }
        getOrderType(op3).then(res => {
            // console.log(res.data.total)
            state.TabTotal.returnTotal = res.data.total
        })
    },
}