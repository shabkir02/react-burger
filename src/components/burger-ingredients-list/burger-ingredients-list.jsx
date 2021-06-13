import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { IngredientsContext } from '../../services/ingredientsContext';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import s from './burger-ingredients-list.module.sass';

const BurgerIngredientsList = ({ title, type, onIngredientClick }) => {

    const { ingredients } = useContext(IngredientsContext)

    const ingredientsArr = ingredients.map(ingredient => {
        if (ingredient.type === type) {
            return (
                <BurgerIngredientsItem 
                    key={ingredient._id} 
                    ingredient={ingredient} 
                    count={ingredient._id === ingredients[0]._id ? 1 : null}
                    onIngredientClick={onIngredientClick}
                />
            )
        }
    })

    return (
        <div className={`${s.type_wrapper} pt-10`}>
            <h3 className="text text_type_main-medium mb-6">{title}</h3>
            <div className={s.ingredients_type_wrapper}>
                {ingredientsArr}
            </div>
        </div>
    )
}

BurgerIngredientsList.propTypes = {
    title: PropTypes.oneOf(['Булки', 'Соусы', 'Начинки']),
    type: PropTypes.oneOf(['bun', 'sauce', 'main']),
    onIngredientClick: PropTypes.func.isRequired
}

export default BurgerIngredientsList;