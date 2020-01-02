import axios from 'axios'
import { Notify } from 'vant'
import router from '@/router'
// import store from '@/store'

const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000, // 请求超时
})
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
request.interceptors.request.use(
  (config) => {
    // 这里可以添加一些自定义的config设置，如token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    // 这里处理一些请求出错的情况
    return Promise.reject(error)
  },
)
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
request.interceptors.response.use(
  response => {
    const res = response.data
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (res.code === 200 || res.code === '200') {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  }, error => {
    // 服务器返回不是 2 开头的情况，会进入这个回调
    // 可以根据后端返回的状态码进行不同的操作
    // 断网 或者 请求超时 状态
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes('timeout')) {
        console.log('超时了')
        Notify({
          type: 'danger',
          message: '请求超时，请检查网络是否连接正常'
        })
      } else {
        // 可以展示断网组件
        console.log('断网了')
        Notify({
          type: 'danger',
          message: '请求失败，请检查网络是否已连接'
        })
      }
      return
    }
    const res = error.response.status
    switch (res) {
      // 401: 未登录
      case 401:
        // 跳转登录页
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        break
      // 403: token过期
      case 403:
        // 弹出错误信息
        Notify({
          type: 'warning',
          message: '登录信息过期，请重新登录'
        })
        // 清除token
        localStorage.removeItem('token')
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        }, 1000)
        break
      // 404请求不存在
      case 404:
        Notify({
          message: '网络请求不存在',
          type: 'danger'
        })
        break
      // 其他错误，直接抛出错误提示
      default:
        Notify({
          message: error.response.data.message,
          type: 'danger'
        })
    }
    return Promise.reject(error)
  },
)

export default request
