import axios from 'axios'

import {
    Toast
} from 'vant'

// create an axios instance
const service = axios.create({
    // baseURL: ' http://mock.studyinghome.com/mock/5f0e6465e525ff20854f7c1d/api',
    baseURL: process.env.API_ROOT,
    // baseURL: '/api',
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000, // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        // let each request carry token
        // ['X-Token'] is a custom headers key
        // config.headers['authorization'] = 'Bearer' + getToken()
        config.headers['Content-Type'] = 'application/json'
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000) {
            Toast(res.message)
                // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
                // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                //     // to re-login
                //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                //         confirmButtonText: '重新登录',
                //         cancelButtonText: '取消',
                //         type: 'warning'
                //     }).then(() => {
                //         store.dispatch('user/resetToken').then(() => {
                //             location.reload() // 为了重新实例化vue-router对象 避免bug
                //         })
                //     })
                // }
            return Promise.reject(new Error(res.message || 'Error'))
                // return res.message
        } else {
            return res
        }
        // return res

    },
    error => {
        console.log('err' + error) // for debug

        return Promise.reject(error)
    }
)

export default service