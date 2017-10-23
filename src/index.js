import React from 'react';
import ReactDOM from 'react-dom';
import App from './react/app';
import './style.css';

// GLOBAL VARS
window.GLOBAL_COUNTER = 0;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
