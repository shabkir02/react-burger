import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import OrderDetails from '../../components/order-details/order-details';

import { 
    getIngredients, 
    makeOrder, 
    ORDER_RESET, 
    SET_CURRENT_INGREDIENT, 
    SET_MODAL_INNER_INGREDIENT_DETAILS,
    SET_MODAL_INNER_ORDER_DETAILS,
    SET_MODAL_OPEN,
    SET_MODAL_CLOSE
  } from '../../services/actions';

import s from './constructor-page.module.sass';

const ConstructorPage = () => {

    const dispatch = useDispatch();

    const { ingredients, order, modalInner, isModalOpen } = useSelector(store => ({
        ingredients: store.ingredients.ingredients,
        order: store.order.order,
        modalInner: store.modal.modalInner,
        isModalOpen: store.modal.isModalOpen
    }));

    const modalInnerDetails = {
        ingredientDetails: 'ingredientDetails',
        orderDetails: 'orderDetails'
    }

    useEffect(() => {

        dispatch(getIngredients())

        const closeModalByEscape = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        }

        document.addEventListener('keydown', closeModalByEscape)

        return () => {
            document.removeEventListener('keydown', closeModalByEscape)
        }
        
    }, [dispatch])

    const handleIngredientClick = (item) => {
        dispatch({ type: SET_CURRENT_INGREDIENT, payload: item });
        dispatch({ type: SET_MODAL_INNER_INGREDIENT_DETAILS })
        dispatch({ type: SET_MODAL_OPEN })
    }

    const handleOrderClick = (finalIngredients) => {
        dispatch({ type: SET_MODAL_INNER_ORDER_DETAILS })
        dispatch({ type: SET_MODAL_OPEN })

        dispatch(makeOrder(finalIngredients))
    }

    const closeModal = () => {
        dispatch({ type: SET_MODAL_CLOSE });
        dispatch({ type: ORDER_RESET });
    }

    return ingredients ? (
        <>
            <DndProvider backend={HTML5Backend}>
                <section className={s.table_wrapper}>
                    <BurgerIngredients handleIngredientClick={handleIngredientClick} />
                    <BurgerConstructor handleOrderClick={handleOrderClick} />
                </section>
            </DndProvider>
            {isModalOpen && (
                <Modal closeModal={closeModal}>
                    {modalInner.type === modalInnerDetails.ingredientDetails && <IngredientDetails/>}
                    {modalInner.type === modalInnerDetails.orderDetails && order && <OrderDetails/>}
                </Modal>
            )}
        </>
    ) : null
}

export default ConstructorPage;