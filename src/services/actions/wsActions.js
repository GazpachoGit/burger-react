export const WS_COMMON_ORDERS_CONNECTION_START = 'WS_COMMON_ORDERS_CONNECTION_START';
export const WS_USER_ORDERS_CONNECTION_START = 'WS_USER_ORDERS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_COMMON_ORDERS = 'WS_GET_COMMON_ORDERS';
export const WS_GET_USER_ORDERS = 'WS_GET_USER_ORDERS';

// export const wsConnectionSuccess = () => {
//     return {
//       type: WS_CONNECTION_SUCCESS
//     };
//   };
  
//   export const wsConnectionError = () => {
//     return {
//       type: WS_CONNECTION_ERROR
//     };
//   };
  
//   export const wsConnectionClosed = (code) => {
//     return {
//       type: WS_CONNECTION_CLOSED,
//       code: code
//     };
//   };
//   // export const wsConnectionClose = () => {
//   //   return {
//   //     type: WS_CONNECTION_CLOSE
//   //   }
//   // }
  
//   export const wsGetCommonOrders = message => {
//     return {
//       type: WS_GET_COMMON_ORDERS,
//       payload: message
//     };
//   };
//   export const wsGetUserOrders = message => {
//     return {
//       type: WS_GET_USER_ORDERS,
//       payload: message
//     };
//   };