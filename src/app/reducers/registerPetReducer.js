import {
    PET_REGISTER_GENE,
    PET_REGISTER_ID_CODE,
    PET_REGISTER_NAME_AND_IMAGE,
    PET_REGISTER_ADDR_AND_BREED,
    PET_REGISTER_AGE_WEIGHT_NEUTERED,
    PET_REGISTER_MEDICALCONDITION_TEMPERAMENT,
    PET_REGISTER_OWENRNAMES,
    PET_REGISTER_INIT,
    CONTACT_CREATE,
} from "@app/actions/actionTypes";

const defaultState = {
    gender: false,
    identity_code: null,
    image: null,
    name: "",
    address: "",
    breed: "",
    age: "",
    weight: "",
    neutered: "",
    medicalCondition: "",
    temperament: "",
    ownerNames: [],
    uploading: false,
    contactList: {}
};

const registerPetInfo = (state = defaultState, action) => {
    switch (action.type) {
        case PET_REGISTER_INIT:
            return defaultState;
        case PET_REGISTER_GENE:
            return {
                ...state,
                gender: action.payload.gender,
            };
        case PET_REGISTER_ID_CODE:
            return {
                ...state,
                identity_code: action.payload.identity_code,
            };
        case PET_REGISTER_NAME_AND_IMAGE:
            return {
                ...state,
                name: action.payload.name,
                image: action.payload.image,
            };
        case PET_REGISTER_ADDR_AND_BREED:
            return {
                ...state,
                address: action.payload.address,
                breed: action.payload.breed,
            };
        case PET_REGISTER_AGE_WEIGHT_NEUTERED:
            return {
                ...state,
                age: action.payload.age,
                weight: action.payload.weight,
                neutered: action.payload.neutered,
            };
        case PET_REGISTER_MEDICALCONDITION_TEMPERAMENT:
            return {
                ...state,
                medicalCondition: action.payload.medicalCondition,
                temperament: action.payload.temperament,
            };
        case PET_REGISTER_OWENRNAMES:
            return {
                ...state,
                ownerNames: action.payload.ownerNames
            };
        case CONTACT_CREATE:
            return {
                ...state,
                contactList: action.payload.contactList
            };

        default:
            return state;
    }
}

export default registerPetInfo;