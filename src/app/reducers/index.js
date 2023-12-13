import {combineReducers} from 'redux';
import auth from './authReducer';
import registerPetInfo from './registerPetReducer';
import petsInformation from './petReducer';

const appReducer = combineReducers({
    auth,
    registerPetInfo,
    petsInformation,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        window.localStorage.removeItem('persist:root');
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;