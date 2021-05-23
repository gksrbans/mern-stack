import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import loadUser from './component/auth/loadUser';

loadUser();

ReactDOM.render(
  <App />,
  document.getElementById('root')
); 