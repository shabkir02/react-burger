import { getCookie } from "../../utils/cookies";
import { RootState } from "../types";
import { Middleware } from "redux";

export type WsActions = {
    wsInit: string
    onOpen: string
    onClose: string
    onError: string
    onMessage: string
}

export const createSocketMiddlware = (token: string | null, wsActions: WsActions ): Middleware<{}, RootState> => {
    const socketMiddleware: Middleware<{}, RootState> = (store) => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
            
            if (type === wsInit) {
                if (token) {
                    socket = new WebSocket(`wss://norma.nomoreparties.space/api/orders?token=${getCookie('accessToken')}`);
                } else {
                    socket = new WebSocket("wss://norma.nomoreparties.space/api/orders/all");
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

    return socketMiddleware;
}