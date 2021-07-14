import { act } from 'react-dom/test-utils'
import {GET_INGREDIENTS_REQUEST,
        GET_INGREDIENTS_SUCCESS,
        GET_INGREDIENTS_FAILED,
        ADD_COMPONENT,
        REMOVE_COMPONENT,
        SHOW_INGREDIENT_MODAL,
        SHOW_ORDER_MODAL,
        CREATE_ORDER_FAILED,
        CLEAN_CONSTRUCTOR} from '../actions'

const initialState = {

    tabs: [
        {
            id: 'bun',
            title: 'Булки'
        },
        {
            id: 'sauce',
            title: 'Соусы'
        },
        {
            id: 'main',
            title: 'Начинки'
        }
    ],

    ingredients:[],
    ingredientsRequest: false,
    ingredientsFailed: false,

    burgerComponents:{
        bun: null,
        optional: []
    },

    showIngredientModal: false,
    currentIngredient:{},

    showOrderModal: false,
    orderFailed: false,
    currentOrder:{},
    orderNumber: null
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
                    ingredients: state.ingredients.map(item => item._id === action.item._id ? {...item, qty: 2}:
                        (state.burgerComponents.bun && item._id === state.burgerComponents.bun._id) ? {...item, qty: 0} : item ),
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
        case SHOW_INGREDIENT_MODAL:
            return {
                ...state,
                showIngredientModal: !state.showIngredientModal,
                currentIngredient: action.item
            }
        case SHOW_ORDER_MODAL:
            return {
                ...state,
                orderFailed: false,
                showOrderModal: !state.showOrderModal,
                currentOrder:action.order,
                orderNumber: action.order ? action.order.order.number : null
            }
        case CLEAN_CONSTRUCTOR:
            return{
                ...state,
                burgerComponents: initialState.burgerComponents,
                ingredients: state.ingredients.map(item => ({...item, qty: 0}))
            }
        case CREATE_ORDER_FAILED:
            return {
                ...state,
                currentOrder: null,
                orderFailed: true,
                orderNumber: null,
                showOrderModal: !state.showOrderModal,
                orderFailedMessage: action.message
            }
        default:
            return state;
    }
}