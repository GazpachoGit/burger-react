import {getCookie} from '../../utils/cookie-utils';

export default function socketMiddleware(wsUrl, wsActions, auth) {
    return store => {
      let socket = null;
  
      return next => action => {
        const { dispatch, getState } = store;
        const { type, payload } = action;
        const { wsInit,
                wsOpened,
                wsClose,
                wsClosed,
                wsError,
                wsMessage
            } = wsActions;
        //const { user } = getState().user;
        if(socket && type === wsClose) {
          socket.close();
        }
        if (type === wsInit) {
          if(auth){
            wsUrl += `?token=${getCookie('token')}`;
          } 
          socket = new WebSocket(wsUrl);
        }
        if (socket) {

          socket.onopen = event => {
            dispatch({ type: wsOpened });
          };
  
          socket.onerror = event => {
            dispatch({ type: wsError, error: event.message });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
  
            dispatch({ type: wsMessage, payload: restParsedData });
          };
  
          socket.onclose = event => {
            if(!event.wasClean) {
              dispatch({ type: wsClosed, code: {code: event.code} });
            }
          };
        }
  
        next(action);
      };
    };
  };