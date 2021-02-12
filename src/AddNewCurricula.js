import React, { Component } from 'react';
import { states } from './us_states.js';
import CurriculaSuccess from './CurriculaSuccess';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

// import FormError from './FormError';
// import FormSuccess from './FormSuccess';
// import Axios from "axios";

class AddNewCurricula extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userName,
            email: this.props.email,
            enableOrg: false,
            check_limit: 0,
            org: null,
            c_ids: {},
            curricula_title: null,
            selected_location: null,
            selected_location_value: null,
            desc: null,
            categories: [
                { id: 1, value: "Food Systems", dbValue: "Food_Systems", isChecked: false, isDisplay: false, sub_categories: [] },
                { id: 2, value: "Equity", dbValue: "Equity", isChecked: false, isDisplay: false, sub_categories: [] },
                { id: 3, value: "Community Capacity", dbValue: "Community_Capacity", isChecked: false, isDisplay: false, sub_categories: [] },
                { id: 4, value: "Economy and Business Analysis", dbValue: "Economy_and_Business_Analysis", isChecked: false, isDisplay: false, sub_categories: [] },
                { id: 5, value: "Governance and Policy", dbValue: "Governance_and_Policy", isChecked: false, isDisplay: false, sub_categories: [] },
                { id: 6, value: "Health and Wellness", dbValue: "Health_and_Wellness", isChecked: false, isDisplay: false, sub_categories: [] },
                { id: 7, value: "Environment", dbValue: "Environment", isChecked: false, isDisplay: false, sub_categories: [] },
                { id: 8, value: "Leadership", dbValue: "Leadership", isChecked: false, isDisplay: false, sub_categories: [] },
                { id: 9, value: "Evaluation", dbValue: "Evaluation", isChecked: false, isDisplay: false, sub_categories: [] }
            ],
            m_o_d: [
                { id: 1, value: "Online Course", dbValue: "online", isChecked: false },
                { id: 2, value: "In-person", dbValue: "in_person", isChecked: false },
                { id: 3, value: "Site visit", dbValue: "site_visits", isChecked: false },
                { id: 4, value: "Self-paced", dbValue: "self_paced", isChecked: false },
                { id: 5, value: "Cohort Dicussions", dbValue: "cohort_discussions", isChecked: false }
            ],
            audience: [
                { id: 1, value: "Farmers", dbValue: "Farmers", isChecked: false },
                { id: 2, value: "Food Businesses", dbValue: "Food_Businesses", isChecked: false },
                { id: 3, value: "College Students", dbValue: "College_Students", isChecked: false },
                { id: 4, value: "Extension Staff", dbValue: "Extension_Staff", isChecked: false },
                { id: 5, value: "Agriculture Professionals", dbValue: "Agriculture_Professionals", isChecked: false },
                { id: 6, value: "Non-profit Staff", dbValue: "Non_profit_Staff", isChecked: false },
                { id: 7, value: "Community Advocates", dbValue: "Community_Advocates", isChecked: false },
                { id: 8, value: "Community Planners and Developers", dbValue: "Community_Planners_and_Developers", isChecked: false },
                { id: 9, value: "Early Childhood Educators", dbValue: "Early_Childhood_Educators", isChecked: false },
                { id: 10, value: "Policy Makers", dbValue: "Policy_Makers", isChecked: false },
                { id: 11, value: "Food Service Directors", dbValue: "Food_Service_Directors", isChecked: false }
            ],
            fee: [
                { id: 1, value: "Free", dbValue: "Free", isChecked: false },
                { id: 2, value: "Fee", dbValue: "Fee", isChecked: false },
                { id: 3, value: "Tuition", dbValue: "Tuition", isChecked: false }
            ],
            comp_ack: [
                { id: 1, value: "Completion Certificate", dbValue: "Completion_Certificate", isChecked: false },
                { id: 2, value: "Course Credit", dbValue: "Course_Credit", isChecked: false },
                { id: 3, value: "Transferable Materials", dbValue: "Transferable_Materials", isChecked: false },
                { id: 4, value: "Train the Trainer", dbValue: "Train_the_Trainer", isChecked: false }
            ],
            location: [
                { id: 1, value: "City", dbValue: "City", isChecked: false },
                { id: 2, value: "County", dbValue: "County", isChecked: false },
                { id: 3, value: "State", dbValue: "State", isChecked: false },
                { id: 4, value: "Region", dbValue: "Region", isChecked: false },
                { id: 4, value: "National", dbValue: "National", isChecked: false }
            ]
        }
        this.enableOrgText = this.enableOrgText.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChecks = this.handleChecks.bind(this);
        this.handleChecksSubCat = this.handleChecksSubCat.bind(this);
        this.handleChecksSSCat = this.handleChecksSSCat.bind(this);
        this.handleCheckLevel = this.handleCheckLevel.bind(this);
        this.getCatDetails = this.getCatDetails.bind(this);
        this.addCurricula = this.addCurricula.bind(this);
        this.populateSubCategory = this.populateSubCategory.bind(this);

    }

    enableOrgText(e) {
        e.preventDefault();
        if (e.target.value === "Other") {
            this.setState({ enableOrg: !this.state.enableOrg });
        }
    }

    handleChange(e) {
        e.preventDefault();
        var itemName = e.target.name;
        var itemValue = e.target.value;
        console.log(itemName, itemValue);
        this.setState({
            [itemName]: itemValue
        })
    }

    populateSubCategory(category) {
        var sub_categories = [];
        (this.props.categories).filter(item =>
            item.category === category).map(filteredItem => sub_categories.push(filteredItem.sub_category));
        sub_categories = Array.from(new Set(sub_categories));
        return sub_categories;
    }

    handleChecks(event, checkedCat) {
        let categories = this.state.categories;
        categories.forEach(item => {
            if (item.id === checkedCat.id) {
                item.isChecked = event.target.checked
                var sub_categories = this.populateSubCategory(item.value);
                if (item.isChecked) {
                    item.sub_categories = sub_categories;
                    this.setState({ check_limit: this.state.check_limit + 1 });
                } else {
                    this.setState({ check_limit: this.state.check_limit - 1 });
                    var sub_categories_dict = this.props.sub_categories;
                    var ss_categories_dict = this.props.ss_categories;
                    var ss_categories = {};
                    var selected_cat = item.value;
                    var selected_sub_cat, selected_ss_cat = "";
                    sub_categories.forEach(sub_key => {
                        if (sub_categories_dict[sub_key].isChecked) {
                            selected_sub_cat = sub_key;
                            sub_categories_dict[sub_key].isChecked = false;

                            ss_categories = this.populateSSubCategory(item.value, selected_sub_cat);
                            ss_categories.forEach(ss_key => {
                                if (ss_categories_dict[ss_key].isChecked) {
                                    selected_ss_cat = ss_key;
                                    ss_categories_dict[ss_key].isChecked = false;

                                    Object.keys(ss_categories_dict[ss_key].level).forEach(key => {
                                        if (ss_categories_dict[ss_key].level[key].isChecked) {
                                            ss_categories_dict[ss_key].level[key].isChecked = false;
                                            this.getCatDetails(event, selected_cat, selected_sub_cat, selected_ss_cat, key);
                                        }
                                    });
                                }
                            });
                        }
                    });
                    this.setState({ sub_categories: sub_categories_dict, ss_categories: ss_categories_dict });
                }
            }
        });
        if (event.target.checked) {
            if (this.state.check_limit >= 2) {
                categories.forEach(item => {
                    if (!item.isChecked) {
                        item.disabled = true;
                    }
                })
            } else {
                this.setState({ check_limit: this.state.check_limit + 1 });
            }
        } else {
            if (this.state.check_limit >= 2) {
                categories.forEach(item => {
                    if (item.disabled) {
                        item.disabled = false;
                    }
                })
            }
            this.setState({ check_limit: this.state.check_limit - 1 })
        }
        this.setState({ categories: categories })
    }

    populateSSubCategory(category, checked_subcategory) {
        var ss_categories = [];
        (this.props.categories).filter(item =>
            item.category === category && item.sub_category === checked_subcategory).map(filteredItem => ss_categories.push(filteredItem.ss_category));
        ss_categories = Array.from(new Set(ss_categories));
        return ss_categories;
    }

    handleChecksSubCat(event, category, checkedSubCat) {
        let sub_categories = this.props.sub_categories;
        sub_categories[checkedSubCat].isChecked = event.target.checked;
        var ss_categories = this.populateSSubCategory(category, checkedSubCat);
        if (event.target.checked) {
            sub_categories[checkedSubCat].ss_categories = ss_categories;
        } else {
            var ss_categories_dict = this.props.ss_categories;
            var selected_sub_cat = checkedSubCat;
            var selected_ss_cat = "";
            ss_categories.forEach(ss_key => {
                if (ss_categories_dict[ss_key].isChecked) {
                    selected_ss_cat = ss_key;
                    ss_categories_dict[ss_key].isChecked = false

                    Object.keys(ss_categories_dict[ss_key].level).forEach(key => {
                        if (ss_categories_dict[ss_key].level[key].isChecked) {
                            ss_categories_dict[ss_key].level[key].isChecked = false;
                            this.getCatDetails(event, category, selected_sub_cat, selected_ss_cat, key);
                        }
                    });
                }
            });
            this.setState({ ss_categories: ss_categories_dict });
        }
        this.setState({ sub_categories: sub_categories })
    }

    handleChecksSSCat(e, category, sub_category, checkedSSCat) {
        let ss_categories = this.props.ss_categories;
        ss_categories[checkedSSCat].isChecked = e.target.checked;
        if (!e.target.checked) {
            Object.keys(ss_categories[checkedSSCat].level).forEach(key => {
                if (ss_categories[checkedSSCat].level[key].isChecked) {
                    ss_categories[checkedSSCat].level[key].isChecked = false;
                    this.getCatDetails(e, category, sub_category, checkedSSCat, key);
                }
            });
        }
        this.setState({ ss_categories: ss_categories });
    }

    handleCheckLevel(e, ss_category, checkedLevel) {
        let ss_categories = this.props.ss_categories;
        ss_categories[ss_category].level[checkedLevel].isChecked = e.target.checked;
        this.setState({ ss_categories: ss_category });
    }

    getCatDetails(e, category, sub_category, ss_category, level) {
        let c_ids = this.state.c_ids;
        let checked_cat = this.props.categories.filter(item =>
            item.category === category && item.sub_category === sub_category
            && item.ss_category === ss_category && item.level === level);
        if (e.target.checked) {
            c_ids[checked_cat[0].category_id] = checked_cat[0].category;
        } else {
            delete c_ids[checked_cat[0].category_id];
        }
        this.setState({ c_ids: c_ids });
        console.log(this.state.c_ids);
    }

    addCurricula() {
        let c_ids = this.state.c_ids;
        var mod_fields = [];
        mod_fields = this.state.m_o_d.filter(item => item.isChecked === true).map(filteredItem => mod_fields.push(filteredItem.value));
        var audience_fields = [];
        audience_fields = this.state.audience.filter(item => item.isChecked === true).map(filteredItem => audience_fields.push(filteredItem.value));
        var fee_fields = [];
        fee_fields = this.state.fee.filter(item => item.isChecked === true).map(filteredItem => fee_fields.push(filteredItem.value));
        var compAck_fields = [];
        compAck_fields = this.state.comp_ack.filter(item => item.isChecked === true).map(filteredItem => compAck_fields.push(filteredItem.value));
        c_ids["m_o_d"] = mod_fields;
        c_ids["audience"] = audience_fields;
        c_ids["fee"] = fee_fields;
        c_ids["compAck_fields"] = compAck_fields;
        c_ids["selected_location"] = this.state.selected_location;
        c_ids["selected_location_value"] = this.state.selected_location_value;
        c_ids["curricula_title"] = this.state.curricula_title;
        c_ids["org_name"] = this.state.org;
        c_ids["desc"] = this.state.desc;
        this.setState({ c_ids: c_ids });
        console.log(this.state.c_ids);
    }

    handleCheckOnMOD(e) {
        let m_o_d = this.state.m_o_d;
        m_o_d.forEach(item => {
            if (item.value === e.target.value) {
                item.isChecked = e.target.checked;
            }
            return;
        })
        this.setState({ m_o_d: m_o_d });
    }

    handleCheckOnAudience(e) {
        let audience = this.state.audience;
        audience.forEach(item => {
            if (item.value === e.target.value) {
                item.isChecked = e.target.checked;
            }
            return;
        })
        this.setState({ audience: audience });

    }

    handleCheckOnCompACK(e) {
        let comp_ack = this.state.m_o_d;
        comp_ack.forEach(item => {
            if (item.value === e.target.value) {
                item.isChecked = e.target.checked;
            }
            return;
        })
        this.setState({ comp_ack: comp_ack });
    }

    handleCheckOnFee(e) {
        let fee = this.state.fee;
        fee.forEach(item => {
            if (item.value === e.target.value) {
                item.isChecked = e.target.checked;
            }
            return;
        })
        this.setState({ fee: fee });
    }

    render() {
        return (
            <div className="mb-5 pb-5">
                {/* {this.state.userName && ( */}
                <div className="container mt-4 bg-light border border-info" style={{ borderWidth: "thick" }}>
                    <form className="p-4">
                        <div className="form-row">
                            <div className="col-12 text-center">
                                <h3 className="mb-0">Fill Curricula Details</h3>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="form-group">
                            <label hmtlfor="input-curricula-title">Curricula Title</label>
                            <input
                                type="text"
                                id="input-curricula-title"
                                className="form-control form-control-alternative"
                                maxLength={150}
                                name = "curricula_title"
                                onChange={(e)=>this.handleChange(e)}
                            />
                        </div>

                        <div className="form-group">
                            <label hmtlfor="input-org">Organization Name</label>
                            <select id="inputState" className="form-control" name="org" onChange={(e) => { this.enableOrgText(e); this.handleChange(e) }}>
                                <option defaultValue="">Please select..</option>
                                {this.props.organizations && this.props.organizations.map((item, index) => {
                                    return (<option key={index}>{item.org_name}</option>);
                                })}
                                <option key={"other"}>Other</option>
                            </select>
                        </div>
                        {this.state.enableOrg && <div className="form-group">
                            <input
                                type="text"
                                id="input-org"
                                className="form-control form-control-alternative"
                                placeholder="Type your Organization name"
                                name="org"
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>}
                        <label className="mr-1">Select Category </label>
                            <FaInfoCircle data-tip="anju" data-place="right" data-background-color="#fff"
                            data-text-color="black" data-arrow-color="#fff"></FaInfoCircle><ReactTooltip />
                        
                        <br />
                        <div className="form-group mx-4">
                            {this.state.categories.map((category, index) => {
                                return (<div key={index}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={category.value}
                                            onChange={(e) => this.handleChecks(e, category)} disabled={category.disabled} />
                                        <label className="form-check-label" htmlFor="inlineCheckbox1">{category.value}</label>
                                    </div>
                                    {category.isChecked && <div className="mx-4">
                                        {category.sub_categories.map((sub_category, index) => {
                                            return (<div key={index}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={sub_category}
                                                        onChange={(e) => this.handleChecksSubCat(e, category.value, sub_category)} disabled={category.disabled} />
                                                    <label className="form-check-label" htmlFor="inlineCheckbox1">{sub_category}</label>
                                                </div>
                                                {this.props.sub_categories[sub_category].isChecked && <div className="mx-4">
                                                    {this.props.sub_categories[sub_category].ss_categories.map((ss_category, index) => {
                                                        return (<div key={index}>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value={ss_category}
                                                                    onChange={(e) => this.handleChecksSSCat(e, category.value, sub_category, ss_category)} disabled={category.disabled} />
                                                                <label className="form-check-label" htmlFor="inlineCheckbox2">{ss_category}</label>
                                                            </div>
                                                            {this.props.ss_categories[ss_category].isChecked && <div className="mx-4">
                                                                {Object.keys(this.props.ss_categories[ss_category].level).map((level, index) => {
                                                                    return (<div className="form-check" key={index}>
                                                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value={level}
                                                                            onChange={(e) => { this.handleCheckLevel(e, ss_category, level); this.getCatDetails(e, category.value, sub_category, ss_category, level) }}
                                                                            disabled={category.disabled} />
                                                                        <label className="form-check-label" htmlFor="inlineCheckbox3">{level}</label>
                                                                    </div>
                                                                    )
                                                                })}
                                                            </div>}
                                                        </div>
                                                        )
                                                    })}
                                                </div>}
                                            </div>
                                            )
                                        })}
                                    </div>}

                                </div>
                                )
                            })}
                        </div>
                        <label>Method Of Delivery</label>
                        <br />
                        <div className="form-group mx-4">
                            {this.state.m_o_d.map((method, index) => {
                                return (<div key={index}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id={index} value={method.value}
                                        onChange={this.handleCheckOnMOD} />
                                        <label className="form-check-label" htmlFor={index}>{method.value}</label>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                        <label>Audience</label>
                        <br />
                        <div className="form-group mx-4">
                            {this.state.audience.map((aud, index) => {
                                return (<div key={index}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id={index} value={aud.value}
                                        onChange={this.handleCheckOnAudience} />
                                        <label className="form-check-label" htmlFor={index}>{aud.value}</label>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                        <label>Location</label>
                        <br />
                        <div className="form-group mx-4">
                            <div className="form-row">
                                <select id="location" name="selected_location" className="form-control" onChange={(e) =>this.handleChange(e)} >
                                    <option value="">Choose...</option>
                                    {this.state.location.map((item, index) => {
                                        return (<option key={index}>{item.value}</option>);
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form=group mx-4">
                            <div className="form-row">
                                {(['City','County','Region'].indexOf(this.state.selected_location) > -1) && <input
                                    type="text"
                                    id="input-hrs"
                                    className="form-control form-control-alternative"
                                    placeholder={"Enter " + this.state.selected_location}
                                    name="selected_location_value"
                                    onChange={(e) => this.handleChange(e)}
                                />}
                                {(this.state.selected_location === 'State') &&
                                    <select id="location" name="selected_location_value" className="form-control" onChange={(e) => this.handleChange(e)} >
                                        <option value="">Choose...</option>
                                        {Object.keys(states).map((key, index) => {
                                            return (<option key={index}>{states[key]}</option>);
                                        })}
                                    </select>
                                }
                            </div>
                        </div>
                        <label>Fee</label>
                        <br />
                        <div className="form-group mx-4">
                            {this.state.fee.map((fee, index) => {
                                return (<div key={index}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id={index} value={fee.value}
                                        onChange={this.handleCheckOnFee} />
                                        <label className="form-check-label" htmlFor={index}>{fee.value}</label>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                        <label>Completion Acknowledgement</label>
                        <br />
                        <div className="form-group mx-4">
                            {this.state.comp_ack.map((ack, index) => {
                                return (<div key={index}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id={index} value={ack.value}
                                        onChange={this.handleCheckOnCompACK} />
                                        <label className="form-check-label" htmlFor={index}>{ack.value}</label>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                        <label>Description About the Curricula</label>
                        <br />
                        <div className="form-group mx-4">
                            <textarea type="text" rows="5" id="input-hrs" maxLength={255} className="form-control form-control-alternative" name="desc"
                            onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                        <div className="form-row justify-content-center">
                            <div className="col-3">
                                <button className="btn btn-block btn-primary" data-toggle="modal" data-target="#CurriculaAdded"
                                    onClick={(e) => { this.handleChange(e); this.addCurricula(); }} >
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <CurriculaSuccess></CurriculaSuccess>

            </div>
        )
    }
}

export default AddNewCurricula;