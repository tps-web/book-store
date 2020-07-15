import { getInfo } from '@/api'


export default {
    getUserInfo({ commit }) {
        getInfo().then(res => {
            commit('USER_INFO', res.data)
        })
    }
}