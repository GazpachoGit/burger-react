import { stat } from 'fs'
import {GET_INGREDIENTS_REQUEST,
        GET_INGREDIENTS_SUCCESS,
        GET_INGREDIENTS_FAILED,
        DECREASE_INGREDIENTS,
        INCREASE_INGREDIENTS,
        ADD_COMPONENT,
        REMOVE_COMPONENT} from '../actions'

const initialState = {

    ingredients:[],
    ingredientsRequest: false,
    ingredientsFailed: false,

    burgerComponents:{
        bun: null,
        optional: []
    },
    currentIngredient:{},
    currentOrder:{}
}

export const ingredientsReducer = (state= initialState, action) => {
    switch(action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true
            }
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.items
            }
        case GET_INGREDIENTS_FAILED: 
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
            }
        case ADD_COMPONENT: {
            if (action.item.type === 'bun') {
                return {
                    ...state,
                    ingredients: state.ingredients.map(item => item._id === action.item._id ? {...item, qty: 1}: item),
                    burgerComponents:{
                        ...state.burgerComponents,
                        bun: action.item
                    }
                }
                } else {
                    const currentItem = state.ingredients.find(({_id}) => _id === action.item._id);
                    if (currentItem.qty)
                        return {
                            ...state,
                            ingredients: state.ingredients.map(item => item._id === action.item._id ? {...item, qty: ++item.qty} : item)
                        }
                    else 
                        return {
                            ...state,
                            ingredients: state.ingredients.map(item => item._id === action.item._id ? {...item, qty: 1} : item),
                            burgerComponents: {
                                ...state.burgerComponents,
                                optional: [...state.burgerComponents.optional, action.item]
                            }
                        }
                }
        }
        case REMOVE_COMPONENT: {
            if (action.item.type === 'bun') {
                return{
                    ...state,
                    ingredients: state.ingredients.map(item => item._id === action.item._id ? {...item, qty: 0}: item),
                    burgerComponents:{
                        ...state.burgerComponents,
                        bun: null
                    }
                }
            } else {
                const currentItem = state.ingredients.find(({_id}) => _id === action.item._id);
                    if (currentItem.qty !== 1)
                        return {
                            ...state,
                            ingredients: state.ingredients.map(item => item._id === action.item._id ? {...item, qty: --item.qty} : item)
                        }
                    else 
                        return {
                            ...state,
                            ingredients: state.ingredients.map(item => item._id === action.item._id ? {...item, qty: 0} : item),
                            burgerComponents: {
                                ...state.burgerComponents,
                                optional: state.burgerComponents.optional.filter(item => item._id !== action.item._id)
                            }
                        }
            }
        }
        default:
            return state;
    }
}