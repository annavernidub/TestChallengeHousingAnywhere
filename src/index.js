import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createStore from 'redux/create';

import { MultiStepForm } from './containers';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <MultiStepForm />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#content')
);
