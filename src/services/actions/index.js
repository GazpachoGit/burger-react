import { mainUrl } from '../../utils/constants';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const DECREASE_INGREDIENTS = 'DECREASE_INGREDIENTS';
export const INCREASE_INGREDIENTS = 'INCREASE_INGREDIENTS';

export const ADD_COMPONENT = 'ADD_COMPONENT';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';



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