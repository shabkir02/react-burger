export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const ORDER_RESET = "ORDER_RESET";

const _apiUrl = 'https://norma.nomoreparties.space/api';

export function makeOrder(ingredientsIdArr) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        })
        fetch(`${_apiUrl}/orders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
              "ingredients": ingredientsIdArr
            })
          })
            .then(response => {
              if (response.ok) {
                return response.json()
              } else {
                dispatch({
                    type: GET_ORDER_FAILED
                })
              }
            })
            .then(response => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: response
                })
            })
    }
}
