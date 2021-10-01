import { TWsOrdersResponse } from "../types/data";

export const WS_COMMON_ORDERS_CONNECTION_START: 'WS_COMMON_ORDERS_CONNECTION_START' = 'WS_COMMON_ORDERS_CONNECTION_START';
export const WS_USER_ORDERS_CONNECTION_START: 'WS_USER_ORDERS_CONNECTION_START' = 'WS_USER_ORDERS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_COMMON_ORDERS: 'WS_GET_COMMON_ORDERS' = 'WS_GET_COMMON_ORDERS';
export const WS_GET_USER_ORDERS: 'WS_GET_USER_ORDERS' = 'WS_GET_USER_ORDERS';

export interface ICommonOrdersConnectionStart {
    readonly type: typeof WS_COMMON_ORDERS_CONNECTION_START;
}
export interface IUserOrdersConnectionStart {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_START;
}
export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionFailed {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly error: string
}
export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly code: string
}
export interface IWsGetCommonOrders {
    readonly type: typeof WS_GET_COMMON_ORDERS;
    readonly payload: TWsOrdersResponse
}
export interface IWsGetUserOrders {
    readonly type: typeof WS_GET_USER_ORDERS;
    readonly payload: TWsOrdersResponse
}
export interface IWsConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSE
}

export type TWSActions = IWsGetUserOrders | IWsGetCommonOrders | IWsConnectionClosed | IWsConnectionFailed | IWsConnectionSuccess | IUserOrdersConnectionStart | ICommonOrdersConnectionStart | IWsConnectionClose

