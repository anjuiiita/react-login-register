// Import React
import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import Axios from 'axios';

import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import Search from './Search';
import Profile from './Profile';
import Footer from './Footer';

Axios.defaults.withCredentials = true;

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null,
      user_info:null
    };
    this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
  }

 

  isUserAuthenticated() {
    Axios.get("http://localhost:3001/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        }
    }).then((response) => {
      console.log(response)
      if(response.data.loggedIn) {
        this.setState({
          user: response.data.user[0].first_name,
          displayName: response.data.user[0].first_name,
          userID: response.data.user[0].email,
          user_info: response.data.user[0]
        })
    } else {
      this.setState({
        user: null,
      })
    }
  });
}

  componentDidMount() {
    this.isUserAuthenticated();  
  }
  
  loginUser = userName => {
    this.isUserAuthenticated();
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });
    localStorage.removeItem("token")
    navigate('/login');
  };

  render() {
    return (
        <div>
        <Navigation
          user={this.state.user}
          logOutUser={this.logOutUser}
        />
        
        
          {/* {this.state.user && (
            <Welcome
              userName={this.state.displayName}
              logOutUser={this.logOutUser}
            />
          )} */}

          <Router>
            <Home path="/" user={this.state.user} />
            <Login path="/login"
            loginUser={this.loginUser}/>
          
            <Register
              path="/register"
              //registerUser={this.registerUser}
            />
            <Search
              path="/search"
            />
            {this.state.user && <Profile
              path="/profile" user={this.state.user_info}
            />}
          </Router>
          <Footer/>
        </div>
    );
  }
}

export default App;
