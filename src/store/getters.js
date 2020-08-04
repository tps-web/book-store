export default {
    getShopCart(state) {
        return state.shopCart
    },
    // getCouponList: state => state.coupon,
    getCouponList(state) {
        return state.coupon.sort(function(a, b) {
            return a.useStatus - b.useStatus
        })
    },
    getCouponTotal: state => state.couponTotal,
    SELECTED_GOODS_PRICE(state) {
        let totalPrice = 0;
        Object.values(state.shopCart).forEach((goods, index) => {
            if (goods.checked) {
                totalPrice += goods.price * 100
            }
        })
        return totalPrice / 100
    },
    //选中的商品
    SELECTED_GOODS(state) {
        let goodsArray = [];
        let shopCart = state.shopCart;
        Object.values(shopCart).forEach((good, index) => {
            if (good.checked) {
                goodsArray.push(shopCart[good.id]);
            }
        });
        return goodsArray;
    },
    //结算
    CLEARED_NUM(state) {
        if (state.useCoupon) {
            let totalPrice = 0;
            Object.values(state.shopCart).forEach((goods, index) => {
                    if (goods.checked) {
                        totalPrice += goods.price * 100
                    }
                })
                //减钱
            totalPrice = totalPrice - state.useCoupon.amount * 100
                // if (state.useCoupon.type === 0) {
                //     totalPrice = totalPrice - state.useCoupon.price * 100
                // } else if (state.useCoupon.type === 1) {
                //     //折扣
                //     totalPrice = totalPrice * state.useCoupon.discount / 10
                // }
            return (totalPrice / 100).toFixed(2)
        } else {
            let totalPrice = 0;
            Object.values(state.shopCart).forEach((goods, index) => {
                if (goods.checked) {
                    totalPrice += goods.price * 100
                }
            })
            return (totalPrice / 100).toFixed(2)
        }
    }
}