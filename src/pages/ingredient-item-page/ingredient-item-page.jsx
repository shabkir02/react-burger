import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getIngredients, SET_CURRENT_INGREDIENT } from '../../services/actions';
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
        dispatch(getIngredients())
    }, [dispatch])

    useEffect(() => {
        if (ingredients) {
            const ingredient = ingredients.find(item => item._id === id)
            dispatch({ type: SET_CURRENT_INGREDIENT, payload: ingredient });
        }
    }, [ingredients, id, dispatch])

    console.log(currentIngredient);

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