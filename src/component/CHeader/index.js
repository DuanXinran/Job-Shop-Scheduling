import React, { Component } from 'react';
import "./index.css";
import { Row } from 'antd';
import formatDate from './../../pages/Timer/timer';
import Modal from'./../Login/Modal';

import RegistrationForm from './../../pages/Register'
export default class CHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            timer:'',
            flag:''
           
        }
    }
    componentWillMount(){
         if(window.localStorage.getItem("islogined")=="false"){
           this.setState({
               flag:'请登录'
           })
         }else{
            this.setState({
                flag:'退出'
            })
         }      
        setInterval(()=>{
            let now=new Date();
            let timer =formatDate(now);
            // console.log(timer)
            this.setState({
                timer
            })
      },1000);
    }
  
    onRef = (ref) => {
        this.child = ref

    }
    
    signout=(e)=>{
        var storage=window.localStorage;
        storage.setItem("islogined",false);
        this.child.showModal()       
    }
 
    render(){   
        return(
            <div>
              
               <Modal onRef={this.onRef} ></Modal>               
               <Row className="header-top">
              <a  className={window.localStorage.getItem("islogined")=="true"?"show":"hidden"} onClick={this.signout}>退出</a>
            <a className={window.localStorage.getItem("islogined")=="true"?"hidden":"show"} >请登录</a>
               </Row>
               <Row className="header-date">
               <span>
               {this.state.timer}
               </span>
               </Row>
            </div>
        )
    }

}