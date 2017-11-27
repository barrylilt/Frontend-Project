import React, { Component } from 'react';
import './css/App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from './Home.js';
import Login from './Login.js';


class App extends Component {
 

  render() {
    return (
      <HashRouter>
     
      <div className="App">
        <Route exact path="/" component={Login}/>
        <Route path="/home/:username/:logintime" component={Home}/>

      </div>
    
    </HashRouter>
    );
  }
}

export default App;
