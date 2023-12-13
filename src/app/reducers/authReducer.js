import { 
    REMOVE_USER_MEMBERSHIP,
    LOGIN_SUCCESS, 
    LOGIN_ERROR, 
    LOGIN_START, 
    REGISTER_START, 
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_ERROR,
    FORGET_PASSWORD_START,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_START,
    AUTH_END
} from "@app/actions/actionTypes";

const defaultState = {
    userdata:{},
    isLoggedIn:false,
    inProgress:false,
    error: null
};

const auth = (state = defaultState , action) => {

    switch(action.type) {
        case LOGIN_START:
            return {
                ...state , 
                inProgress: true,
            };
        case LOGIN_ERROR:
            return {
                ...state , 
                inProgress: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                inProgress: false,
                isLoggedIn: true,
                userdata: action.payload
            };
   
        case REGISTER_START:
            return {
                ...state,
                inProgress: true,
            };
        case REGISTER_ERROR:
            return {
                ...state,
                inProgress: false,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                inProgress: false,
            };
        case REMOVE_USER_MEMBERSHIP:
            let userdata = state.userdata;
            userdata.membership = '0';
            return {
                ...state,
                userdata: userdata
            }
        case FORGET_PASSWORD_START:
            return {
                ...state,
                error: null,
                inProgress: true
            }
        case FORGET_PASSWORD_SUCCESS:
            return {
                ...state,
                inProgress: false,
                error: action.payload
            }
        case FORGET_PASSWORD_ERROR:
            return {
                ...state,
                inProgress: false,
                error: action.payload
            }
        case RESET_PASSWORD_START:
            return {
                ...state,
                error: null,
                inProgress: true
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                inProgress: false,
                error: action.payload
            }
        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                inProgress: false,
                error: action.payload
            }
        case AUTH_END: 
            return {
                ...state,
                inProgress: false,
                error: null
            }
        default:
            return state;
    }
}

export default auth;