import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-scroll'

import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';

import s from './burger-ingredients.module.sass';

const BurgerIngredients = ({ handleIngredientClick }) => {

    return (
        <section className={`${s.section_container} pt-10`}>
            <h1 className={`${s.title} text text_type_main-large mb-5`}>Соберите бургер</h1>
            <div className={`${s.tab_wrapper}`}>
                <Tab active>Булки</Tab>
                <Tab>Соусы</Tab>
                <Link activeClass="active" to="main" spy={true} smooth={true} offset={50} duration={500}>
                    <Tab>Начинки</Tab>
                </Link>
            </div>
            <div className={`${s.ingredients_wrapper} pl-4 pb-10`}>
                <BurgerIngredientsList onIngredientClick={handleIngredientClick} title='Булки' type="bun" />
                <BurgerIngredientsList onIngredientClick={handleIngredientClick} title='Соусы' type="sauce" />
                <BurgerIngredientsList onIngredientClick={handleIngredientClick} title='Начинки' type="main" />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    handleIngredientClick: PropTypes.func.isRequired
}

export default BurgerIngredients;