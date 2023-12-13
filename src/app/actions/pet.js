import {
  PET_FETCH_ALL,
  PET_UPDATE_START,
  PET_UPDATE_SUCCESS,
  PET_UPDATE_ERROR,
  PET_MEMBERSHIP,
  PET_DELETE,
  PET_FLOW_INFORMATION,
} from "./actionTypes";
import { get, post } from "../constants";

export const Pet_Update_Start = () => {
  return {
    type: PET_UPDATE_START,
  };
};

export const Pet_Update_Success = (payload) => {
  return {
    type: PET_UPDATE_SUCCESS,
    payload: payload,
  };
};

export const Pet_Update_Error = () => {
  return {
    type: PET_UPDATE_ERROR,
  };
};

export const Pet_Membership = (payload) => {
  return {
    type: PET_MEMBERSHIP,
    payload: payload,
  };
};

export const Pet_Delete = (payload) => {
  return {
    type: PET_DELETE,
    payload: payload,
  };
};

export const PetDelete = (data, callback) => async (dispatch, getState) => {
  try {
    let token = getState().auth.userdata.token;
    const header = { headers: { Authorization: `Bearer ${token}` } };
    const response = await post("pet/delete", data, header);
    const response_data = response.data;
    if (response_data.success === true) {
      dispatch(Pet_Delete(data));
      callback(true, "Deleted Successfully");
    } else if (response_data.expired === true) {
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "PET_REMOVE" });
      dispatch({ type: "PET_REGISTER_INIT" });
      window.location.href = "/auth";
    } else {
      callback(false, response_data.message);
    }
  } catch (err) {
    callback(false, err.message);
  }
};

export const PetUpdate = (data, callback) => async (dispatch, getState) => {
  dispatch(Pet_Update_Start());
  try {
    let token = getState().auth.userdata.token;
    const header = { headers: { Authorization: `Bearer ${token}` } };
    const response = await post("pet/update", data, header);
    const response_data = response.data;
    if (response_data.success === true) {
      dispatch(Pet_Update_Success(response_data.data));
      callback(true, "Updated Successfully");
    } else if (!!response_data.expired === true) {
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "PET_REMOVE" });
      dispatch({ type: "PET_REGISTER_INIT" });
      window.location.href = "/auth";
    } else {
      callback(false, response_data.message);
    }
  } catch (err) {
    dispatch(Pet_Update_Error());
    callback(false, "Cannot update profile");
  }
};

export const PetFetchAll = () => async (dispatch, getState) => {
  let token = getState().auth.userdata.token;
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const Pets = await get("pet", header);
  const pets_data = Pets.data;
  dispatch({ type: PET_FETCH_ALL, payload: pets_data });
};

export const Pet_Flow_Information = (payload) => {
  return {
    type: PET_FLOW_INFORMATION,
    payload: payload,
  };
};
