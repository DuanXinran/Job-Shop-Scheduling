import React, { Component } from 'react';
import "./index.css";
import formatDate from './../../pages/Timer/timer';
import { Drawer, Button,Input } from 'antd';
import Editor from 'for-editor'



const input = '# This is a header\n\nAnd this is a paragraph'


  
export default class AddMarkdown extends Component{
    constructor(props) {
        super(props)
        this.state = {
          value1: '',
          value2: '',
          value3: '',
          value4: '',
          value5: '',
          value6: '',
        }
        this.pushRow = this.pushRow.bind(this);
    
      }


      componentWillMount () {

        if(this.props.data){

        this.setState({
          value1: this.props.data.employeeid,
          value2:this.props.data.name,
          value3:this.props.data.sex,
          value4:this.props.data.address,
          value5:this.props.data.email,
          value6:this.props.data.tel
      
        })
      
      }
      }


pushRow(){

  

  if(this.props.data){
    this.getTime();
      
    var value1=this.state.value1;
    var value2=this.state.value2;
    var value3=this.state.value3;
    var value4=this.state.value4;
    var value5=this.state.value5;
    var value6=this.state.value6;
    this.props.ReAdd(value1,value2,value3,value4,value5,value6);
    
  }
  else{
   if(this.state.value1==''|this.state.value2==''|this.state.value3==''|this.state.value4==''|this.state.value5==''|this.state.value6==''){
    alert('内容不能为空');
    
  }else{
  

  var value1=this.state.value1;
  var value2=this.state.value2;
  var value3=this.state.value3;
  var value4=this.state.value4;
  var value5=this.state.value5;
  var value6=this.state.value6;
  this.props.pushRow(value1,value2,value3,value4,value5,value6);
  this.setState({
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    value6: '',
   

  })}
  
}

this.props.post();
}
  





      change1=(event)=> {
        this.setState({
          value1:event.target.value
        })
        
       }
       
      change2=(event)=> {
        this.setState({
          value2:event.target.value
        })
        
       }
       
      change3=(event)=> {
        this.setState({
          value3:event.target.value
        })
        
       }
       
      change4=(event)=> {
        this.setState({
          value4:event.target.value
        })
        
       }
       
      change5=(event)=> {
        this.setState({
          value5:event.target.value
        })
        
       }
       
      change6=(event)=> {
        this.setState({
          value6:event.target.value
        })
        
       }
       
      render() {
       const value1  = this.state.value1       
       const value2  = this.state.value2   
       const value3  = this.state.value3  
       const value4  = this.state.value4  
       const value5  = this.state.value5   
       const value6  = this.state.value6   
    
    
        return (
        <div>
        
         员工编号:<Input  value={value1} onChange ={event => this.change1(event)}/>
         姓名:<Input  value={value2}  onChange ={event => this.change2(event)}/>
         性别:<Input  value={value3} onChange ={event => this.change3(event)}/>
         地址:<Input  value={value4} onChange ={event => this.change4(event)}/>
         邮箱:<Input  value={value5}  onChange ={event => this.change5(event)}/>
         电话:<Input  value={value6}  onChange ={event => this.change6(event)}/>
       
        <Button  onClick={this.pushRow} >提交</Button>
        </div>
        )
      }

}

