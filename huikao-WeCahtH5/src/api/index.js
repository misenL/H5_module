import request from '@/utils/request'

export default {
  // login (data, query) {
  //   return request({
  //     url: '/login',       // or /login/${query.id}  / /login?query
  //     method: 'post',
  //     data,        // 有data就写，没有就不用写
  //   })
  // },
  login (data, query) {
    return request({
      url: '/login',
      method: 'post',
      data,
    })
  },

}
