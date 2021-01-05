import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
import App from './App';

import configureStore from './store/index';


// CREATE GOLBAL STATE WITH REDUX STORE
export const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
