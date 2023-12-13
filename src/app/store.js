import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { createLogger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {routerMiddleware} from 'react-router-redux';
import { createBrowserHistory } from "history";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, reducers)

export const history = createBrowserHistory;

const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(myRouterMiddleware,thunk);
    } else {
        //Enable additional logging in non-production environments
        return applyMiddleware(myRouterMiddleware,thunk , createLogger());
    }
}

export const store = createStore(persistedReducer,composeWithDevTools(getMiddleware()));
export const persistor = persistStore(store);