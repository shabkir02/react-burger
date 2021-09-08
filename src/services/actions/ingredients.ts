import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    RESET_CONSTRUCTOR
} from '../constants/ingredients';
import { AppDispatch, AppThunk } from '../types';

import { TIngredient, TIngredientConstructor, TMovingIngredient } from '../types/data';

const _apiUrl = 'https://norma.nomoreparties.space/api';

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: ReadonlyArray<TIngredient>
}
export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IAddIngredienToConstructorAction {
    readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    payload: TIngredientConstructor
}
export interface IDeleteIngredientFromConstructorAction {
    readonly type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR;
    payload: TIngredientConstructor
}
export interface IAddBunToConstructorAction {
    readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
    payload: TIngredient
}
export interface IMoveIngredientInConstructorAction {
    readonly type: typeof MOVE_INGREDIENT_IN_CONSTRUCTOR;
    payload: TMovingIngredient;
}
export interface IResetConstructorAction {
    readonly type: typeof RESET_CONSTRUCTOR;
};

export type TIngredientsActions = 
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
    | IAddIngredienToConstructorAction
    | IDeleteIngredientFromConstructorAction
    | IAddBunToConstructorAction
    | IMoveIngredientInConstructorAction
    | IResetConstructorAction
;

export const getIngredientsRequest = (): IGetIngredientsRequestAction  => ({
    type: GET_INGREDIENTS_REQUEST
})
export const getIngredientsSuccess = (ingredients: ReadonlyArray<TIngredient>): IGetIngredientsSuccessAction  => ({
    type: GET_INGREDIENTS_SUCCESS,
    payload: ingredients
})
export const getIngredientsFailed = (): IGetIngredientsFailedAction  => ({
    type: GET_INGREDIENTS_FAILED
})
export const addIngredientToConstructor = (ingredient: TIngredientConstructor): IAddIngredienToConstructorAction  => ({
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: ingredient
})
export const deleteIngredientFromConstructor = (ingredient: TIngredientConstructor): IDeleteIngredientFromConstructorAction  => ({
    type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    payload: ingredient
})
export const addBunToConstructor = (bun: TIngredient): IAddBunToConstructorAction  => ({
    type: ADD_BUN_TO_CONSTRUCTOR,
    payload: bun
})
export const moveIngredientInConstructor = (dragObj: TMovingIngredient): IMoveIngredientInConstructorAction  => ({
    type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
    payload: dragObj
})
export const resetConstructor = (): IResetConstructorAction  => ({
    type: RESET_CONSTRUCTOR
})

export const getIngredients: AppThunk = () => {
    return function(dispatch: AppDispatch) {
        dispatch(getIngredientsRequest());
        fetch(`${_apiUrl}/ingredients `).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                dispatch(getIngredientsFailed())
            }
        }).then(response => {
            dispatch(getIngredientsSuccess(response.data))
        }).catch(err => {
            console.log(err);
        })
    }
}