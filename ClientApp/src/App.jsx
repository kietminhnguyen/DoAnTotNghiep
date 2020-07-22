import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login } from './components/systems/login/Login';
import  {Layout}  from './components/systems/Layout';

// import { PhongBan } from './components/features/QLPhongBan/PhongBan';
// import {qlnsData} from './components/common/firebaseConnect';

export default class App extends Component {
    //static displayName = App.name;
    
    render() {
            return (
                <Switch>
                    < Route exact path='/login' component={Login} />
                    < Route path='/' component={Layout} />
                </Switch >
                //<PhongBan getData={(item)=>this.addData(item)}></PhongBan>
            );
    }
}

//export default App;