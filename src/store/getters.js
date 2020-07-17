export default {
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
    CLEARED_NUM(state) {
        if (state.useCoupon) {
            let totalPrice = 0;
            Object.values(state.shopCart).forEach((goods, index) => {
                    if (goods.checked) {
                        totalPrice += goods.price * 100
                    }
                })
                //减钱
            if (state.useCoupon.type === 0) {
                totalPrice = totalPrice - state.useCoupon.price * 100
            } else if (state.useCoupon.type === 1) {
                //折扣
                totalPrice = totalPrice * state.useCoupon.discount / 10
            }
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