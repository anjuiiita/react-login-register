import React, { Component } from 'react';
import Axios from 'axios';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
        categories: [],
        sub_category: [],
        sub_sub_category: [],
        level:[],
        selected_category: null,
        selected_sub_category: null

    }
    this.getCategories = this.getCategories.bind(this)
    this.selectSubCategories = this.selectSubCategories.bind(this);
    this.selectSubSubCategories = this.selectSubSubCategories.bind(this);
    //this.selectLevel = this.selectLevel.bind(this);
  }

  getCategories() {
    Axios.get("http://localhost:3001/getCategories").then((response) => {
        if (response) {
          if(response.data.result.length > 0) {
            this.setState({categories: response.data.result});
          }
        }
    });
    console.log(this.state.categories);
  }

  componentDidMount() {
    this.getCategories();
  }

  // insertCategory(e, category) {
  //   e.preventDefault();
  //   Axios.post("http://localhost:3001/insertCategory", {
  //     category: category,
  //   }).then(response) => {

  //   }
  // }

  selectSubCategories(e) {
    e.preventDefault();
    var sub_categories = [];
    (this.state.categories).filter( item => 
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
    (this.state.categories).filter(item =>
      item.category === this.state.selected_category && item.sub_category === e.target.value).map(
        filteredItem => sub_sub_category.push(filteredItem.ss_category));
    sub_sub_category = Array.from(new Set(sub_sub_category))
    this.setState({
      selected_sub_category: e.target.value,
      sub_sub_category: sub_sub_category
    });
  }

  // selectLevel(e) {
  //   e.preventDefault();
  //   var level = [];
  //   (this.state.categories).filter(item =>
  //     item.category === this.state.selected_category && item.sub_category === this.state.selected_sub_category && item.ss_category === e.target.value)
  //     .map(filteredItem => level.push(filteredItem.level));
  //   level = Array.from(new Set(level));
  //   this.setState({
  //     level: level
  //   });
  // }

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
              <select id="inputState" className="form-control" defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>Please select...</option>
                {this.state.sub_sub_category.map((item, index) => {
                  return(<option key={index}>{item}</option>);
                })}
              </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputState">Level</label>
              <select id="inputState" className="form-control" defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>Please select...</option>
                <option>L1</option>
                <option>L2</option>
                <option>L3</option>
              </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Advanced Search</button>
        <button type="submit" className="btn btn-primary float-right">Search</button>
      </div>
    </div>
    );
  }
}

export default Search;
