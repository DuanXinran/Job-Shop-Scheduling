import React, { Component } from 'react';
import "./index.css";
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Modal
  } from 'antd';
  import axios from 'axios';

  const { Option } = Select;
  const AutoCompleteOption = AutoComplete.Option;
  
 
  
  class RegistrationForm extends React.Component {
    
    constructor(props) {
      super(props); 
      this.state = {
          visible: false,
          confirmDirty: false,
          autoCompleteResult: [],
      }
      // this.checkLogin=this.checkLogin.bind(this);
      this.closeModal=this.closeModal.bind(this);
    }
     
    // state = {
    //   confirmDirty: false,
    //   autoCompleteResult: [],
    // };

    componentDidMount(){

      this.props.onRef(this)
  
  }
    showModal = () => {
   
      this.setState({
        visible: true,
        });
    };
    closeModal=()=>{
      this.setState({
        visible:false
      })
    }
  
  
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          let data = {"idname":values.idname,"password":values.password,"name":values.name,"sex":values.sex , "email":values.email, "tel":values.phone};
          axios.post('https://bird.ioliu.cn/v1?url=http://106.15.39.130/abc/Register.action',data)
          .then(res=>{
              console.log('res=>',JSON.parse(res.data).repeat); 
            
            if(JSON.parse(res.data).repeat){
              this.closeModal();
            }
            else{
              alert('注册失败')
            }
            
            
            })
              
 }});
    };
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
    handleWebsiteChange = value => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>,
      );
  
      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));
  
      return (
          <div class='register'>
{/* <Modal></Modal>  */}


<Modal
          title="注册"
          
          visible={this.state.visible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          
          maskClosable={false}
          closable={true}
        >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label={
            <span>
              idname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('idname', {
            rules: [{ required: true, message: 'Please input your idname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>

          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
     
        <Form.Item
          label={
            <span>
             name&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
          })(<Input />)}
        </Form.Item>

        <Form.Item
          label={
            <span>
            sex&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('sex', {
            rules: [{ required: true, message: 'Please input your sex!', whitespace: true }],
          })(<Input />)}
        </Form.Item>


          <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </Form.Item>
        
     
        
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        </Modal>
        </div>
      );}}

            
      
  
  const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
  

  
  export default WrappedRegistrationForm;