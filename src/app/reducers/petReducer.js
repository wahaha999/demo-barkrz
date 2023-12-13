import { 
    PET_FETCH_ALL,
    PET_CREATE_START,
    PET_CREATE_SUCCESS,
    PET_CREATE_ERROR,
    PET_UPDATE_START,
    PET_UPDATE_SUCCESS,
    PET_UPDATE_ERROR,
    PET_REMOVE,
    PET_MEMBERSHIP,
    PET_DELETE,
    PET_FLOW_INFORMATION
} from "@app/actions/actionTypes";

const defaultState = {
    Pets:[],
    inProgress: false,
    membership: 0,
};

const petsInformation = (state = defaultState , action) => {
    switch(action.type) {
        case PET_FETCH_ALL:
            return {
                ...state,
                Pets: action.payload
            };
        case PET_CREATE_START:
            return {
                ...state,
                inProgress: true,
            };
        case PET_CREATE_SUCCESS:
            let arr = state.Pets;
            arr.push(action.payload);      
            return {
                ...state,
                Pets:arr,
                inProgress: false,
            };
        case PET_CREATE_ERROR:        
            return {
                ...state,
                inProgress: false,
            };
        case PET_UPDATE_START:
            return {
                ...state,
                inProgress: true,
            };
        case PET_UPDATE_SUCCESS:
            let update_arr = state.Pets;
            for (let i=0; i < update_arr.length; i ++) {
                if (update_arr[i].pet.id === action.payload.pet.id) {
                    update_arr[i] = action.payload;
                    break;
                }
            }
            return {
                ...state,
                Pets:update_arr,
                inProgress: false,
            };
        case PET_DELETE:
            let pets = state.Pets;
            let nArr = [];
            for (let i=0; i < pets.length; i ++) {
                if (pets[i].pet.id !== action.payload.id) {
                    nArr.push(pets[i]);
                }
            }
            return {
                ...state,
                Pets: nArr,
            };
        case PET_UPDATE_ERROR:
            return {
                ...state,
                inProgress: false,
            };
        case PET_MEMBERSHIP:
            return {
                ...state,
                membership: action.payload,
            };
        case PET_REMOVE:
            return defaultState;
        case PET_FLOW_INFORMATION:
            return {
                ...state,
                petFlowData: action.payload,
            };
        default:
            return state;
    }
}

export default petsInformation;