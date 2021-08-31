import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentIngredient } from '../../services/actions/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import s from './ingredient-item-page.module.sass';

const IngredientItemPage = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { ingredients, currentIngredient } = useSelector(store => ({
        ingredients: store.ingredients.ingredients,
        currentIngredient: store.modal.currentIngredient
    }));

    useEffect(() => {
        if (ingredients) {
            const ingredient = ingredients.find(item => item._id === id)
            dispatch(setCurrentIngredient(ingredient));
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