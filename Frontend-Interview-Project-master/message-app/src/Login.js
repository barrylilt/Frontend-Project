import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import './css/login.css';

class Login extends Component {

constructor(props){
  super(props);
  this.state={ 
  	username:'',
  	logintime:''	
  };
  this.handleChange=this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
 }

	 validateForm() {
	    return this.state.username.length > 0;
	  }

	handleChange = event => {
	    this.setState({
	      [event.target.id]: event.target.value,
	      logintime: Math.floor(Date.now() / 1000)
	    });

	  }

handleSubmit = event => {
    event.preventDefault();

    this.props.history.push('/home/'+ this.state.username+'/'+this.state.logintime);
  }

render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <FormControl
              autoFocus
              type="username"
              placeholder="Type your username....."
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <br/>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Join the DoorDash Chat!!
          </Button>
        </form>
      </div>
    );
  }


}

export default withRouter(Login);