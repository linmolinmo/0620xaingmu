/*
后台管理主路由组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {removeUserToken} from '../../redux/action-creators/user'

class Admin extends Component {
  logout = () =>{
    this.props.removeUserToken()
  }
  render() {

    if (!this.props.hasLogin) {
      // return <Redirect to="/login"/> 
      return <Redirect to="/login"/>

            
      
    }
    return (

      <div>
        <p>你好{this.props.user.username}</p>
        <button onClick = {this.logout}>退出登陆</button>

      </div>
    )
  }
}

export default connect(
  state => ({user:state.user.user, hasLogin:state.user.hasLogin}),

  
  {removeUserToken}

)(Admin)



//固定格式,


// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import {Redirect} from 'react-router-dom'

// import { removeUserToken } from '../../redux/action-creators/user'
