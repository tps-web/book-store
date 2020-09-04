import Vue from 'vue'
import { jian, discountsNumber } from '@/utils'
// 引入mutation-type
import {
    Toast
} from 'vant'

import {
    USER_INFO,
    ADD_TO_CART,
    ADD_GOODS,
    SINGLE_SELECT_GOODS,
    ALL_SELECT_GOODS,
    DELETE_SELECT_GOODS,
    CHANGE_ADDRESS,
    DEFAULT_ADDRESS,
    ADD_ADDRESS,
    USER_COUPON,
    SELETE_COUPON,
    USECOUPONTEXT,
    ALL_CART,
    COUPON_TOTAL,
    FREIGHT,
    GETMEMBERINFO,
    ISRENDORDER,
    ISPOPPASS,
    SENDEXPESSADDRESS,
    EXPRESSCOMPANY,
    EXPRESSDATETIME, //预约快递信息
    BUGRENTBOOKLIST,
    SELETE_GOODS_RENT,
    ALL_SELECT_RENT,
    SAVEREMARK
} from './mutation-type'

import { setLocalStore, } from '../utils/LocalStore'

export default {
    //用户信息
    [USER_INFO](state, userInfo) {
        state.userInfo = userInfo
        setLocalStore('userInfo', state.userInfo)
    },
    [ADD_GOODS](state, { cartId, bookIsbn, goodsID, goodsName, smallImage, goodsPrice, quantity, rebatePrice, price, memberPrice }) {
        let shopCart = state.shopCart
            // console.log(state.shopCart)
        if (!shopCart[goodsID]) {
            //不存在此书
            shopCart[goodsID] = {
                    'cartId': cartId,
                    'bookIsbn': bookIsbn,
                    'id': goodsID,
                    'name': goodsName,
                    'price': goodsPrice,
                    'smallImage': smallImage,
                    'checked': true,
                    'bookQuantity': quantity,
                    'rebatePrice': rebatePrice,
                    'allPrice': price,
                    'discounts': jian(price, rebatePrice),
                    'discountsNum': discountsNumber(price, rebatePrice),
                    'memberDiscountsNum': discountsNumber(price, memberPrice),
                    'memberPrice': memberPrice
                }
                // 1.3 给shopCart产生新对象
            state.shopCart = {
                ...shopCart
            };
        }
        // if (shopCart[goodsID]) {
        //     // console.log('购物车已有此书')
        //     // Toast('购物车已有此书')
        // } else {
        //     //不存在此书
        //     shopCart[goodsID] = {
        //             'cartId': cartId,
        //             'id': goodsID,
        //             'name': goodsName,
        //             'price': goodsPrice,
        //             'smallImage': smallImage,
        //             'checked': true
        //         }
        //         // 1.3 给shopCart产生新对象
        //     state.shopCart = {
        //         ...shopCart
        //     };
        //     if (sql === 1) {
        //         Toast('加入购物车成功！')
        //     }
        // }
    },
    // [ADD_TO_CART](state, goods, sql) {
    //     // console.log(goods)
    //     //用户是否为空
    //     if (state.userInfo) {
    //         this.commit('ADD_GOODS', {
    //             goodsID: goods.id,
    //             goodsName: goods.title,
    //             smallImage: goods.minImage || goods.squareImage,
    //             goodsPrice: goods.price,
    //             sql: sql
    //         })
    //     } else {
    //         Toast('没有用户信息')
    //     }
    // },
    //选择单个
    [SINGLE_SELECT_GOODS](state, { goodsId }) {
        let shopCart = state.shopCart
        let goods = shopCart[goodsId]
        if (goods) {
            if (goods.checked) {
                //取反
                goods.checked = !goods.checked
            } else {
                // 不存在那么就设置默认值
                Vue.set(goods, 'checked', true);
            }
        }
        state.shopCart = {
            ...shopCart
        };
    },
    //选择全部
    [ALL_SELECT_GOODS](state, { isCheckedAll }) {
        let shopCart = state.shopCart
            // console.log(isCheckedAll)
        Object.values(shopCart).forEach((goods, index) => {
            if (goods.checked) { // 存在该属性
                goods.checked = !isCheckedAll;
            } else {
                Vue.set(goods, 'checked', !isCheckedAll);
            }

            // 5.2 同步state数据
            state.shopCart = {
                ...shopCart
            };
        });
    },
    //删除
    [DELETE_SELECT_GOODS](state) {
        let shopCart = state.shopCart
        Object.values(shopCart).forEach((goods, index) => {
            if (goods.checked) {
                delete shopCart[goods.id]
            }
        })
        state.shopCart = {
            ...shopCart
        };
    },
    //换地址
    [CHANGE_ADDRESS](state, address) {
        state.currentAddress = address
    },
    // 发件人地址
    [SENDEXPESSADDRESS](state, address) {
        state.addressExpess = address
    },
    //过滤默认地址
    [DEFAULT_ADDRESS](state, addresss) {
        addresss.forEach((ele, index) => {
            if (ele.isDefault) {
                state.currentAddress = ele
            }
        })
    },
    //添加地址
    [ADD_ADDRESS](state, address) {
        state.shippingAddress.push(address)
            // state.shippingAddress = {
            //     ...shippingAddress
            // };
        Toast('添加成功')
            // console.log(state.shippingAddress)
    },
    //用户优惠券
    [USER_COUPON](state, data) {
        // console.log(data)
        data.page.curPage == 1 ? state.coupon = data : state.coupon = state.coupon.concat(data)
    },
    [COUPON_TOTAL](state, data) {
        state.couponTotal = data
    },
    //使用优惠券
    [SELETE_COUPON](state, couponItem) {
        state.useCoupon = couponItem
    },
    [USECOUPONTEXT](state, text) {
        state.useCouponText = text
    },
    [ALL_CART](state, allCartArr) {
        let shopCart = state.shopCart
        shopCart = {}
        state.shopCart = {
            ...shopCart
        };
        // console.log(shopCart)
        if (allCartArr.length > 0) {
            for (var i = 0; i < allCartArr.length; i++) {
                this.commit('ADD_GOODS', {
                    cartId: allCartArr[i].id,
                    bookIsbn: allCartArr[i].bookIsbn,
                    goodsID: allCartArr[i].bookId,
                    goodsName: allCartArr[i].bookName,
                    smallImage: allCartArr[i].bookPic,
                    goodsPrice: allCartArr[i].rebatePrice || allCartArr[i].price,
                    quantity: allCartArr[i].quantity,
                    rebatePrice: allCartArr[i].rebatePrice, //折扣价
                    price: allCartArr[i].price, //原价
                    memberPrice: allCartArr[i].memberPrice || allCartArr[i].rebatePrice || allCartArr[i].price //会员价
                })
            }
        }
    },
    //邮费
    [FREIGHT](state, freight) {
        state.freight = freight
    },
    //会员
    [GETMEMBERINFO](state, info) {
        state.memberInfo = info
    },
    //是否存在待归还
    [ISRENDORDER](state, total) {
        state.isRendOrder = total
    },
    //修改首页弹出框
    [ISPOPPASS](state, isTrue) {
        state.isPopPass = isTrue
    },
    //SETEXPRESSDESC  预约快递时间
    [EXPRESSDATETIME](state, data) {
        state.expressDateTime = data
    },
    // 预约快递公司
    [EXPRESSCOMPANY](state, data) {
        state.expressCompany = data //预约快递快递公司
    },
    //买断书籍
    [BUGRENTBOOKLIST](state, data) {
        state.bugRentBookList = data
    },
    //选择单个
    [SELETE_GOODS_RENT](state, index) {
        // console.log(state.bugRentBookList[index])
        state.bugRentBookList[index].checked = !state.bugRentBookList[index].checked
    },
    [ALL_SELECT_RENT](state, { isCheckedAll }) {
        let bugRentBookList = state.bugRentBookList
        bugRentBookList.forEach((goods, index) => {
            if (goods.checked) { // 存在该属性
                goods.checked = !isCheckedAll;
            } else {
                Vue.set(goods, 'checked', !isCheckedAll);
            }
            // 5.2 同步state数据
            state.bugRentBookList = bugRentBookList
        });
    },
    [SAVEREMARK](state, data) {
        state.remark = data
    }
}