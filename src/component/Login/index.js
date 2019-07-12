import React, { Component } from 'react';
import "./index.css";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import ReactDOM from'react-dom';
import RegistrationForm from './../../pages/Register'
 class Login extends Component{

  constructor(props) {
    super(props); 
    this.state = {
        isLogined:false,
        name:'',
        password:'',  //判断是否成功登录
    }
    
   this.Close=this.Close.bind(this);
   this.Nchange=this.Nchange.bind(this);
   this.Pchange=this.Pchange.bind(this);
  }
    handleSubmit = e => {
        e.preventDefault();
        
        this.props.form.validateFields((err, values) => {
          if (!err) {
            let data = {"idname":values.username,"password":values.password};
            axios.post('https://bird.ioliu.cn/v1?url=http://106.15.39.130/abc/LoginAction.action',data)
            .then(res=>{
                console.log('res=>',JSON.parse(res.data).correct);  
                if(JSON.parse(res.data).correct){
                this.setState({
                  isLogined:true
                })    
              this.Close();   
              var storage=window.localStorage;
              storage.setItem("islogined",true)
            }
                else{
                  alert("密码错误或用户名不存在")
                }  
            })   
          }
        });
      };
 
    Close(){
      this.props.Close();
      console.log(this.state.name+this.state.password)
    }


    Nchange=(event)=> {
      this.setState({
        name:event.target.value
      })   
     }

    Pchange=(event)=> {
      this.setState({
        password:event.target.value
      })  
     }

    onRef = (ref) => {

      this.child = ref

     }

    openRe=(e)=>{
    this.child.showModal();
     }
    
  
   render(){
        const { getFieldDecorator } = this.props.form;
        const name=this.state.name;
        const password=this.state.password;
        return(
          <div>
            <RegistrationForm onRef={this.onRef}></RegistrationForm>
            <Form onSubmit={this.handleSubmit} className="login-form"  >
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input    value={name}  onChange ={event => this.Nchange(event)}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input  
                value={password}  onChange ={event => this.Pchange(event)}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              {/* <a className="login-form-forgot" href="">
                Forgot password
              </a> */}
              <Button type="primary" htmlType="submit" className="login-form-button"  > 
              {/* onClick={this.props.checkLogin} */}
                Log in
              </Button>
              Or <a  onClick={this.openRe}>register now!</a>
            </Form.Item>
          </Form>
          </div>
        );

    }

} 
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;