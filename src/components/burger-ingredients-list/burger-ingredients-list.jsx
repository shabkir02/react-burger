import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import s from './burger-ingredients-list.module.sass';

const BurgerIngredientsList = ({ title, type, onIngredientClick }) => {

    const { ingredients, constructorIngredients, constructorBun } = useSelector(store => ({
        ingredients: store.ingredients.ingredients,
        constructorIngredients: store.ingredients.constructorIngredients,
        constructorBun: store.ingredients.constructorBun
    }));

    const counters = useMemo(() => {
		const counter = {};

		constructorIngredients.map((ingredient) => {
			if (!counter[ingredient._id]) counter[ingredient._id] = 0;
			counter[ingredient._id]++;
		});

		if (constructorBun) counter[constructorBun._id] = 2;

		return counter;
	}, [constructorIngredients, constructorBun]);

    const ingredientsArr = ingredients.map(ingredient => {
        if (ingredient.type === type) {
            return (
                <BurgerIngredientsItem 
                    key={ingredient._id} 
                    ingredient={ingredient} 
                    count={counters[ingredient._id]}
                    onIngredientClick={onIngredientClick}
                />
            )
        }
    })

    return (
        <div id={type} className={`${s.type_wrapper} pt-10`}>
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