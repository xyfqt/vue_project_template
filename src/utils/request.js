import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import { Toast } from "vant";

// 创建axios 实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // 请求超时时间
})


// request 拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return res
  },
  error => {
    Toast({
      message: "服务器异常",
      position: "bottom"
    });
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
