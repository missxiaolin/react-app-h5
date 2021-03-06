import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.scss';
import * as serviceWorker from './serviceWorker';
import store from './store/index'
import { Provider } from 'react-redux'
import AppRouter from './router/index'
import 'lib-flexible'
import 'antd-mobile/dist/antd-mobile.css'

console.log(process.env.APP_HOST)

ReactDOM.render(<Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.    
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
