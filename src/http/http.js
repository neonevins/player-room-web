import axios         from 'axios'
import nprogress     from 'nprogress'
import { ElMessage } from 'element-plus'
import { getToken }  from "../utils"

// 运行环境: 本地环境:devlpment 和线上(生产)环境: production
// const isPro = process.env.NODE_ENV === 'production'
const isPro = true

const http = axios.create({
  baseURL: isPro ? 'http://node.atoz.ac.cn:3001/v1/' : '/api',
  timeout: 100000,
  transformRequest: [function (data) {
    data = JSON.stringify(data)
    return data
  }],
})

http.interceptors.request.use((config) => {
  nprogress.start()
  // 前后端鉴权
  config.headers['token'] = localStorage.getItem('token')

  if(config.method === 'post') {
    config.headers['Content-Type'] = 'application/json';
  }

  return config
}, err => {
  nprogress.done()
  return Promise.reject(err)
})

http.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
},async err => {
  if(!err.response) {
    ElMessage.error(JSON.stringify(err.message))
    return Promise.reject(err)
  }
  if(err?.response?.data?.errorCode !== 0) {
    ElMessage.error(err?.response?.data?.msg)
    await getToken(true);
  } else {
    ElMessage.error(JSON.stringify(err))
  }
  return Promise.reject(err)
})


export default http
