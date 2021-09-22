import { mainUrl, orderUrl } from '../../utils/constants';
import {data} from '../../utils/data';
import { getCookie } from '../../utils/cookie-utils';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const ADD_COMPONENT = 'ADD_COMPONENT';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';
export const SHOW_ORDER_MODAL = 'SHOW_ORDER_MODAL';
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const CLEAN_CONSTRUCTOR = 'CLEAN_CONSTRUCTOR';
export const UPDATE_OPTIONAL = 'UPDATE_OPTIONAL';
export const UPDATE_CURRENT_TAB = 'UPDATE_CURRENT_TAB';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetch(mainUrl)
        .then(res => {
          if (res.ok)
            return res.json();
          return Promise.reject(res.status);
        })
        .then(({ data }) => {
          dispatch({
              type:GET_INGREDIENTS_SUCCESS,
              items: data
          })
        })
        .catch(e => {
          dispatch({
              type:GET_INGREDIENTS_FAILED
          })
        })
    }
}

export function createOrder(Ids) {
  return function(dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST
    });
    dispatch({
      type: SHOW_ORDER_MODAL,
    })
    fetch(orderUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({"ingredients": Ids})
    })
    .then(res => {
      if (res.ok)
        return res.json();
      return res.json().then(res => {throw res});
    })
    .then(res => {
      dispatch({
        type:CREATE_ORDER_SUCCESS,
        order: res
      });
      dispatch({
        type: CLEAN_CONSTRUCTOR
      });
    })
    .catch(res => {
      dispatch({
        type:CREATE_ORDER_FAILED,
        message: res.message
      });
    })
  }
}

export function getIngredientsWhenYandexAFK(){
  return function(dispatch) {
    dispatch({
      type:GET_INGREDIENTS_SUCCESS,
      items: data
    })
 }
}

export function getOrder(id) {
  return dispatch => {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    fetch(`${orderUrl}/${id}`, {
      method: 'GET',
      'Content-Type': 'application/json'
    })
    .then(res => {
      return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
    })
    .then(data => {
      if(data.success){       
        dispatch({
            type: GET_ORDER_SUCCESS,
            order: data.orders[0]
        });;
      } 
    })
    .catch(err => {
      dispatch({
        type: GET_ORDER_FAILED,
        message: err.message
      })
    })
  }
}