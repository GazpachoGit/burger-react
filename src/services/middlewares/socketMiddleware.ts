import { Socket } from 'dgram';
import { getCookie } from '../../utils/cookie-utils';
import testData from '../../utils/orders-feed-test-data';
import { RootState } from '../types';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';

type TActions = {
  wsInit: string,
  wsOpened: string
  wsClose: string
  wsClosed: string
  wsError: string
  wsMessage: string
}

export default function socketMiddleware(wsUrl: string, wsActions: TActions, auth?: boolean): Middleware {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket;

    return (next: Dispatch) => (action: { type: string }) => {
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