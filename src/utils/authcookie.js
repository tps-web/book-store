// import Cookies from 'js-cookie'

// const TokenKey = 'UserInfo'

// export function getToken() {
//     var info = Cookies.get(TokenKey)
//     return info
// }

// export function setToken(token) {
//     const str = JSON.stringify(token.data)
//     return Cookies.set(TokenKey, str)
// }

// export function removeToken() {
//     return Cookies.remove(TokenKey)
// }

// 本地化存储
const TokenKey = 'UserInfo'
export const setToken = (content) => {
    if (!TokenKey) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content.item)
    }
    window.localStorage.setItem(TokenKey, content)
}

// 本地化获取
export const getToken = () => {
    if (!TokenKey) return
    return window.localStorage.getItem(TokenKey)
}

// 本地化删除
export const removeToken = () => {
    if (!TokenKey) return
    return window.localStorage.removeItem(TokenKey)
}