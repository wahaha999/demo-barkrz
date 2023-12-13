import { 
    LOGIN_START, 
    LOGIN_ERROR, 
    LOGIN_SUCCESS,
    REGISTER_START, 
    REGISTER_ERROR, 
    REGISTER_SUCCESS,
    FORGET_PASSWORD_START,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_ERROR,
    RESET_PASSWORD_START,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    AUTH_END,
    PET_FETCH_ALL } from "./actionTypes";
import {get ,post}  from '../constants';

export const Login_Start = () =>  {
    return {
        type: LOGIN_START
    }
};

export const Login_Error = () => {
    return {
        type: LOGIN_ERROR,
    }
};

export const Login_Success = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
};


export const Register_Start = () => {
    return {
        type: REGISTER_START,
    }
};

export const Register_Error = () => {
    return {
        type: REGISTER_ERROR
    }
};

export const Register_Success = () => {
    return {
        type: REGISTER_SUCCESS,
    }
};

export const ForgetPassword_Start = () => { 
    return {
        type: FORGET_PASSWORD_START
    }
}

export const ForgetPassword_Success = (payload) => {
    return {
        type: FORGET_PASSWORD_SUCCESS,
        payload: payload
    }
}

export const ForgetPassword_Error = (payload) => {
    return {
        type: FORGET_PASSWORD_ERROR,
        payload: payload
    }
}

export const ResetPassword_Start = () => { 
    return {
        type: RESET_PASSWORD_START
    }
}

export const ResetPassword_Success = (payload) => {
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload: payload
    }
}

export const ResetPassword_Error = (payload) => {
    return {
        type: RESET_PASSWORD_ERROR,
        payload: payload
    }
}

export const Auth_End = () => {
    return {
        type: AUTH_END
    }
}

export const handShake = () => async(dispatch , getState) => {
    let token = getState().auth.userdata.token;
    if (token) {
        const header = {headers:{Authorization: `Bearer ${token}`}};
        const response = await get('handShake',header);
        if (response.data.expired === true) {
            dispatch({type: "LOGOUT"});
        }
    }
};


export const Login = (data,callback) => async (dispatch , getState)=> {
    dispatch(Login_Start());
    try {
        const response = await post('login'  , data);
        const response_data = response.data;
        // let token = getState().auth.userdata.token;

        if (response_data.success === true) {
            let token = response_data.token;
            const header = {headers:{Authorization: `Bearer ${token}`}};
            const Pets = await get('pet',header);
            const pets_data = Pets.data;
            
            await dispatch({type:PET_FETCH_ALL , payload: pets_data});
            await dispatch(Login_Success(response_data));
            await callback(false, "", response_data);
        } else {
            await dispatch(Login_Error());
            callback(true,response_data.message);
        }
    } catch(err) {
        await dispatch(Login_Error());
        callback(true,err.message);
    }
};

export const Register = (data , callback) => async (dispatch , getState) => {
    dispatch(Register_Start());
    try {
        const response = await post('register'  , data)
        const response_data = response.data;
        if (response_data.success===true) {
            dispatch(Register_Success());
            callback(true,response_data.message);
        } else {
            dispatch(Register_Error());
            callback(false,response_data.message);
        }
    } catch(err) {
        dispatch(Register_Error());
        callback(false,err.message);
    }
};

export const ForgetPassword = (data) => async (dispatch , getState) => {
    dispatch(ForgetPassword_Start());
    try {
        const response = await post('forget-password', data);
        if (response.data.success) {
            dispatch(ForgetPassword_Success(response.data));
        }else {
            dispatch(ForgetPassword_Error(response.data));
        }
    } catch (err) {
        dispatch(ForgetPassword_Error(err));
    }
}

export const ResetPassword = (data) => async (dispatch , getState) => {
    dispatch(ResetPassword_Start());
    try {
        const response = await post('reset-password', data);

        if (response.data.success) {
            dispatch(ForgetPassword_Success(response.data));
        }else {
            dispatch(ForgetPassword_Error(response.data));
        }
    } catch (err) {
        dispatch(ForgetPassword_Error(err));
    }
}

export const SaveCard = (data, callback) => async (dispatch, getState) => {
    try {
        let token = getState().auth.userdata.token;
        const header = {headers:{Authorization: `Bearer ${token}`}};
        const Pets = await get('pet',header);
        const pets_data = Pets.data;
        dispatch(Login_Success(data));
        dispatch({type:PET_FETCH_ALL , payload: pets_data});
        callback(true)
    } catch(err) {
        console.log("Unexpected error occured to get petlist while saving card",err.message);
        callback(false,err.message);
    }
}
