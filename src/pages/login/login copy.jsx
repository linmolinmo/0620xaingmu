/*
用户登陆的路由组件
 */
import React, {Component} from 'react'
import { Form, Icon, Input, Button } from 'antd';
import logo from './logo.png'
// import './login.less'

import './login.less'


const Item = Form.Item


class Login extends Component {
  handleSubmit = (e)=>{
    e.preventDefault()
    this.props.form.validateFields = (err, values) => {
      if (!err) { // 验证成功
        console.log('发ajax请求', values)
      } else {
        // 什么都不用写
      }
    }
    
    
  }

  
/* 
  对密码进行自定义验证
  */
 validatePwd = (rule, value, callback) => {
  /*
  用户名/密码的的合法性要求
    1). 必须输入
    2). 必须大于等于4位
    3). 必须小于等于12位
    4). 必须是英文、数字或下划线组成
  */
 // value = value.trim()
 if (value==='') {
   callback('密码必须输入')
 } else if (value.length<4) {
   callback('密码必须大于等于4位')
 } else if (value.length>12) {
   callback('密码必须小于等于12位')
 } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
   callback('密码必须是英文、数字或下划线组成')
 } else {
   callback() // 验证通过/成功
 }
}






  render () {
    const {getFieldDecorator} = this.props.form

    // console.log('Login render() ', this.props.form )
    // const { getFieldDecorator } = this.props.form;


    return (
      <div className='login'>
        <div className="login-header">
          {/* <img src={logo} alt="logo"/> */}
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
          


          

        </div>
        <div className="login-content">
          <h1>用户登录</h1>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username', { // 配置对象: 属性名是一些特定的名称
                  // initialValue: '', // 初始值
                  initialValue: '',

                  rules: [ // 声明式验证: 使用插件已定义好的规则进行验证
                    // 1).必须输入
                    // 2). 必须大于等于4位
                    // 3). 必须小于等于12位
                    // 4). 必须是英文、数字或下划线组成
                    {required: true, whitespace: true, message:'用户名是必须'},
                    {min:4, message: '用户名不能小于4位'},
                    {max:12, message: '用户名不能大于12位'},
                    {pattern: /^[a-zA-Z0-9_]+$/,message: '用户名必须是英文、数字或下划线组成'}



                    // { required: true, whitespace: true, message: '用户名是必须' },
                    // { min: 4, message: '用户名不能小于4位'},
                    // { max: 12, message: '用户名不能大于12位'},
                    // { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
            </Item>

            <Form.Item>
              {
                getFieldDecorator('password', {
                  initialValue: '', // 初始值
                  rules: [
                    { validator: this.validatePwd}
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
              
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登 陆</Button>
            </Form.Item>
          </Form>

        </div>


      </div>

      
    )
  }
}

// const WrapperForm = Form.create()(Login)

// export default WrapperForm   // <Form(Login)/>

const WrapperForm = Form.create()(Login)
export default WrapperForm


