import React, {Component} from "react";
import { navigate } from "@reach/router/lib/history";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editContent:false,
            buttonName: "Edit Profile",
            enableOrg: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.enableOrgText = this.enableOrgText.bind(this);
        this.handleCurricula = this.handleCurricula.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        if (!this.state.editContent) {
            this.setState({editContent:true});
        } else {
            this.setState({editContent:false});
        }
    }

    enableOrgText(e) {
        e.preventDefault();
        console.log(e.target.value);
        if(e.target.value === "Other") {
            if (!this.state.enableOrg) {
                this.setState({enableOrg:true});
            } else {
                this.setState({enableOrg:false});
            }
        }   
    }

    handleCurricula() {
        navigate('/addCurricula');
    }

    render() {
        return (
            <div className="container mt-4 bg-light border border-info" style={{borderWidth:"thick"}}>
                <form className="p-4">
                    <div className="form-row">
                        <div className="col-8">
                            <h3 className="mb-0">My account</h3>
                        </div>
                        <div className="col-4 text-right">
                            <button
                                className="btn btn-sm btn-primary"
                                data-toggle="button"
                                onClick={this.handleChange}>
                                {this.state.editContent === true ? "Save Profile": "Edit Profile"}
                            </button>
                        </div>
                    </div>
                    <hr className="my-4"/>
                    <h6 className="heading-small text-muted mb-4">User information</h6>
                    <div className="form-row">
                        <div className="form-group focused col-lg-6">
                            <label hmtlfor="input-first-name">First name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="input-first-name"
                                placeholder="First name"
                                defaultValue={this.props.user.first_name}
                                onChange={(e)=>this.props.user.first_name=e.value}
                                disabled={!this.state.editContent}
                            />
                        </div>
                        <div className="form-group focused col-lg-6">
                            <label  hmtlfor="input-last-name">Last name</label>
                            <input
                                type="text"
                                id="input-last-name"
                                className="form-control form-control-alternative"
                                placeholder="Last name"
                                defaultValue={this.props.user.last_name}
                                onChange={(e)=>this.props.user.last_name = e.value}
                                disabled={!this.state.editContent}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label  hmtlfor="input-email">Email address</label>
                        <input
                            type="email"
                            id="input-email"
                            className="form-control form-control-alternative"
                            defaultValue={this.props.user.email}
                            onChange={(e)=>this.props.user.email = e.value}
                            disabled={!this.state.editContent}
                        />
                    </div>
                    {this.state.editContent && <div className="form-group">
                        <label  hmtlfor="input-org">Organization Name</label>
                        <select id="inputState" className="form-control" onChange={(e) => this.enableOrgText(e)}>
                            <option defaultValue="">Please select..</option>
                            {this.props.organizations && this.props.organizations.map((item, index) => {
                                return(<option key={index}>{item.org_name}</option>);
                            })}
                            <option key={"other"}>Other</option>
                        </select>
                    </div>}
                    {this.state.enableOrg && <div className="form-group">
                        <input
                            type="org"
                            id="input-org"
                            className="form-control form-control-alternative"
                            placeholder="Type your Organization name"
                            onChange={(e)=>this.props.user.email = e.value}
                        />
                    </div>}
                    <div className="form-group text-center">
                        <button className="bg-primary" onClick={this.handleCurricula}>Add New Curricula</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Profile;