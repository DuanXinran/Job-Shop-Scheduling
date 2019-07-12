import React, { Component } from 'react';
import "./index.css"

import Drawer from'./Drawer';

import MyTable from'./Table';

export default class Article extends Component{

    render(){
        return(
            <div>
                 {/* <Modal ></Modal>  */}
                 <h3>设备管理</h3>
                 
                 <br></br>
                 <MyTable></MyTable>

              
            </div>
        )
    }

}