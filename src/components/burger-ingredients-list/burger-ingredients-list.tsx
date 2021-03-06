import { useMemo } from 'react';
import { useSelector } from '../../hooks/hooks';

import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import s from './burger-ingredients-list.module.sass';
import { TIngredient, TIngredientsCategoryTitle, TIngredientsCategoryType } from '../../services/types/data';

interface IBurgerIngredientsListProps {
    title: TIngredientsCategoryTitle;
    type: TIngredientsCategoryType;
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

    const ingredientsArr = ingredients?.map((ingredient: TIngredient) => {
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

export default BurgerIngredientsList;