import React from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropTypes from 'prop-types'

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import s from './constructor-page.module.sass';

const ConstructorPage = ({ handleIngredientClick, handleOrderClick }) => {

    const { ingredients } = useSelector(store => ({
        ingredients: store.ingredients.ingredients,
    }));

    return ingredients ? (
        <>
            <DndProvider backend={HTML5Backend}>
                <section className={s.table_wrapper}>
                    <BurgerIngredients handleIngredientClick={handleIngredientClick} />
                    <BurgerConstructor handleOrderClick={handleOrderClick} />
                </section>
            </DndProvider>
        </>
    ) : null
}

ConstructorPage.propTypes = {
    handleIngredientClick: PropTypes.func.isRequired,
    handleOrderClick: PropTypes.func.isRequired
}

export default ConstructorPage;