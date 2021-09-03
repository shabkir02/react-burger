import reducer, { initialState } from './ingredients';
import * as types from '../constants/ingredients'

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            ingredients: null,
            ingredientsRequest: false,
            ingredientsFiled: false,
            constructorIngredients: [],
            constructorBun: null
        })
    })
    
    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(reducer(initialState, { type: types.GET_INGREDIENTS_REQUEST })).toEqual({
            ...initialState,
            ingredientsRequest: true
        })
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(reducer(initialState, { type: types.GET_INGREDIENTS_FAILED })).toEqual({
            ...initialState,
            ingredientsFiled: true,
            ingredientsRequest: false
        })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        const action = { 
            type: types.GET_INGREDIENTS_SUCCESS, 
            payload: [0, 1, 2] 
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            ingredientsFiled: false,
            ingredientsRequest: false,
            ingredients: action.payload
        })
    })

    it('should handle RESET_CONSTRUCTOR', () => {
        expect(reducer(initialState, { type: types.RESET_CONSTRUCTOR })).toEqual({
            ...initialState,
            constructorIngredients: [],
            constructorBun: null
        })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        const action = { 
            type: types.GET_INGREDIENTS_SUCCESS, 
            payload: [0, 1, 2] 
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            ingredientsFiled: false,
            ingredientsRequest: false,
            ingredients: action.payload
        })
    })

    // it('should handle MOVE_INGREDIENT_IN_CONSTRUCTOR', () => {
    //     const action = { 
    //         type: types.MOVE_INGREDIENT_IN_CONSTRUCTOR, 
    //         payload: { 
    //             dragIndex: 1,
    //             hoverIndex: 3
    //         } 
    //     }

    //     expect(reducer(initialState, action)).toEqual({
    //         ...initialState,
    //         constructorIngredients: []
    //     })
    // })

    // it('should handle GET_INGREDIENTS_SUCCESS', () => {
    //     const action = { 
    //         type: types.GET_INGREDIENTS_SUCCESS, 
    //         payload: [0, 1, 2] 
    //     }

    //     expect(reducer(initialState, action)).toEqual({
    //         ...initialState,
    //         ingredientsFiled: false,
    //         ingredientsRequest: false,
    //         ingredients: action.payload
    //     })
    // })
}) 