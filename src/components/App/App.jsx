import React from 'react';

import data from '../../utils/data';

import AppHeader from '../App-header/App-header';
import BurgerIngredients from '../Burger-ingredients/Burger-ingredients';
import BurgerConstructor from '../Burger-constructor/Burger-constructor';

import s from './App.module.sass';

const App = () => {

  return (
    <main className={s.app}>
      <header>
        <AppHeader/>
      </header>
      <section className={s.table_wrapper}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data} />
      </section>
    </main>
  );
}

export default App;
