import { mainUrl, orderUrl } from '../../utils/constants';
import { data } from '../../utils/data';
import { getCookie } from '../../utils/cookie-utils';
import { TIngredient, TCreatedOrder, TOrder } from '../types/data';
import { AppDispatch, AppThunk } from '../types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const ADD_COMPONENT: 'ADD_COMPONENT' = 'ADD_COMPONENT';
export const REMOVE_COMPONENT: 'REMOVE_COMPONENT' = 'REMOVE_COMPONENT';
export const SHOW_ORDER_MODAL: 'SHOW_ORDER_MODAL' = 'SHOW_ORDER_MODAL';
export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED: 'CREATE_ORDER_FAILED' = 'CREATE_ORDER_FAILED';
export const CLEAN_CONSTRUCTOR: 'CLEAN_CONSTRUCTOR' = 'CLEAN_CONSTRUCTOR';
export const UPDATE_OPTIONAL: 'UPDATE_OPTIONAL' = 'UPDATE_OPTIONAL';
export const UPDATE_CURRENT_TAB: 'UPDATE_CURRENT_TAB' = 'UPDATE_CURRENT_TAB';
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: Array<TIngredient>
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IAddComponent {
  readonly type: typeof ADD_COMPONENT;
  readonly item: TIngredient
}
export interface IRemoveComponent {
  readonly type: typeof REMOVE_COMPONENT;
  readonly item: TIngredient,
  readonly index: number
}
export interface IShowOrderModal {
  readonly type: typeof SHOW_ORDER_MODAL;
}
export interface ICleanConstructor {
  readonly type: typeof CLEAN_CONSTRUCTOR;
}
export interface ICreateOrderRequest {
  readonly type: typeof CREATE_ORDER_REQUEST;
}
export interface ICreateOrderSuccess {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly order: TCreatedOrder
}
export interface ICreateOrderFailed {
  readonly type: typeof CREATE_ORDER_FAILED;
  readonly message: string
}
export interface IUpdateOptional {
  readonly type: typeof UPDATE_OPTIONAL;
  readonly optional: Array<TIngredient>
}
export interface IUpdateCurrentTab {
  readonly type: typeof UPDATE_CURRENT_TAB;
  readonly ratio: number,
  readonly id: string
}
export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
  readonly message: string
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TOrder
}
export type TIngredientsActions = IGetIngredientsRequest | IGetIngredientsSuccess | IGetIngredientsFailed | IAddComponent | IRemoveComponent | IShowOrderModal | ICleanConstructor | ICreateOrderRequest | ICreateOrderSuccess | ICreateOrderFailed | IUpdateOptional | IUpdateCurrentTab | IGetOrderRequest | IGetOrderFailed | IGetOrderSuccess

export function getIngredients(): AppThunk {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    return fetch(mainUrl)
      .then(res => {
        if (res.ok)
          return res.json();
        return Promise.reject(res.status);
      })
      .then(({ data }) => 
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: data
        })
      )
      .catch(e => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      })
  }
}



export function createOrder(Ids: Array<string>): AppThunk {
  return function (dispatch: AppDispatch) {
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
      body: JSON.stringify({ "ingredients": Ids })
    })
      .then(res => {
        if (res.ok)
          return res.json();
        return res.json().then(res => { throw res });
      })
      .then(res => {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          order: res
        });
        dispatch({
          type: CLEAN_CONSTRUCTOR
        });
      })
      .catch(res => {
        dispatch({
          type: CREATE_ORDER_FAILED,
          message: res.message
        });
      })
  }
}

export function getIngredientsWhenYandexAFK(): AppThunk {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_SUCCESS,
      items: data
    })
  }
}

export function getOrder(id: string) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    fetch(`${orderUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
      })
      .then(data => {
        if (data.success) {
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