import React, { Component } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from '@reach/router';

class Navigation extends Component {
  render() {
    const { user, logOutUser } = this.props;
    const NavLink = props => (
      <Link
        {...props}
        getProps={({ isCurrent }) => {
          // the object returned here is passed to the
          // anchor element's props
          return {
            style: {
              color: isCurrent ? "Black" : ""
            }
          };
        }}
      />
    );

    return (
      <nav className="site-nav navbar navbar-expand-sm bg-white navbar-light higher">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button"
            data-toggle="collapse" data-target="#myTogglerNav"
            aria-controls="myTogglerNav"
            aria-expanded="false" aria-label="Toggle Navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="myTogglerNav">
            <div className="navbar-nav">
              <NavLink to="/" className="navbar-item nav-link">
              <FaHome/></NavLink>
              <NavLink to="/search" className="navbar-item nav-link">
                Database Search
              </NavLink>
              <NavLink to="/partners" className="navbar-item nav-link">
                Partners
              </NavLink>
              <NavLink to="/about" className="navbar-item nav-link">
                About
              </NavLink>
            </div>
            <div className="navbar-nav ml-sm-auto">
              {user && (
                <div className="dropdown">
                  <button className="btn btn-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.props.user}
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <NavLink to="/profile" className="navbar-item nav-link dropdown-item">
                      Personal Information
                    </NavLink>
                    <NavLink to="/about" className="navbar-item nav-link dropdown-item" onClick={e => logOutUser(e)}>
                      log out
                    </NavLink>
                    {/* <a className="dropdown-item" href="/profile">Personal Information</a>
                    <a className="dropdown-item"href="/login" 
                      onClick={e => logOutUser(e)}>log out</a> */}
                  </div>
                </div>
                // <Link className="nav-item nav-link" to="/profile">
                //   {this.props.user}
                // </Link>
              )}
              {!user && (
                <NavLink className="nav-item nav-link" to="/login">
                  log in
                </NavLink>
              )}
              {!user && (
                <NavLink className="nav-item nav-link" to="/register">
                  register
                </NavLink>
              )}
              {/* {user && (
                <Link
                  className="nav-item nav-link"
                  to="/login"
                  onClick={e => logOutUser(e)}
                >
                  log out
                </Link>
              )}      */}
            </div>
          </div>
        </div>
    </nav>
  )};
}

export default Navigation;
