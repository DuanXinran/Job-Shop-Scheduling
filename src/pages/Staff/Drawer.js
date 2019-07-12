import React, { Component } from 'react';
import "./index.css";
import { Drawer, Button } from 'antd';
import AddDrawer from'./AddDrawer';
import ReactMarkdown from'react-markdown';

export default class MyDrawer extends Component{

  constructor(props) {
    super(props);
   
    this.state = {
      visible: false,
    
    }    
  }
 
  showDrawer = () => {
    this.setState({
      visible: true,
    });
    
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

    render(){
        return(
            
              <div>
        <Button icon="menu-fold" onClick={this.showDrawer}>
         
        </Button>
        <Drawer id='drawer'
          
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
         width='60vw'
        
        >
        

          员工编号：<span>{this.props.data.employeeid}</span><br/>
          员工名：<span>{this.props.data.name}</span><br/>
          性别：<span>{this.props.data.sex}</span><br/>
          地址：<span>{this.props.data.address}</span><br/>
          邮箱：<span>{this.props.data.email}</span><br/>
          电话：<span>{this.props.data.tel}</span><br/>

         
          <AddDrawer name={'修改'}  data={this.props.data} ReAdd={this.props.ReAdd} rowKey={this.props.rowKey} >修改</AddDrawer>
        </Drawer>
      </div>

        )
    }

}


