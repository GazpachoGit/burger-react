import { TWSActions } from '../actions/wsActions';
import {
  WS_COMMON_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_COMMON_ORDERS,
  WS_GET_USER_ORDERS
} from '../actions/wsActions';
import { TOrder, TWsOrdersResponse } from '../types/data';

type TWSOrdersState = {
  wsConnected: boolean,
  code: string,
  error: string,
  commonOrders: {
    orders: Array<TOrder>,
    statistics: {
      total: number,
      totalToday: number,
      readyOrders: Array<string>,
      inProgressOrders: Array<string>
    }
  },
  userOrders: TWsOrdersResponse | []
}

export const initialState: TWSOrdersState = {
  wsConnected: false,
  code: "",
  error: "",
  commonOrders: {
    orders: [],
    statistics: {
      total: 0,
      totalToday: 0,
      readyOrders: [],
      inProgressOrders: []
    }
  },
  userOrders: []
}

export const wsReducer = (state = initialState, action: TWSActions): TWSOrdersState => {
  switch (action.type) {
    case WS_COMMON_ORDERS_CONNECTION_START:
      return initialState;
    case WS_USER_ORDERS_CONNECTION_START:
      return initialState;
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        code: "",
        error: ""
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.error
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        code: action.code
      };

    case WS_GET_COMMON_ORDERS:
      return {
        ...state,
        commonOrders: {
          orders: action.payload.orders,
          statistics: {
            total: action.payload.total,
            totalToday: action.payload.totalToday,
            readyOrders: action.payload.orders
              .filter(item => item.status && item.status === 'done')
              .map(item => item.number),
            inProgressOrders: action.payload.orders
              .filter(item => item.status && item.status !== 'done')
              .map(item => item.number)
          }
        }
      };
    case WS_GET_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload
      };

    default:
      return state;
  }
};