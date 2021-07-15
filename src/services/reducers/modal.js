import { 
    SET_MODAL_INNER_INGREDIENT_DETAILS,
    SET_MODAL_INNER_ORDER_DETAILS,
    SET_MODAL_OPEN,
    SET_MODAL_CLOSE,
    SET_CURRENT_INGREDIENT
} from '../actions';

const initialState = {
    ingredientsConstructor: null,
    currentIngredient: null,
    isModalOpen: false,
    modalInner: null
}

export const modalReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.payload
            }
        case SET_MODAL_INNER_INGREDIENT_DETAILS:
            return {
                ...state,
                modalInner: {
                    title: 'Детали ингредиента',
                    type: "ingredientDetails"
                }
            }
        case SET_MODAL_INNER_ORDER_DETAILS:
            return {
                ...state,
                modalInner: {
                    title: null,
                    type: 'orderDetails'
                }
            }
        case SET_MODAL_OPEN:
            return {
                ...state,
                isModalOpen: true
            }
        case SET_MODAL_CLOSE:
            return {
                ...state,
                isModalOpen: false
            }
        default: {
            return state
        }
            
    }
}