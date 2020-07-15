export default {
    SELECTED_GOODS_PRICE(state) {
        let totalPrice = 0;
        Object.values(state.shopCart).forEach((goods, index) => {
            if (goods.checked) {
                totalPrice += goods.price
            }
        })
        return totalPrice
    },
    DEFAULTADDRESS(state) {
        let defaultAddress
        state.shippingAddress.forEach((ele, index) => {
            if (ele.isDefault) {
                defaultAddress = ele
            }
        })
        return defaultAddress
    }
}