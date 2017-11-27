import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router-dom';
import './css/message.css'
 
class Message extends React.Component {
  constructor(props){
      super(props);

      var currentLocation = this.props.location.pathname;
      var arr=currentLocation.split('/');
      var username=arr[2];
      var logintime=arr[3];
      var roomid=arr[4];
      var onlinetime =  Math.round((Math.floor(Date.now() / 1000) - arr[3])/60);

      this.state = {
        username: username,
        logintime: logintime,
        onlinetime: onlinetime,
        roomsdetail: [], 
        roomid: roomid,   
        roomname: '',
        roomusers: [],
        messages: [],
        newmessage: ''  
      }
      this.handleChange=this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fetchMessages = this.fetchMessages.bind(this);
      this.componentDidMount= this.componentDidMount.bind(this);
      this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    handleChange = event => {
      this.setState({
        newmessage: event.target.value
      })
    }

    handleSubmit = event => {
    
      fetch('http://localhost:8080/api/rooms/' + this.state.roomid + '/messages', {
        method: 'post',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name: this.state.username,
          message: this.state.newmessage
        })
      }).then( (response ) => {
       this.fetchMessages();
       this.scrollToBottom();
      });
    }

   componentDidMount() {
    this.fetchMessages();
  }


   fetchMessages(){
    fetch('http://localhost:8080/api/rooms/'+this.state.roomid)
      .then(response => response.json())
      .then(data => 
        {var userarr=[]
          var users= data.users
          for( var i=0; i<users.length; i++){
            if(users[i] === this.state.username){
              userarr.push({name: users[i], tag: "login"})
            }else{
              userarr.push({name: users[i], tag: "notlogin"})
            }
          }

        this.setState({ 
          roomname: data.name,
          roomusers: userarr
        })

         }
        );   

        fetch('http://localhost:8080/api/rooms/'+this.state.roomid+'/messages') 
          .then(response => response.json())
          .then(data => 
          {
            for(var i=0; i<data.length; i++){
              if(data[i].name===this.state.username)
                data[i].usertag="loginuser";
              else 
                data[i].usertag="otheruser"
            }
            this.setState({ messages: data})
          }
          );
   }


  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const {roomusers} = this.state;
    const {messages} = this.state;

    return (
    <div>
      <div className="roominfo">
        <h2>{this.state.roomname}</h2>
        {roomusers.map(function(user, i){
          return <p className={user.tag} key={i}> {user.name} , </p>  
        })
        }
      </div>

      <div id="messagebox" className="messagebox">


        {messages.map((message, i)=>
          <div className={message.usertag} key={i}>
            <span >{message.message}</span>
            <br/>
            <br/>
             <p> {message.name} </p>
          </div>          
           )}
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>

      

      <div className="newmessage">
      <input type="text" className="input" placeholder="Type a message"
            onChange={this.handleChange} />
      <input className="btn" type="button" value="send" id="submitinput" onClick={this.handleSubmit}/>
      </div>

    </div>


    );
  }
}
 
export default withRouter(Message);