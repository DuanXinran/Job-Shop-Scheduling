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
      
        机器编号：<span>{this.props.data.machineid}</span><br/>
        机器名：<span>{this.props.data.machinename}</span><br/>
        机器类型：<span>{this.props.data.machinetype}</span><br/>
        机器使用年限：<span>{this.props.data.machinedata}</span><br/>


          <AddDrawer name={'修改'}  data={this.props.data} ReAdd={this.props.ReAdd} rowKey={this.props.rowKey}>修改</AddDrawer>
        </Drawer>
      </div>

        )
    }

}


