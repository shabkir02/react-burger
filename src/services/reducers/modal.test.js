import reducer, { initialState } from './modal';
import * as types from '../constants/modal'

describe('modal reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            ingredientsConstructor: null,
            currentIngredient: null,
            currentOrderInfo: null,
            modalInner: null
        })
    })

    it('should handle SET_CURRENT_INGREDIENT', () => {
        const action = { 
            type: types.SET_CURRENT_INGREDIENT, 
            payload: { ingredients: true }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            currentIngredient: action.payload
        })
    })

    it('should handle SET_CURRENT_ORDER_INFO', () => {
        const action = { 
            type: types.SET_CURRENT_ORDER_INFO, 
            payload: { order: true }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            currentOrderInfo: action.payload
        })
    })

    it('should handle SET_MODAL_INNER_INGREDIENT_DETAILS', () => {
        const action = {  type: types.SET_MODAL_INNER_INGREDIENT_DETAILS }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            modalInner: {
                title: 'Детали ингредиента',
                type: "ingredientDetails"
            }
        })
    })

    it('should handle SET_MODAL_INNER_ORDER_DETAILS', () => {
        const action = { type: types.SET_MODAL_INNER_ORDER_DETAILS }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            modalInner: {
                title: null,
                type: 'orderDetails'
            }
        })
    })

    it('should handle SET_MODAL_INNER_ORDER_INFO', () => {
        const action = { 
            type: types.SET_MODAL_INNER_ORDER_INFO,
            payload: "Номер заказа"
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            modalInner: {
                title: action.payload,
                type: 'orderInfo'
            }
        })
    })
}) 