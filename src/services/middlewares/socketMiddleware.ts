import { getCookie } from '../../utils/cookie-utils';
import testData from '../../utils/orders-feed-test-data';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { TWSActions, WS_COMMON_ORDERS_CONNECTION_START, WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_COMMON_ORDERS, WS_GET_USER_ORDERS, WS_USER_ORDERS_CONNECTION_START } from '../actions/wsActions';


type TActions = {
  wsInit: typeof WS_COMMON_ORDERS_CONNECTION_START | typeof WS_USER_ORDERS_CONNECTION_START,
  wsOpened: typeof WS_CONNECTION_SUCCESS
  wsClose: typeof WS_CONNECTION_CLOSE
  wsClosed: typeof WS_CONNECTION_CLOSED
  wsError: typeof WS_CONNECTION_ERROR
  wsMessage: typeof WS_GET_COMMON_ORDERS | typeof WS_GET_USER_ORDERS
}


export default function socketMiddleware(wsUrl: string, wsActions: TActions, auth?: boolean): Middleware {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket;

    return (next: Dispatch) => (action: TWSActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit,
        wsOpened,
        wsClose,
        wsClosed,
        wsError,
        wsMessage
      } = wsActions;
      //const { user } = getState().user;
      if (socket && type === wsClose) {
        socket.close();
      }
      if (type === wsInit) {
        if (auth) {
          wsUrl += `?token=${getCookie('token')}`;
        }
        socket = new WebSocket(wsUrl);
      }
      if (socket) {

        socket.onopen = event => {
          dispatch({ type: wsOpened });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsError });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (restParsedData && restParsedData.message) {
            dispatch({ type: wsError, error: restParsedData.message });
          } else {
            dispatch({ type: wsMessage, payload: restParsedData });
            //dispatch({ type: wsMessage, payload: testData })
          }


        };

        socket.onclose = event => {
          if (!event.wasClean) {
            dispatch({ type: wsClosed, code: { code: event.code } });
          }
        };
      }

      next(action);
    };
  };
};