import axios from 'axios'
import store from '@/store'
import {Toast} from 'vant'

// 创建axios 实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // 请求超时时间
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// request 拦截器
service.interceptors.request.use(
  config => {
    // 这里可以自定义一些config 配置

    // loading + 1
    store.dispatch('SetLoading', true)

    return config
  },
  error => {
    //  这里处理一些请求出错的情况

    // loading 清 0 
    setTimeout(function () {
      store.dispatch('SetLoading', 0)
    }, 300)

    console.log(error)
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 这里处理一些response 正常放回时的逻辑
    if (res.code == 0) {
      Toast(res.info)
    }
    // loading - 1
    store.dispatch('SetLoading', false)

    return res
  },
  error => {
    let msg = ''
    if (error.response && error.response.status == 403) {
      window.location.href = '#/403'
      msg = '账号暂无操作权限，请联系管理员'
    } else if (error.response && error.response.status == 401) {
      msg = '登录过期,请重新登录'
    } else if(!error.response){
      if(error.toString().includes("Network Error")){
        msg = '服务已断开，请稍候再试'
      }else  if(error.toString().includes("timeout")){
        msg = '服务器连接超时，请稍后重试'
      }else {
        msg = '服务异常，请稍候再试'
      }
    }else {
      msg = '服务异常'
    }
    Toast(msg)

    // loading - 1
    store.dispatch('SetLoading', false)

    return Promise.reject(error)
  }
)

export default service
