import React, {Component} from "react";
import { Link } from '@reach/router';
import {Form} from 'react-bootstrap'

class Profile extends Component {
    render() {
          const { user } = this.props;
    //     return (
            
    //     <div className="text-center mt-4">
    //         <span className="text-secondary font-weight-bold pl-1">
    //         Welcome {user}
    //         </span>
    //         ,
    //         <Link
    //         to="/login"
    //         className="font-weight-bold text-primary pl-1"
    //         onClick={e => logOutUser(e)}
    //         >
    //         log out
    //         </Link>
    //   </div>

    return (
        <div className="container mt-4 bg-light border border-info" style={{borderWidth:"thick"}}>
            <form className="p-4">
                <div className="form-row">
                    <div className="col-8">
                        <h3 className="mb-0">My account</h3>
                    </div>
                    <div className="col-4 text-right">
                        <a href="#!" className="btn btn-sm btn-primary">Edit profile</a>
                    </div>
                </div>
                <hr className="my-4"/>
                <h6 className="heading-small text-muted mb-4">User information</h6>
                <div className="form-row">
                    <div className="form-group focused col-lg-6">
                        <label for="input-first-name">First name</label>
                        <input type="text" id="input-first-name" className="form-control" placeholder="First name" value={user.first_name} />
                    </div>
                    <div className="form-group focused col-lg-6">
                        <label  for="input-last-name">Last name</label>
                        <input type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Last name" value={user.last_name} disabled/>
                    </div>
                </div>
                <div className="form-group">
                    <label  for="input-email">Email address</label>
                    <input type="email" id="input-email" className="form-control form-control-alternative" placeholder={user.email} disabled/>
                </div>
                <hr className="my-4"/>
                <h6 className="heading-small text-muted mb-4">Contact information</h6>
                <div className="form-group focused">
                    <label for="input-address">Address</label>
                    <input id="input-address" className="form-control form-control-alternative" placeholder="Home Address" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text" disabled/>
                </div>
                <div className="form-row">
                    <div className="form-group focused col-lg-6">
                        <label for="input-city">City</label>
                        <input type="text" id="input-city" className="form-control form-control-alternative" placeholder="City" value="New York" disabled/>
                    </div>
                    <div class="form-group col-lg-6">
                        <label for="inputState">State</label>
                        <select id="inputState" class="form-control" disabled>
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group focused col-lg-6">
                        <label for="input-country">Country</label>
                        <input type="text" id="input-country" className="form-control form-control-alternative" placeholder="Country" value="United States" disabled/>
                    </div>
                    <div className="form-group col-lg-6">
                        <label for="input-country">Postal code</label>
                        <input type="number" id="input-postal-code" className="form-control form-control-alternative" placeholder="Postal code" disabled/>
                    </div>
                </div>
                <hr className="my-4"/>
                <h6 className="heading-small text-muted mb-4">About me</h6>
                <div className="form-group focused">
                    <label>Description</label>
                    <textarea rows="4" className="form-control form-control-alternative" placeholder="A few words about you ..." disabled>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
                </div>
            </form>
        </div>
/* <footer className="footer">
<div className="row align-items-center justify-content-xl-between">
  <div className="col-xl-6 m-auto text-center">
    <div className="copyright">
      <p>Made with <a href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">Argon Dashboard</a> by Creative Tim</p>
    </div>
  </div>
</div>
</footer> */


      
        );
    }
}

export default Profile;