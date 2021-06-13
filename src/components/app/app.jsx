import React, { useEffect, useState, useReducer } from 'react';

import { IngredientsContext } from '../../services/ingredientsContext';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import s from './app.module.sass';

const orderInitialState = { order: null };

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return { order: action.payload };
    case "reset":
      return orderInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const App = () => {

  const _apiUrl = 'https://norma.nomoreparties.space/api';

  const modalInnerDetails = {
    ingredientDetails: 'ingredientDetails',
    orderDetails: 'orderDetails'
  }

  const [ingredients, setIngredients] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIng, setCurrentIng] = useState(null);
  const [modalInner, setModalInner] = useState(null); 

  const [orderState, orderDispatcher] = useReducer(reducer, orderInitialState, undefined);

  console.log(orderState);

  useEffect(() => {
    fetch(`${_apiUrl}/ingredients `)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response)
        } 
        return response.json()
      })
      .then(response => setIngredients(response.data))
      .catch(err => {
        console.log(err);
      });

    const closeModalByEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener('keydown', closeModalByEscape)

    return () => {
      document.removeEventListener('keydown', closeModalByEscape)
    }
    
  }, [])

  const handleIngredientClick = (item) => {
    setCurrentIng(item);
    setModalInner(modalInnerDetails.ingredientDetails)
    setIsModalOpen(true)
  }

  const handleOrderClick = (finalIngredients) => {
    setModalInner(modalInnerDetails.orderDetails);
    setIsModalOpen(true)

    const ingredientsIdArr = finalIngredients.map(ingredient => ingredient._id);

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
        if (!response.ok) {
          return Promise.reject(response)
        } 
        return response.json()
      })
      .then(response => orderDispatcher({ type: 'set', payload: response }))
      .catch(err => {
        console.log(err);
      })
  }

  const closeModal = () => {
    setIsModalOpen(false);
    orderDispatcher({ type: 'reset' });
  }

  const defineModalTitle = () => {
    switch(modalInner) {
      case modalInnerDetails.ingredientDetails:
        return 'Детали ингредиента'
      case modalInnerDetails.orderDetails:
        return ''
      default:
        return '';
    }
  }

  const modalTitle = defineModalTitle();

  return (
    <main className={s.app}>
      <IngredientsContext.Provider value={{ingredients, setIngredients}}>
        <AppHeader/>
        {ingredients && (
          <>
            <section className={s.table_wrapper}>
              <BurgerIngredients handleIngredientClick={handleIngredientClick} />
              <BurgerConstructor handleOrderClick={handleOrderClick} />
            </section>
            {isModalOpen && (
              <Modal title={modalTitle} closeModal={closeModal}>
                {modalInner === modalInnerDetails.ingredientDetails && <IngredientDetails currentIng={currentIng}/>}
                {modalInner === modalInnerDetails.orderDetails && orderState.order && <OrderDetails orderState={orderState} />}
              </Modal>
            )}
          </>
        )}
      </IngredientsContext.Provider>
    </main>
  );
}

export default App;
