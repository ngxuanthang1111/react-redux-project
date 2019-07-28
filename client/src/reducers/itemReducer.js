import {GET_ITEMS, ADD_ITEM, DELETE_ITEMS, ITEMS_LOADING , UPDATE_ITEM} from "../actions/types";

const initialState = {
    items: [],
    loading: false,
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case DELETE_ITEMS:
            return {
                ...state,
                items: state.items.filter(items => items._id !== action.payload)
            };
        case ADD_ITEM:
            return {
                ...state,
                //return old state
                items: [action.payload, ...state.items]
            };
        /*case UPDATE_ITEM:
            console.log(state.items.filter(items => items._id !== action.payload));
            return {
                ...state,
                //find id from action.payload
                items: state.items.filter(items => items._id !== action.payload)
            };*/
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}