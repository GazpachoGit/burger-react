import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_COMPONENT,
    REMOVE_COMPONENT,
    SHOW_ORDER_MODAL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
    CLEAN_CONSTRUCTOR,
    UPDATE_OPTIONAL,
    UPDATE_CURRENT_TAB,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    TIngredientsActions
} from '../actions';
import { TCreatedOrder, TIngredient, TOrder, TTab } from '../types/data';

type TIngredientsState = {
    tabs: Array<TTab>,
    currentTab?: TTab,
    ingredients: Array<TIngredient>,
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    burgerComponents: {
        bun?: TIngredient,
        optional: Array<TIngredient>
    },
    orderRequest: boolean,
    orderFailed: boolean,
    currentOrder?: TCreatedOrder,
    orderNumber?: string,
    showOrderModal: boolean,
    openedOrder: {
        openOrderRequest: boolean,
        openOrderFailed: boolean,
        openOrderFailedMessage: string,
        order?: TOrder
    }
}

export const initialState: TIngredientsState = {

    tabs: [
        {
            id: 'bun',
            title: 'Булки',
            ratio: 0
        },
        {
            id: 'sauce',
            title: 'Соусы',
            ratio: 0
        },
        {
            id: 'main',
            title: 'Начинки',
            ratio: 0
        }
    ],
    currentTab: undefined,

    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    burgerComponents: {
        bun: undefined,
        optional: []
    },

    orderRequest: false,
    orderFailed: false,

    currentOrder: undefined,
    orderNumber: undefined,
    showOrderModal: false,

    openedOrder: {
        openOrderRequest: false,
        openOrderFailed: false,
        openOrderFailedMessage: "",
        order: undefined
    }


}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false
            }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredients: action.items
            }
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
                    ingredients: state.ingredients.map(item => item._id === action.item._id ? { ...item, qty: 2 } :
                        (state.burgerComponents.bun && item._id === state.burgerComponents.bun._id) ? { ...item, qty: 0 } : item),
                    burgerComponents: {
                        ...state.burgerComponents,
                        bun: action.item
                    }
                }
            } else {
                const currentItem = state.ingredients.find(({ _id }) => _id === action.item._id);
                if (currentItem?.qty)
                    return {
                        ...state,
                        ingredients: state.ingredients.map(item => item._id === action.item._id ? { ...item, qty: item.qty ? ++item.qty : 1 } : item),
                        burgerComponents: {
                            ...state.burgerComponents,
                            optional: [...state.burgerComponents.optional, { ...action.item, id: action.item._id + state.burgerComponents.optional.length }]
                        }
                    }
                else
                    return {
                        ...state,
                        ingredients: state.ingredients.map(item => item._id === action.item._id ? { ...item, qty: 1 } : item),
                        burgerComponents: {
                            ...state.burgerComponents,
                            optional: [...state.burgerComponents.optional, { ...action.item, id: action.item._id + state.burgerComponents.optional.length }]
                        }
                    }
            }
        }
        case REMOVE_COMPONENT: {
            if (action.item.type === 'bun') {
                return {
                    ...state,
                    ingredients: state.ingredients.map(item => item._id === action.item._id ? { ...item, qty: 0 } : item),
                    burgerComponents: {
                        ...state.burgerComponents,
                        bun: null
                    }
                }
            } else {
                return {
                    ...state,
                    ingredients: state.ingredients.map(item => item._id === action.item._id ? { ...item, qty: item.qty ? --item.qty : 0 } : item),
                    burgerComponents: {
                        ...state.burgerComponents,
                        optional: state.burgerComponents.optional
                            .filter((item, index) => index !== action.index)
                            .map((item, index) => ({ ...item, id: item._id + index }))
                    }
                }
            }
        }
        case SHOW_ORDER_MODAL:
            return {
                ...state,
                showOrderModal: !state.showOrderModal
            }
        case CLEAN_CONSTRUCTOR:
            return {
                ...state,
                burgerComponents: initialState.burgerComponents,
                ingredients: state.ingredients.map(item => ({ ...item, qty: 0 }))
            }
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
                currentOrder: null,
                orderNumber: null,
                orderFailedMessage: null
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orderRequest: false,
                currentOrder: action.order,
                orderNumber: action.order ? action.order.order.number : null
            }
        case CREATE_ORDER_FAILED:
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
                orderFailedMessage: action.message
            }
        case UPDATE_OPTIONAL:
            return {
                ...state,
                burgerComponents: {
                    ...state.burgerComponents,
                    optional: action.optional
                }
            }
        case UPDATE_CURRENT_TAB:
            return {
                ...state,
                tabs: state.tabs.map(tab => tab.id === action.id ? { ...tab, ratio: action.ratio } : tab)
            }
        case GET_ORDER_REQUEST:
            return {
                ...state,
                openedOrder: {
                    openOrderRequest: true,
                    openOrderFailed: false,
                    openOrderFailedMessage: "",
                    order: {}
                }
            }
        case GET_ORDER_FAILED:
            return {
                ...state,
                openedOrder: {
                    ...state.openedOrder,
                    openOrderRequest: false,
                    openOrderFailed: true,
                    openOrderFailedMessage: action.message
                }
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                openedOrder: {
                    ...state.openedOrder,
                    openOrderRequest: false,
                    openOrderFailed: false,
                    order: action.order
                }
            }
        default:
            return state;
    }
}