import React, { useEffect, useState } from 'react';

import AppHeader from '../App-header/App-header';
import BurgerIngredients from '../Burger-ingredients/Burger-ingredients';
import BurgerConstructor from '../Burger-constructor/Burger-constructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../Ingredient-details/Ingredient-details';
import OrderDetails from '../Order-details/Order-details';

import s from './App.module.sass';

const App = () => {

  const _apiUrl = 'https://norma.nomoreparties.space/api';

  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIng, setCurrentIng] = useState(null);

  useEffect(() => {
    fetch(`${_apiUrl}/ingredients `)
      .then(response => response.json())
      .then(response => setData(response.data))
      .catch(err => {
        throw new Error('Somthing goes wrong')
      });

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        closeModal(e);
      }
    })

    return () => {
      document.removeEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
          closeModal(e);
        }
      })
    }
  }, [])

  const openModal = (_id) => {
    const item = data.find(item => item._id === _id);
    setCurrentIng(item);
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <main className={s.app}>
      <header>
        <AppHeader/>
      </header>
      {data && (
        <>
          <section className={s.table_wrapper}>
            <BurgerIngredients data={data} openModal={(_id) => openModal(_id)} />
            <BurgerConstructor data={data} />
          </section>
          {modalOpen && (
            <Modal closeModal={closeModal}>
              <IngredientDetails currentIng={currentIng}/>
            </Modal>
          )}
        </>
      )}
    </main>
  );
}

export default App;
