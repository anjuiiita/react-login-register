import React, { Component } from 'react';
import Axios from 'axios';
import { FaPlus } from 'react-icons/fa';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
        sub_category: [],
        sub_sub_category: [],
        level:[],
        selected_category: null,
        selected_sub_category: null,
        selected_ss_category: null,
        selected_level: null,
        curricula: [],
        filteredCurricula: [],
        select_delivery_Method: null,
        selected_audience: null,
        selected_location: null,
        selected_completion_Hours: null,
        selected_fee: null,
        selected_completion_Ack: null,
        m_o_d: [],
        audience: [],
        location: [],
        comp_hr: [],
        fee: [],
        comp_ack: []

    }
    this.handleChange = this.handleChange.bind(this);
    this.advancedSearchDisplay = this.advancedSearchDisplay.bind(this);
    this.getCategories = this.getCategories.bind(this)
    this.selectSubCategories = this.selectSubCategories.bind(this);
    this.selectSubSubCategories = this.selectSubSubCategories.bind(this);
    this.selectLevel = this.selectLevel.bind(this);
    this.getCurricalDetails = this.getCurricalDetails.bind(this);
    this.getFilterdResult = this.getFilterdResult.bind(this);
  }

  handleChange(e){
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({
      [itemName]: itemValue
    })
  }

  advancedSearchDisplay(e) {
    if (this.state.curricula.length <= 0) {
      this.getCurricalDetails(e);
    }
    console.log("enter again", this.state.curricula);
  }

  selectSubCategories(e) {
    e.preventDefault();
    var sub_categories = [];
    (this.props.categories).filter( item => 
      item.category === e.target.value).map(filteredItem => sub_categories.push(filteredItem.sub_category));
    sub_categories = Array.from(new Set(sub_categories));
    this.setState({
        selected_category: e.target.value,
        sub_category: sub_categories
    });
  }

  selectSubSubCategories(e) {
    e.preventDefault();
    var sub_sub_category = [];
    (this.props.categories).filter(item =>
      item.category === this.state.selected_category && item.sub_category === e.target.value).map(
        filteredItem => sub_sub_category.push(filteredItem.ss_category));
    sub_sub_category = Array.from(new Set(sub_sub_category))
    this.setState({
      selected_sub_category: e.target.value,
      sub_sub_category: sub_sub_category
    });
  }

  selectLevel(e) {
    e.preventDefault();
    var level = [];
    (this.props.categories).filter(item =>
      item.category === this.state.selected_category && item.sub_category === this.state.selected_sub_category && item.ss_category === e.target.value)
      .map(filteredItem => level.push(filteredItem.level));
    level = Array.from(new Set(level));
    this.setState({
      level: level,
      select_ss_category: e.target.value
    });
  }

  getCurricalDetails(e) {
    e.preventDefault();
    Axios.post("http://localhost:3001/getCardDetails", {
      category: this.state.selected_category,
      sub_category: this.state.selected_sub_category,
      ss_category: this.state.selected_ss_category,
      level: this.state.selected_level
      }).then((response) => {
        this.setState({curricula: response.data});
        if (this.props.formDisplay) {
          var m_o_d = [];
          var audience = [];
          var location = [];
          var comp_hr = [];
          var fee = [];
          var comp_ack = [];
          for (var key in (response.data)) {
            var value = (response.data)[key];
            if (key === "method_of_delivery") {
              m_o_d.push(value);
            }
            if (key === "audience") {
              audience.push(value);
            }
            if (key === "location") {
              location.push(value);
            }
            if (key === "completion_hours") {
              comp_hr.push(value);
            }
            if (key === "fee") {
              fee.push(value);
            }
            if (key === "completion") {
              comp_ack.push(value);
            }
          }
          m_o_d = Array.from(new Set(m_o_d));
          audience = Array.from(new Set(audience));
          location = Array.from(new Set(location));
          comp_hr = Array.from(new Set(comp_hr));
          fee = Array.from(new Set(fee));
          comp_ack = Array.from(new Set(comp_ack));
          this.setState({
            m_o_d: m_o_d,
            audience: audience,
            location: location,
            comp_hr: comp_hr,
            fee: fee,
            comp_ack: comp_ack
          });
        }
      }, (error) => {
        this.setState({curricula: []})
      }); 
  }

  getFilterdResult() {
    console.log("filterd");
    var filteredCurricula_list = [];
    console.log(this.state.select_delivery_Method);
    console.log(this.state.selected_audience);
    console.log(this.state.selected_completion_Ack);
    console.log(this.state.selected_completion_Hours);
    console.log(this.state.selected_fee);
    console.log(this.state.selected_location);
    console.log(this.state.curricula);
    (this.state.curricula).filter(item =>
      (this.state.select_delivery_Method === null || item.method_of_delivery === this.state.select_delivery_Method)
      && (this.state.selected_completion_Hours === null || item.completion_hours === this.state.selected_completion_Hours)
      && (this.state.selected_fee === null || item.fee === this.state.selected_fee)
      && (this.state.selected_location === null || item.location === this.state.selected_location)
      && (this.state.selected_audience === null || item.audience === this.state.selected_audience)
      && (this.state.selected_completion_Ack === null || item.completion === this.state.selected_completion_Ack)).map(
        filteredItem => filteredCurricula_list.push(filteredItem)
      )
      this.setState({filteredCurricula: filteredCurricula_list});
      console.log(this.state.filteredCurricula);
  }

  render() {

    return (
      <div>
        <div className="row justify-content-center p-3 bg-success">
            <h2 className="text-white">
              Food System Practitioner and Education Resource Database 
            </h2>
        </div>
       <div className="container">
       <div className="row p-3">
            <h1 className="badge badge-warning">
            Food products Search
            </h1>
        </div>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputState">Category</label>
                <select id="inputState" className="form-control" onChange={(e)=>this.selectSubCategories(e)} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Please select....</option>
                    <option value= "Food Systems">Food Systems</option>
                    <option value="Equity">Equity</option>
                    <option value="Community Capacity">Community Capacity</option>
                    <option value="Economy and Business Analysis">Economy and Business Analysis</option>
                    <option value="Governance and Policy">Governance and Policy</option>
                    <option value="Health and Wellness">Health and Wellness</option>
                    <option value="Environment">Environment</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Evaluation">Evaluation</option>
                </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputState">Sub Category</label>
                <select id="inputState" className="form-control" onChange={(e)=>this.selectSubSubCategories(e)} defaultValue={'DEFAULT'}>
                  <option value="DEFAULT" disabled>Please select...</option>
                  {this.state.sub_category.map((item, index) => {
                    return(<option key={index}>{item}</option>);
                  })}
                </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputState">Sub Sub Category</label>
                <select id="inputState" className="form-control" onChange={(e)=>this.selectLevel(e)} defaultValue={'DEFAULT'}>
                  <option value="DEFAULT" disabled>Please select...</option>
                  {this.state.sub_sub_category.map((item, index) => {
                    return(<option key={index}>{item}</option>);
                  })}
                </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputState">Level</label>
                <select id="inputState" className="form-control" name="selected_level" defaultValue={'DEFAULT'} onChange={this.handleChange}>
                  <option value="DEFAULT" disabled>Please select...</option>
                  {this.state.level.map((item, index) => {
                    return(<option key={index}>{item}</option>);
                  })}
                </select>
            </div>
          </div>
          <div className={this.props.formDisplay ? '': 'd-none'}> 
            <div className="form-row">
              <div className="form-group col-md-4">
                <label hmtlfor="delivery_Method">Method of Delivery</label>
                <select id="delivery_Method" name="select_delivery_Method" className="form-control" onChange={this.handleChange}>
                  <option value="">Choose...</option>
                  {this.state.curricula && this.state.m_o_d.map((item, index) => {
                    return(<option key={index}>{item}</option>);
                  })}
                </select>
              </div>
              <div className="form-group col-md-4">
                <label hmtlfor="audience">Audience</label>
                <select id="audience" name="selected_audience" className="form-control" onChange={this.handleChange}>
                  <option value="">Choose...</option>
                  {this.state.curricula && this.state.m_o_d.map((item, index) => {
                    return(<option key={index}>{item}</option>);
                  })}
                </select>
              </div>
              <div className="form-group col-md-4">
                <label hmtlfor="location">Location</label>
                <select id="location" name="selected_location" className="form-control" onChange={this.handleChange}>
                  <option value="">Choose...</option>
                  {this.state.curricula && this.state.audience.map((item, index) => {
                    return(<option key={index}>{item}</option>);
                  })}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label hmtlfor="completion_Hours">Hours to Complete</label>
                <select id="completion_Hours" name="selected_completion_Hours" className="form-control" onChange={this.handleChange}>
                  <option value="">Choose...</option>
                  {this.state.curricula && this.state.comp_hr.map((item, index) => {
                    return(<option key={index}>{item}</option>);
                  })}
                </select>
              </div>
              <div className="form-group col-md-4">
                <label hmtlfor="fee">Fee</label>
                <select id="fee" name="selected_fee" className="form-control" onChange={this.handleChange}>
                  <option value="">Choose...</option>
                  {this.state.curricula && this.state.fee.map((item, index) => {
                    return(<option key={index}>{item}</option>);
                  })}
                </select>
              </div> 
              <div className="form-group col-md-4">
                <label hmtlfor="completion_Ack">Completion Acknowledgement</label>
                <select id="completion_Ack" name="selected_completion_Ack" className="form-control" onChange={this.handleChange}>
                  <option value="">Choose...</option>
                  {this.state.curricula && this.state.comp_ack.map((item, index) => {
                    return(<option key={index}>{item}</option>);
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-8 text-left text-wrap">
              <button type="button" className="btn btn-primary" onClick={(e) => {this.props.toggleAdvForm(); this.advancedSearchDisplay(e)}}>Advanced Search <FaPlus className="mb-0.5 fa-xs"/></button>
            </div>
            <div className="col-4 text-right">
              <button type="submit" className="btn btn-primary" onClick={this.props.formDisplay ? this.getFilterdResult: (e) => this.getCurricalDetails(e)}>Search</button>
            </div>
          </div>
        </form>
        <div>
          {!this.props.formDisplay && this.state.curricula.map((item, index) =>(
          <section className="card mt-3 mb-3" id = {item.curricula_id} key={index}>
            <div className="card-body text-center">
                <h2 className="card-title">{item.curricula_title}</h2>
                <h5 className="card-subtitle mb-2">{item.org_name}</h5>
                <p className="card-text">Description about the curricula </p>
                <a className="card-link"><span>Cost:</span> <span>{item.fee}</span></a>
                <a className="card-link"><span>Delivery Method:</span> <span>{item.method_of_delivery}</span></a>
                <a className="card-link"><span>Duration:</span> <span>{item.completion_hours}</span></a>
                <a className="card-link"><span>Certification:</span> <span>{item.completion}</span></a>
                <a className="card-link"><span>Contact:</span><span>{item.Name} {item.contact}</span></a>
              </div>
          </section>
          ))}
          {this.props.formDisplay && this.state.filteredCurricula.map((item, index) =>(
          <section className="card mt-3 mb-3" id = {item.curricula_id} key={index}>
            <div className="card-body text-center">
                <h2 className="card-title">{item.curricula_title}</h2>
                <h5 className="card-subtitle mb-2">{item.org_name}</h5>
                <p className="card-text">Description about the curricula </p>
                <a className="card-link"><span>Cost:</span> <span>{item.fee}</span></a>
                <a className="card-link"><span>Delivery Method:</span> <span>{item.method_of_delivery}</span></a>
                <a className="card-link"><span>Duration:</span> <span>{item.completion_hours}</span></a>
                <a className="card-link"><span>Certification:</span> <span>{item.completion}</span></a>
                <a className="card-link"><span>Contact:</span><span>{item.Name} {item.contact}</span></a>
              </div>
          </section>
          ))}
          </div>
      </div>
    </div>
    );
  }
}

export default Search;
