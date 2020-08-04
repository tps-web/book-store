import Cookies from 'js-cookie'

const TokenKey = 'UserInfo'

export function getToken() {
    var info = Cookies.get(TokenKey)
    return info
}

export function setToken(token) {
    const str = JSON.stringify(token.data)
    return Cookies.set(TokenKey, str)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}