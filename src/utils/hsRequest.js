import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant';

const servise = axios.create({
    baseURL: '/baseApi',
    // baseURL: 'https://huisn.com.cn/hs',
    timeout: 8000, // request timeout
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})
servise.interceptors.request.use(
        config => {
            //在发送请求之前做某件事
            if (config.method === 'post') {
                config.data = qs.stringify(config.data);
            }
            return config;
        },
        error => {
            // 这里处理一些请求出错的情况
            Promise.reject(error)
        }
    )
    //返回状态判断(添加响应拦截器)
servise.interceptors.response.use((res) => {
    //对响应数据做些事
    if (!res.data.success) {
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    // console.log('网络异常')
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
        console.log('网络超时')
        Toast('网络超时');
    }
    return Promise.reject(error);
});

export default servise