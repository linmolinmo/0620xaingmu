/* 
包含n个接口请求函数的模块
函数的返回值是promise
*/
// import ajax from './ajax'



/* 登陆 */
import ajax from './ajax'
export const reqLogin = ({username, password}) => ajax({
    url:'/login',
    method: 'POST',
    data: {username,password}
})

/* 获取用户列表 */
export const reqUsers = () => ajax({
    url: '/manage/user/list',
    method: 'GET',
})



