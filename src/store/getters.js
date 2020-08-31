import state from "./state";

export default {
    getShopCart(state) {
        return state.shopCart
    },
    // expressCompany: undefined, //预约快递快递公司
    // expressDateTime: undefined //预约快递时间
    isPopPass: state => state.isPopPass,
    bugRentBookList: state => state.bugRentBookList,
    expressCompany: state => state.expressCompany,
    expressDateTime: state => state.expressDateTime,
    // 是否存在待归还
    getRentOrder: state => state.isRendOrder,
    // getCouponList: state => state.coupon,
    getCouponList(state) {
        return state.coupon.sort(function(a, b) {
            return a.useStatus - b.useStatus
        })
    },
    getCouponTotal: state => state.couponTotal,
    TabTotal: state => state.TabTotal,
    SELECTED_GOODS_PRICE(state) {
        let totalPrice = 0;
        Object.values(state.shopCart).forEach((goods, index) => {
                if (goods.checked) {
                    totalPrice += goods.price * 100
                }
            })
            // state.allTotal = totalPrice / 100
        return (totalPrice / 100).toFixed(2)
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
            var total = (totalPrice / 100).toFixed(2)
                // if (state.freight) {
                //     total = totalPrice / 100 + state.freight
                // }
            return total
        } else {
            let totalPrice = 0;
            Object.values(state.shopCart).forEach((goods, index) => {
                if (goods.checked) {
                    totalPrice += goods.price * 100
                }
            })
            var total = (totalPrice / 100).toFixed(2)
                // if (state.freight) {
                //     total = totalPrice / 100 + state.freight
                // }
            return total
        }
    },
    //结算 包含邮费
    // FEIVIPCLEARED_NUM(state) {
    //     if (state.useCoupon) {
    //         let totalPrice = 0;
    //         Object.values(state.shopCart).forEach((goods, index) => {
    //                 if (goods.checked) {
    //                     totalPrice += goods.price * 100
    //                 }
    //             })
    //             //减钱
    //         totalPrice = totalPrice - state.useCoupon.amount * 100
    //             // if (state.useCoupon.type === 0) {
    //             //     totalPrice = totalPrice - state.useCoupon.price * 100
    //             // } else if (state.useCoupon.type === 1) {
    //             //     //折扣
    //             //     totalPrice = totalPrice * state.useCoupon.discount / 10
    //             // }
    //         var total = (totalPrice / 100).toFixed(2)
    //         if (state.freight) {
    //             total = totalPrice / 100 + state.freight
    //         }
    //         return total
    //     } else {
    //         let totalPrice = 0;
    //         Object.values(state.shopCart).forEach((goods, index) => {
    //             if (goods.checked) {
    //                 totalPrice += goods.price * 100
    //             }
    //         })
    //         var total = (totalPrice / 100).toFixed(2)
    //         if (state.freight) {
    //             total = totalPrice / 100 + state.freight
    //         }
    //         return total
    //     }
    // },
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
    //商品金额
    SELECTED_GOODS_TOTAL(state) {
        let tatal = 0;
        Object.values(state.shopCart).forEach((good, index) => {
            if (good.checked) {
                tatal += good.allPrice * 100
            }
        });
        return (tatal / 100).toFixed(2);
    },
    //总优惠
    ALL_DISCOUNTS(state) {
        let tatal = 0;
        Object.values(state.shopCart).forEach((good, index) => {
            if (good.checked) {
                tatal += good.discountsNum * 100
            }
        });
        return (tatal / 100).toFixed(2);
    },
    //结算买断商品
    RENT_BOOK_TOTAL(state) {
        let tatal = 0
        Object.values(state.bugRentBookList).forEach((good, index) => {
            if (good.checked) {
                tatal += good.bookPrice * 100
            }
        });
        return (tatal / 100).toFixed(2);
    },
    //买断选中
    CheckGoods(state) {
        let rentBugBookArr = [];
        let rentBook = state.bugRentBookList
        Object.values(rentBook).forEach((good, index) => {
            if (good.checked) {
                rentBugBookArr.push(good);
            }
        });
        return rentBugBookArr;
    },
}