import { getInfo, getAddress, address, coupon } from '@/api'


export default {
    getUserInfo({ state, commit }) {
        getInfo().then(res => {
            commit('USER_INFO', res.data)
        })
        getAddress().then(res => {
            state.shippingAddress = res.data
            commit('DEFAULT_ADDRESS', res.data)
        })
        coupon().then(res => {
            commit('USER_COUPON', res.data)
        })
    }
}