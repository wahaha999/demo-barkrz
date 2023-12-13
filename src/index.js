import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store, persistor } from '@app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker';

// bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

// app styles
import "@app/assets/css/fontawesome.min.css";
import "@app/assets/scss/barkrz.scss";
import "@app/assets/demo/demo.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
