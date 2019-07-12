import React, { Component } from 'react';
import "./index.css";
import formatDate from './../../pages/Timer/timer';
import { Drawer, Button,Input } from 'antd';
import Editor from 'for-editor'
 
export default class AddMarkdown extends Component{
    constructor(props) {
        super(props)
        this.state = {
          Idvalue: '',//机器编号
         Nvalue:'',//机器名称
          Tvalue:'',//机器类型
         Dvalue:''//使用年限
          
        }
        this.pushRow = this.pushRow.bind(this);       
      }


      componentWillMount () {

        if(this.props.data){

        this.setState({
          Idvalue: this.props.data.machineid,
          Nvalue:this.props.data.machinename,
           Tvalue:this.props.data.machinetype,
          Dvalue:this.props.data.machinedata,
       
        })     
      }
      }

pushRow(){

  

  if(this.props.data){
   var Idvalue=this.state.Idvalue;
   var Nvalue=this.state.Nvalue;
    var Tvalue=this.state.Tvalue;
  var  Dvalue=this.state.Dvalue;

  this.props.ReAdd(Idvalue,Nvalue,Tvalue,Dvalue);
 console.log(Idvalue,Nvalue,Tvalue,Dvalue)
    
  }
  else{
   if(this.state.Idvalue==''|this.state.Nvalu==''|this.state.Tvalue==''|this.state.Dvalue==''){
    alert('内容不能为空');
    
  }else{


    var Idvalue=this.state.Idvalue;
    var Nvalue=this.state.Nvalue;
     var Tvalue=this.state.Tvalue;
   var  Dvalue=this.state.Dvalue;
       
  this.props.pushRow(Idvalue,Nvalue,Tvalue,Dvalue);
  console.log(Idvalue,Nvalue,Tvalue,Dvalue)
  this.setState({
    Idvalue: '',
    Nvalue:'',
    Tvalue:'',
    Dvalue:''

  })}
  
}

this.props.post();
}
  
 

Idchange=(event)=> {
  this.setState({
    Idvalue:event.target.value
  })
  
 }
 Nchange=(event)=> {
  this.setState({
    Nvalue:event.target.value
  })
  
 }
 Tchange=(event)=> {
  this.setState({
    Tvalue:event.target.value
  })
  
 }
 Dchange=(event)=> {
  this.setState({
    Dvalue:event.target.value
  })
  
 }
      render() {
  
       const Idvalue=this.state.Idvalue
       const Nvalue=this.state.Nvalue
       const Tvalue=this.state.Tvalue
       const Dvalue=this.state.Dvalue
   
        return (
        <div>
         机器编号：<Input  value={Idvalue}  onChange ={event => this.Idchange(event)} />
         机器名 ：<Input  value={Nvalue}  onChange ={event => this.Nchange(event)}/>
         机器类型 ：<Input  value={Tvalue}  onChange ={event => this.Tchange(event)}/>
         机器使用年限 ：<Input  value={Dvalue}  onChange ={event => this.Dchange(event)}/>
       
        <Button  onClick={this.pushRow} >提交</Button>
        </div>
        )
      }

}

