import React, { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import s from './app.module.sass';

const App = () => {

  const _apiUrl = 'https://norma.nomoreparties.space/api';

  const ingredientDetails = 'ingredientDetails',
        orderDetails = 'orderDetails';

  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIng, setCurrentIng] = useState(null);
  const [modalInner, setModalInner] = useState(null)

  useEffect(() => {
    fetch(`${_apiUrl}/ingredients `)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response)
        } 
        return response.json()
      })
      .then(response => setData(response.data))
      .catch(err => {
        console.log(err);
      });

    const closeModalOnKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener('keydown', closeModalOnKey)

    return () => {
      document.removeEventListener('keydown', closeModalOnKey)
    }
    
  }, [])

  const handleIngredientClick = (item) => {
    setCurrentIng(item);
    setModalInner(ingredientDetails)
    setIsModalOpen(true)
  }

  const handleOrderClick = () => {
    setModalInner(orderDetails);
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const defineModalTitle = () => {
    switch(modalInner) {
      case ingredientDetails:
        return 'Детали ингредиента'
      case orderDetails:
        return ''
      default:
        return '';
    }
  }

  const modalTitle = defineModalTitle();

  return (
    <main className={s.app}>
      <AppHeader/>
      {data && (
        <>
          <section className={s.table_wrapper}>
            <BurgerIngredients data={data} handleIngredientClick={handleIngredientClick} />
            <BurgerConstructor data={data} handleOrderClick={handleOrderClick} />
          </section>
          {isModalOpen && (
            <Modal title={modalTitle} closeModal={closeModal}>
              {modalInner === ingredientDetails && <IngredientDetails currentIng={currentIng}/>}
              {modalInner === orderDetails && <OrderDetails/>}
            </Modal>
          )}
        </>
      )}
    </main>
  );
}

export default App;
