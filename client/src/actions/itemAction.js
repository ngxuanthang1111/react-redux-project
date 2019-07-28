import {GET_ITEMS, ADD_ITEM, DELETE_ITEMS, ITEMS_LOADING, UPDATE_ITEM} from "./types";
import axios from 'axios';
import {tokenConfig} from "./authAction";
import {returnErrors} from "./errorAction";

//get items from api
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            //respone data from api
            payload: res.data,
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};

//add item to /api/items
export const addItem = item => (dispatch, getState) => {
    axios
        .post('/api/items', item, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data,
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};

//delete item from /api/items
export const deleteItem = (id) => (dispatch, getState) => {
    axios
        .delete(`api/items/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_ITEMS,
            payload: id
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};
/*export const updateItem = (id) => (dispatch, getState) => {
    axios
        .get(`api/items/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: UPDATE_ITEM,
            payload: res.data.id
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};*/
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
};
