import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import menuList from './config/menuconfig.js';
import { 
  Button ,
  Icon,
  Menu,
  Row,
  Col
} from 'antd';
import Login from'./component/Login';


function User(props){


    return (
      
      <div className="User">
      <Login></Login>
     </div>
    );
  
}




export default User;

