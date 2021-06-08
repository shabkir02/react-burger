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

  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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
        throw new Error(`Something goes wrong`)
      });

    const closeModalOnKey = (e) => {
      if (e.key === "Escape") {
        closeModal(e);
      }
    }

    document.addEventListener('keydown', closeModalOnKey)

    return () => {
      document.removeEventListener('keydown', closeModalOnKey)
    }
    
  }, [])

  const handleIngredientClick = (item) => {
    setCurrentIng(item);
    setModalInner('ingredientDetail')
    setModalOpen(true)
  }

  const handleOrderClick = () => {
    setModalInner('orderDetail');
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const modalTitle = modalInner === 'ingredientDetail' ? 'Детали ингредиента' : false

  return (
    <main className={s.app}>
      <header>
        <AppHeader/>
      </header>
      {data && (
        <>
          <section className={s.table_wrapper}>
            <BurgerIngredients data={data} handleIngredientClick={handleIngredientClick} />
            <BurgerConstructor data={data} handleOrderClick={handleOrderClick} />
          </section>
          {modalOpen && (
            <Modal title={modalTitle} closeModal={closeModal}>
              {modalInner === 'ingredientDetail' && <IngredientDetails currentIng={currentIng}/>}
              {modalInner === 'orderDetail' && <OrderDetails/>}
            </Modal>
          )}
        </>
      )}
    </main>
  );
}

export default App;
