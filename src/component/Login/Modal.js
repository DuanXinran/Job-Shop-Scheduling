import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import "./index.css";
import Login from'.';
import ReactDOM from'react-dom';
class myModal extends React.Component {
 
  
  constructor(props) {
    super(props); 
    this.state = {
        visible: true,
     
    }
    // this.checkLogin=this.checkLogin.bind(this);
    this.closeModal=this.closeModal.bind(this);
  }

  componentWillMount () {
    console.log("local"+window.localStorage.getItem("islogined"))
    if(window.localStorage.getItem("islogined")=='false'){     
    this.showModal();
    }else{
    this.setState({
    visible: false,
    });
    }
     };
  

  showModal = () => {
  
    this.setState({
      visible: true
      });
  };
 
  closeModal = () => {
    this.setState({
      visible:false
    })
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidMount(){
    this.props.onRef(this)
}

  render() {
    console.log( "visible"+ this.state.visible);
    return (
      <div >
        <Modal
          title="登录"        
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={''}
          maskClosable={false}         
        >
                  <Login checkLogin={this.checkLogin} Close={this.closeModal}></Login>
        </Modal>
      </div>
    );
  }
}

export default myModal;