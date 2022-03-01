import axios from 'axios'
import nprogress from 'nprogress'
// import { Message } from 'element-ui'

// 运行环境: 本地环境:devlpment 和线上(生产)环境: production
const isPro = process.env.NODE_ENV === 'production'

const http = axios.create({
  baseURL: isPro ? '线上的接口路径' : '/api',
  timeout: 100000
})

http.interceptors.request.use((config) => {
  nprogress.start()
  // 前后端鉴权
  // jwt: JSON WEB TOKEN
  // 登录成功之后 后端会返回一个令牌
  let token = localStorage.getItem('admin_systemToken')
  if (token) {
    // 需要在请求头当中添加token
    config.headers['Authorization'] = token
  }
  return config
}, err => {
  nprogress.done()
  return Promise.reject(err)
})

http.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, err => {
  if (err.response && err.response.status) {
    // 错误请求的状态码
    let status = err.response.status
    // if (status === 400) {
    //   Message.error('参数错误')
    // }
    // if (status === 401) {
    //   Message.error('登录过期,请重新登录')
    // }
    // if (status === 403) {
    //   Message.error('没有权限')
    // }
    // if (status === 404) {
    //   Message.error('接口路径错误')
    // }
    // if (status === 500) {
    //   Message.error('服务器出错')
    // }
    // if (status === 503) {
    //   Message.error('服务器在维护')
    // }
  }
  return Promise.reject(err)
})


export default http
