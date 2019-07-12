import React, { Component } from 'react';
import "./index.css";
import { Drawer, Button } from 'antd';
import AddMarkdown from './AddMarkdown';


export default class AddDrawer extends Component{

  constructor(props) {
    super(props); 
    this.state = {
      visible: false,
      gotValue:{  

      }
    
    }
    
    this.ReAdd = this.ReAdd.bind(this);
    this.pushRow = this.pushRow.bind(this);
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
    
    pushRow=(value1,value2,value3,value4,value5,value6)=>{
      var gotValue={
           
          
          "employeeid": value1,
          "name":value2,
         "sex": value3,
         "address": value4,
         "email" :value5,
         "tel": value6
       }
       this.props.pushRow(gotValue);
       this.onClose();
    };

  
  ReAdd=(value1,value2,value3,value4,value5,value6)=>{

    var gotValue={
      "employeeid": value1,
      "name":value2,
     "sex": value3,
     "address": value4,
     "email" :value5,
     "tel": value6         
     }
     this.props.ReAdd(this.props.rowKey,gotValue);
     
     this.onClose();
  };
    render(){
        return(
            
              <div  class="addDrawer" > 
       
        <Button class='addButton' type="primary" backgroundcolor="blue"  onClick={this.showDrawer}>    
         {this.props.name}
        </Button>
        
        <Drawer id='drawer'
          
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
         width='60vw'
        >
          
          
          <AddMarkdown  pushRow={this.pushRow}  data={this.props.data}  ReAdd={this.ReAdd} rowKey={this.props.rowKey} post={this.props.post}></AddMarkdown>
          {/* <Button onClick={this.addRow}  >提交</Button> */}
         
        </Drawer>
        
        
      </div>

        )
    }

}


