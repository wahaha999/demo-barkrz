import {
  PET_REGISTER_GENE,
  PET_REGISTER_ID_CODE,
  PET_REGISTER_NAME_AND_IMAGE,
  PET_REGISTER_ADDR_AND_BREED,
  PET_REGISTER_AGE_WEIGHT_NEUTERED,
  PET_REGISTER_MEDICALCONDITION_TEMPERAMENT,
  PET_REGISTER_OWENRNAMES,
  PET_CREATE_START,
  PET_CREATE_SUCCESS,
  PET_CREATE_ERROR,
  PET_REGISTER_INIT,
  CONTACT_CREATE,
} from "@app/actions/actionTypes";

import { post } from "../constants";

export const OnRegisterPetInit = () => {
  return {
    type: PET_REGISTER_INIT,
  };
};

// payload ={gender:"female"}
export const OnRegisterPetGender = (payload) => {
  return {
    type: PET_REGISTER_GENE,
    payload: payload,
  };
};

// payload ={identity_code:"70254081"}
export const OnRegisterPetIdCode = (payload) => {
  return {
    type: PET_REGISTER_ID_CODE,
    payload: payload,
  };
};

//payload = {name:"tom" , image:data}
export const OnRegisterPetNameAndImage = (payload) => {
  return {
    type: PET_REGISTER_NAME_AND_IMAGE,
    payload: payload,
  };
};

//payload = {address:"tom" , breed:"dog"}
export const OnRegisterPetAddrAndBreed = (payload) => {
  return {
    type: PET_REGISTER_ADDR_AND_BREED,
    payload: payload,
  };
};

//payload = {age:"1921",weight:"12lbs",neutered:"yes"}
export const OnRegisterPetAgeWeightNeutered = (payload) => {
  return {
    type: PET_REGISTER_AGE_WEIGHT_NEUTERED,
    payload: payload,
  };
};

//payload = {medicalConditions:"10001101"}
export const OnRegisterPetMedicalConditionAndTemperament = (payload) => {
  return {
    type: PET_REGISTER_MEDICALCONDITION_TEMPERAMENT,
    payload: payload,
  };
};

//payload = {ownerNames:[{name:"jerry",phone:"13020302"},{}...]}
export const OnRegisterPetOwnerNames = (payload) => {
  return {
    type: PET_REGISTER_OWENRNAMES,
    payload: payload,
  };
};

export const Upload_Start = () => {
  return {
    type: PET_CREATE_START,
  };
};

export const Upload_Error = () => {
  return {
    type: PET_CREATE_ERROR,
  };
};

export const Upload_Success = (payload) => {
  return {
    type: PET_CREATE_SUCCESS,
    payload: payload,
  };
};

export const UploadPetInfo = (data, callback) => async (dispatch, getState) => {
  dispatch(Upload_Start());
  try {
    let token = getState().auth.userdata.token;
    const header = { headers: { Authorization: `Bearer ${token}` } };
    const response = await post("pet/create", data, header);
    const response_data = response.data;

    if (response_data.success === true) {
      dispatch(Upload_Success(response_data.data));
      dispatch(OnRegisterPetInit());
      callback(true, "Successfully Created Profile");
    } else if (response_data.success === false) {
      dispatch(Upload_Error());
      callback(false, response_data.error);
    } else if (response_data.expired === true) {
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "PET_REMOVE" });
      dispatch({ type: "PET_REGISTER_INIT" });
      // window.location.href = "/auth";
    } else {
      dispatch(Upload_Error());
      callback(false, "something goes wrong!");
    }
  } catch (err) {
    dispatch(Upload_Error());
    callback(false, err.message);
  }
};

export const CreateContact = (data, callback) => async (dispatch, getState) => {
  try {
    let token = getState().auth.userdata.token;
    const header = { headers: { Authorization: `Bearer ${token}` } };
    const contact = await post("contact", data, header);
    const contact_data = contact.data;
    dispatch({ type: CONTACT_CREATE, payload: contact_data });
    callback(true, "Successfully Created Contact");
  } catch (error) {
    callback(false, error.message);
  }
};
