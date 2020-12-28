import React, { Component } from 'react';

class FormSuccess extends Component {
  render() {
    const { theMessage } = this.props;

    return (
      <div className="col-12 alert alert-success px-3" align="center">
        {theMessage}
      </div>
    );
  }
}

export default FormSuccess;
