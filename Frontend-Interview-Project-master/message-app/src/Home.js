import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import './css/home.css';
import Message from './Message.js';

class Home extends Component {
  constructor(props){
    super(props);

    var currentLocation = this.props.location.pathname;
    var arr=currentLocation.split('/');
    var username=arr[2];
    var logintime=arr[3];
    var onlinetime =  Math.round((Math.floor(Date.now() / 1000) - arr[3])/60);

    this.state = {
      username: username,
      logintime: logintime,
      onlinetime: onlinetime,
      rooms:[],
      roomsdetail: [],
      roomid: '',
      roomname: '',
      roomusers: [],
      messages: []
         
    }
    
  }
 

  componentDidMount() {
    fetch('http://localhost:8080/api/rooms')
      .then(response => response.json())
      .then(data => 
        {
        this.setState({ rooms: data })
        data.map(room =>
          fetch('http://localhost:8080/api/rooms/' +room.id)
          .then(response => response.json())
          .then(data => {
            var roomsdetail = this.state.roomsdetail.slice()
            if(data.users.includes(this.state.username)){
              data.link='http://localhost:8080/api/rooms/'+data.id+'/messages'
              data.navlink='/home/'+ this.state.username+'/'+this.state.logintime+'/'+ data.id
              roomsdetail.push(data)
              this.setState({ roomsdetail: roomsdetail })}
          })
         )

         }
        );

      
  }
  
  render() {
      const { roomsdetail } = this.state;
      const {username} =this.state;
      
    return (
      <HashRouter>
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
                  <h2>{username}</h2>
                  <h4>online for { this.state.onlinetime} minutes </h4>
           </div>

          <ul className="list-unstyled components">

            {roomsdetail.map((roomdetail, i) =>
          <li key={i}>
            <NavLink to={roomdetail.navlink} key={i}>{roomdetail.name}</NavLink>
          </li>
           )}

          </ul>
          
        </nav>
         <div className="content">
            <Route exact path='/home/:username/:logintime/:id' component={Message}/>
         </div>
      </div>
    </HashRouter>



    );
  }

}


export default withRouter(Home);
