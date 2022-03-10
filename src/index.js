import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store from '#/store.js';
import App from './App.jsx';
import '~/reset.scss';

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root')
);