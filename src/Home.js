import React, { Component } from 'react';
import { Link } from '@reach/router';

class Home extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <div className="container-fluid text-center bg-image">
        <div className="row justify-content-center align-items-center bg-cover"
         style={{backgroundImage: `url('https://mdbootstrap.com/img/new/slides/041.jpg')`,
         height: "60vh", width: "100%", backgroundPosition:"center", backgroundSize: "cover"}}>
          <div className="col-10 col-md-10 col-lg-8 col-xl-7">
            <h2 className="text-white">
              Food System Practitioner and Education Resource Database 
            </h2>
            
            {user == null && (
              <span>
                <Link
                  to="/register"
                  className="btn btn-outline-primary m-3"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="btn btn-outline-primary m-3"
                >
                  Log In
                </Link>
              </span>
            )}
            {user && (
              <Link to="/search" className="mt-3 btn btn-primary">
                Database Search
              </Link>
            )}
          </div>{' '}
          {/* columns */}
        </div>
        </div>
          <div className="p-5 bg-secondary mt-2">
            <p className="text-white">
            Food System Practitioner and Education Resource Database Food System Practitioner and Education Resource Database Food System Practitioner and Education Resource Database Food System Practitioner and Education Resource Database Food System Practitioner and Education Resource Database
            </p>
          </div>
      </div>
      
    );
  }
}

export default Home;
