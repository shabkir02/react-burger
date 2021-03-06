import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/hooks';

import { setCurrentIngredient } from '../../services/actions/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import s from './ingredient-item-page.module.sass';
import { TIngredient } from '../../services/types/data';

const IngredientItemPage = () => {

    const { id } = useParams<{id: string}>();
    const dispatch = useDispatch();

    const { ingredients, currentIngredient } = useSelector(store => ({
        ingredients: store.ingredients.ingredients,
        currentIngredient: store.modal.currentIngredient
    }));

    useEffect(() => {
        if (ingredients) {
            const ingredient = ingredients.find((item: TIngredient) => item._id === id)
            if (ingredient) {
                dispatch(setCurrentIngredient(ingredient));
            }
        }
    }, [ingredients, id, dispatch])

    return (
        <div className={s.ingredient_wrapper}>
            <h3 className={`${s.ingredient_title} text text_type_main-large`}>Детали ингредиента</h3>
            {currentIngredient && (
                <IngredientDetails />
            )}
        </div>
    )
}

export default IngredientItemPage;