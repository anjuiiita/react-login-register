import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
//import popper from 'popper.js';

import './index.css';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,

  document.getElementById('root')
);
registerServiceWorker();
