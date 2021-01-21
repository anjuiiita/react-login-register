// Import React
import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import Axios from 'axios';

import Home from './Home';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import Search from './Search';
import Profile from './Profile';
import Footer from './Footer';
import Images from './Images';
import AddNewCurricula from './AddNewCurricula';

Axios.defaults.withCredentials = true;

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null,
      user_info:null,
      editContent:false,
      formDisplay: false,
      organizations: [],
      categories: [],
      sub_categories: {},
      ss_categories: {}
    };
    this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    this.toggleAdvForm = this.toggleAdvForm.bind(this);
    this.getOrg = this.getOrg.bind(this);
    this.getCategories = this.getCategories.bind(this);
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

  getOrg() {
    Axios.get("http://localhost:3001/getOrg").then((response) => {
        if (response.data) {
            if(response.data.result.length > 0) {
                this.setState({organizations: response.data.result});
            }
        }
    });
  }

  getCategories() {
    Axios.get("http://localhost:3001/getCategories").then((response) => {
        if (response) {
          if(response.data.result.length > 0) {
            this.setState({categories: response.data.result});
            this.populateSScategoryState(response.data.result);
            this.populateSubCategoryState(response.data.result);
          }
        }
    });
  }

  componentDidMount() {
    this.isUserAuthenticated();  
    this.getOrg();
    this.getCategories();
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

  toggleAdvForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }
  
  populateSScategoryState(categories) {
    var ss_category_list = [];
    categories.forEach(category => {
        ss_category_list.push(category.ss_category);
    })
    ss_category_list = Array.from(new Set(ss_category_list));
    var ss_category_dict = {};
    ss_category_list.forEach((data, index) => {
        var dd = {id: data+index,isChecked: false, level: ['L1', 'L2', 'L3']}
        ss_category_dict[data] = dd;
    })
    this.setState({
        ss_categories: ss_category_dict
    })
}

populateSubCategoryState(categories) {
    var sub_category_list = [];
    categories.forEach(category => {
        sub_category_list.push(category.sub_category);
    })
    sub_category_list = Array.from(new Set(sub_category_list));
    var sub_category_dict = {};
    sub_category_list.forEach(data => {
        var dd = {isChecked: false, ss_categories: []}
        sub_category_dict[data] = dd;
    })
    this.setState({
        sub_categories: sub_category_dict
    })
}

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
              path="/search" formDisplay={this.state.formDisplay} toggleAdvForm={this.toggleAdvForm}
              categories={this.state.categories}
            />
            <AddNewCurricula
              path='/addCurricula'
              organizations={this.state.organizations}
              categories={this.state.categories}
              sub_categories={this.state.sub_categories}
              ss_categories={this.state.ss_categories}
            />
            <Images
              path="/images"
            />
            {this.state.user && <Profile
              path="/profile" user={this.state.user_info}
              organizations={this.state.organizations}
            />}
          </Router>
          <Footer/>
        </div>
    );
  }
}

export default App;
