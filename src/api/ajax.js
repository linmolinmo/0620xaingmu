/* 
封装一个能发ajax请求的函数/对象
进行axios的二次封装(ajax请求)

  1). 将post请求的data对象数据转换为urlencode格式的字符串数据
  2). 如果请求成功, 判断操作是否成功
      如果成功返回返回的data数据, 外部具体请求得到需要的数据
      如果失败返回携带msg的错误, 外部具体请求处理错误
  3).统一处理请求异常, 外部调用者不用再处理请求异常
  4). 请求过程中显示请求进度的效果
    5). token验证处理
      请求拦截器: 如果有token , 添加到请求头中: Authorization
      响应拦截器失败的回调: 
        如果status401, 清除用户数据, 自动跳转到跳转
        如果当前已经在登陆界面, 不需要做处理

*/
import axios from 'axios'
import qs from 'qs'
import {
    message
} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//store,用的话引入

import store from '../redux/store'
import {removeUserToken} from '../redux/action-creators/user'
import history from '../history'


// 创建一个instance
// const instance = axios.create({
//   timeout: 10000 // 超时时间为10s
// })
const instance = axios.create({
    timeout: 10000
})





// 添加请求拦截器
// instance.interceptors.request.use(config => { // url/method/data/params
//   console.log('request interceptor onResolved()')
//   // 显示请求进度
//   NProgress.start()
//   // 1). 将post/put请求的data对象数据转换为urlencode格式的字符串数据
//   const {data} = config
//   if (data instanceof Object) { // 只要data是对象就转换
//     config.data = qs.stringify(data)
//   }
//   return config // 必须返回config
// })




// 添加请求拦截器
instance.interceptors.request.use((config) => {
    NProgress.start()
    const {
        data
    } = config
    if (data instanceof Object) {
        config.data = qs.stringify(data)

    }
    //05,如果有token , 添加到请求头中: Authorization
    const token = store.getState().user.token
    if (token) {
        config.headers['Authorization'] = 'atguigu_' + token
    }


    return config //必须返回config


})

// 添加响应拦截器

instance.interceptors.response.use(
    response => {
        // 隐藏请求进度
        NProgress.done()
        const result = response.data
        return result
    },
    error => {

        // 隐藏请求进度
        NProgress.done()

        const {status,data: {msg}={}} = error.response
        //如果status为401
        if (status === 401) {
            if (history.location.pathname !== '/login') {
                console.log('===========')
                message.error(msg)
                store.dispatch(removeUserToken())
            }
            
        }else if (status === 404) {
            message.error('请求资源不存在')
        }else{
            message.error('请求出错: ' + error.message)        
        }

        // message.error('请求出错: '+error.message)
        //中断promise链子 
        return new Promise(() => {})


        /* 
        3).统一处理请求异常, 外部调用者不用再处理请求异常
        */
        // 显示请求错误的提示
        // message.error('请求出错: ' + error.message)
        // // 中断promise链, 外部不需要再处理请求出错的情况
        // return new Promise(() => {})
    }

)


// 添加响应拦截器

// 向外暴露instance
export default instance