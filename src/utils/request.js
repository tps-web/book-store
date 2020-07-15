import axios from 'axios'
// create an axios instance
const service = axios.create({
    baseURL: ' http://mock.studyinghome.com/mock/5f0e6465e525ff20854f7c1d/api',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
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
        return res
            // if the custom code is not 20000, it is judged as an error.

    },
    error => {
        console.log('err' + error) // for debug

        return Promise.reject(error)
    }
)

export default service