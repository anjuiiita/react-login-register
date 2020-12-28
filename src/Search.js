import React, { Component } from 'react';
import { Link } from '@reach/router';

class Search extends Component {
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
            <label for="inputState">Category</label>
              <select id="inputState" className="form-control">
                <option selected>Select...</option>
                <option>...</option>
              </select>
          </div>
          <div className="form-group col-md-6">
            <label for="inputState">Sub Category</label>
              <select id="inputState" className="form-control">
                <option selected>Select...</option>
                <option>...</option>
              </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label for="inputState">SubCategory</label>
              <select id="inputState" className="form-control">
                <option selected>Select...</option>
                <option>...</option>
              </select>
          </div>
          <div className="form-group col-md-4">
            <label for="inputState">Sub Category</label>
              <select id="inputState" className="form-control">
                <option selected>Select...</option>
                <option>...</option>
              </select>
          </div>
          <div className="form-group col-md-4">
            <label for="inputState">Sub Category</label>
              <select id="inputState" className="form-control">
                <option selected>Select...</option>
                <option>...</option>
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
