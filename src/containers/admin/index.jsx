/*
后台管理主路由组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
import {removeUserToken} from '../../redux/action-creators/user'
import { reqUsers } from '../../api'
import WithCheckLogin from '../with-check-login'



@connect(
  state => ({user:state.user.user}),
  {removeUserToken}
)
@WithCheckLogin

class Admin extends Component {
  logout = () =>{
    this.props.removeUserToken()
  }

  getUsers = async () =>{
    reqUsers()
    const result = await reqUsers()
    console.log('result', result)
  }
  render() {

    // if (!this.props.hasLogin) {
    //   // return <Redirect to="/login"/> 
    //   return <Redirect to="/login"/>
      
    // }


    return (

      <div>
        <p>你好{this.props.user.username}</p>
        <button onClick = {this.logout}>退出登陆</button>
        <button onClick = {this.getUsers}>获取用户列表</button>


      </div>
    )
  }
}



export default Admin 





//固定格式,


// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import {Redirect} from 'react-router-dom'

// import { removeUserToken } from '../../redux/action-creators/user'
