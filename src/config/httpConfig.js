import axios from "axios";
import { Message } from 'element-ui'
const http = {}
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  validateStatus(status){
    switch (status) {
      case 400:
          Message.error('请求出错')
          break
      case 401:
          Message.warning({
              message: '授权失败，请重新登录'
          })
          // store.commit('LOGIN_OUT')
          // setTimeout(() => {
          //     window.location.reload()
          // }, 1000)
          // return
      case 403:
          Message.warning({
              message: '拒绝访问'
          })
          break
      case 404:
          Message.warning({
              message: '请求错误,未找到该资源'
          })
          break
      case 500:
          Message.warning({
              message: '服务端错误'
          })
          break
      }
    return status >= 200 && status < 500;
  }
})
//拦截器
instance.interceptors.request.use((req) => {
  const token = window.sessionStorage.getItem('token')
  if(token){
    req.headers.token = token
  }
  return req
},(error) => {
  return Promise.reject(error)
})
instance.interceptors.response.use((res) => {
  return res.data
},(error) => {
  //return error
  console.log(error)
  return Promise.reject(error)
})
//get请求
http.get = function({url = '',data = ''} = {}) {
  return new Promise((resolve,reject) => {
    instance({url,data,method:'GET'}).then((res) => {
      resolve(res)
    }).catch(error =>{
      reject(error)
    })
  })
}
//post请求
http.post = function({url = '',data = ''} = {}){
  return new Promise((resolve,reject) => {
    instance({url,data,method:'POST'}).then((res) => {
      resolve(res)
    }).catch(error =>{
      console.log(error)
      reject(error)
    })
  })
}
// http.post = async function({url = '',data = ''} = {}){
//   try {
//     return await instance({
//       method: 'post',
//       url,
//       data,
//     })
//   }catch(err) {
//     throw err
//   }
// }


export default http