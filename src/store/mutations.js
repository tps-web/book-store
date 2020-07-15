import Vue from 'vue'

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
    DELETE_SELECT_GOODS
} from './mutation-type'

import { setLocalStore, } from '../utils/LocalStore'

export default {
    //用户信息
    [USER_INFO](state, userInfo) {
        console.log(userInfo)
        state.userInfo = userInfo
        setLocalStore('userInfo', state.userInfo)
    },
    [ADD_GOODS](state, { goodsID, goodsName, smallImage, goodsPrice }) {
        let shopCart = state.shopCart
        if (shopCart[goodsID]) {
            Toast('购物车已有此书')
        } else {
            //不存在此书
            shopCart[goodsID] = {
                    'id': goodsID,
                    'name': goodsName,
                    'price': goodsPrice,
                    'smallImage': smallImage,
                    'checked': true
                }
                // 1.3 给shopCart产生新对象
            state.shopCart = {
                ...shopCart
            };
            Toast('加入购物车成功！')
        }
    },
    [ADD_TO_CART](state, goods) {
        //用户是否为空
        if (state.userInfo) {
            this.commit('ADD_GOODS', {
                goodsID: goods.id,
                goodsName: goods.storyName,
                smallImage: goods.bgImage,
                goodsPrice: goods.price
            })
        } else {
            Toast('没有用户信息')
        }
    },
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
            // goods.checked = !isCheckedAll;
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
                console.log(123)
                delete shopCart[goods.id]
            }
        })
        state.shopCart = {
            ...shopCart
        };
    }

}