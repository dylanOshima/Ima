import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './App.global.css';

import store from './controller/store';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
