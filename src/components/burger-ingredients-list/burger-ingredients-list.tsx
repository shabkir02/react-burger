import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import s from './burger-ingredients-list.module.sass';
import { TIngredient } from '../../services/types/data';

interface IBurgerIngredientsListProps {
    title: 'Булки' | 'Соусы' | 'Начинки';
    type: 'bun' | 'sauce' | 'main';
    onIngredientClick: (
        item: TIngredient
    ) => void
}

interface ICounters {
    [name: string]: number; 
}

const BurgerIngredientsList = ({ title, type, onIngredientClick }: IBurgerIngredientsListProps) => {

    const { ingredients, constructorIngredients, constructorBun } = useSelector(store => ({
        ingredients: store.ingredients.ingredients,
        constructorIngredients: store.ingredients.constructorIngredients,
        constructorBun: store.ingredients.constructorBun
    }));

    const counters = useMemo(() => {
		const counter: ICounters = {};

		constructorIngredients.map((ingredient: TIngredient): void => {
			if (!counter[ingredient._id]) {
                counter[ingredient._id] = 0;
            }
			counter[ingredient._id]++;
		});

		if (constructorBun) {
            counter[constructorBun._id] = 2;
        }
		return counter;
	}, [constructorIngredients, constructorBun]);

    const ingredientsArr = ingredients.map((ingredient: TIngredient): any => {
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
        <div data-scroll-id={type} className={`${s.type_wrapper} pt-10`}>
            <h3 className="text text_type_main-medium mb-6">{title}</h3>
            <div className={s.ingredients_type_wrapper}>
                {ingredientsArr}
            </div>
        </div>
    )
}

BurgerIngredientsList.propTypes = {
    title: PropTypes.oneOf(['Булки', 'Соусы', 'Начинки']).isRequired,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
    onIngredientClick: PropTypes.func.isRequired
}

export default BurgerIngredientsList;