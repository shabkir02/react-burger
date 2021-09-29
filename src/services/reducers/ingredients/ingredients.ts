import { TIngredient, TIngredientConstructor } from '../../types/data';
import { TIngredientsActions } from '../../actions/ingredients/ingredients';

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    RESET_CONSTRUCTOR
} from '../../constants/ingredients';

type TIngredientState = {
    ingredients: null | ReadonlyArray<TIngredient>;
    ingredientsRequest: boolean;
    ingredientsFiled: boolean;

    constructorIngredients: Array<TIngredientConstructor>,
    constructorBun: null | TIngredient
}

export const initialState: TIngredientState = {
    ingredients: null,
    ingredientsRequest: false,
    ingredientsFiled: false,

    constructorIngredients: [],
    constructorBun: null
}

export default function ingredientsReducer(state = initialState, action: TIngredientsActions): TIngredientState {
    switch(action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true
            }
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsFiled: true,
                ingredientsRequest: false
            }
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload,
                ingredientsFiled: false,
                ingredientsRequest: false
            }
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients, action.payload]
            }
        case DELETE_INGREDIENT_FROM_CONSTRUCTOR:
            return {
                ...state,
                constructorIngredients: state.constructorIngredients.filter(item => item.drag_id !== action.payload.drag_id)
            }
        case ADD_BUN_TO_CONSTRUCTOR:
            return {
                ...state,
                constructorBun: action.payload
            }
        case MOVE_INGREDIENT_IN_CONSTRUCTOR:
            const arr = [...state.constructorIngredients];
			const dragItem = arr[action.payload.dragIndex];
			const hoverItem = arr[action.payload.hoverIndex];
			arr[action.payload.hoverIndex] = dragItem;
			arr[action.payload.dragIndex] = hoverItem;
            
            return {
                ...state,
                constructorIngredients: arr
            }
        case RESET_CONSTRUCTOR:
            return {
                ...state,
                constructorIngredients: [],
                constructorBun: null
            }
        default: {
            return state
        }
            
    }
}