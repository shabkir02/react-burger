export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const ADD_INGREDIENT_TO_CONSTRUCTOR = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = "DELETE_INGREDIENT_FROM_CONSTRUCTOR";
export const ADD_BUN_TO_CONSTRUCTOR = "ADD_BUN_TO_CONSTRUCTOR";
export const MOVE_INGREDIENT_IN_CONSTRUCTOR = "MOVE_INGREDIENT_IN_CONSTRUCTOR";

const _apiUrl = 'https://norma.nomoreparties.space/api';

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetch(`${_apiUrl}/ingredients `).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            }
        }).then(response => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                payload: response.data
            })
        })
    }
}