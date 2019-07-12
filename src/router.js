import React, { Component } from 'react';
import  {HashRouter as Router, Route} from 'react-router-dom';
import App from './App.js';
import User from'./User.js';

import Staff from'./pages/Staff';
import Device from './pages/Device';
import Login from'./component/Login';
import Register from './pages/Register'
import JobShop from'./pages/JobShop';
import JobDetail from './pages/JobDetail'
class IRouter extends Component {
    render() {
        return (
            <div>
               
                <Router>
                     <App>
                

                       <Route path="/login" component={Login}></Route>

                        <Route path="/jobShop" component={JobShop}></Route>
                        <Route path="/JobDetail" component={JobDetail}></Route>
                        <Route path="/staff" component={Staff}></Route>
                        <Route path="/device" component={Device}></Route>
                        <Route path="/register" component={Register}></Route>
                        
                    </App>
                </Router>
            </div>
        );
    }
}

export default IRouter;
