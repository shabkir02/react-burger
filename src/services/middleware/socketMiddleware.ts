import { getCookie } from "../../utils/cookies";

export const socketMiddleware = (token, wsActions) => {
    return store => {
        let socket = null;
  
        return next => action => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
            
            if (type === wsInit) {
                if (token) {
                    socket = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${getCookie('accessToken')}`);
                } else {
                    socket = new WebSocket("wss://norma.nomoreparties.space/orders/all");
                }
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };
            }
        next(action);
        };
    };
}