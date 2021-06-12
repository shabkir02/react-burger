import React from 'react';
import PropTypes from 'prop-types';

import BurgerIngredientsItem from './burger-ingredients-item';

import s from './burger-ingredients.module.sass';

const BurgerIngredientsList = ({ title, ingredients, type, onIngredientClick }) => {

    const ingredientsArr = ingredients.map(item => {
        if (item.type === type) {
            return (
                <BurgerIngredientsItem 
                    key={item._id} 
                    item={item} 
                    count={item._id === ingredients[0]._id ? 1 : null}
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
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
       name: PropTypes.string.isRequired,
       type: PropTypes.string.isRequired,
       proteins: PropTypes.number.isRequired,
       fat: PropTypes.number.isRequired,
       carbohydrates: PropTypes.number.isRequired,
       calories: PropTypes.number.isRequired,
       price: PropTypes.number.isRequired,
       image: PropTypes.string.isRequired,
       image_mobile: PropTypes.string.isRequired,
       image_large: PropTypes.string.isRequired,
       __v: PropTypes.number.isRequired
    })),
    type: PropTypes.oneOf(['bun', 'sauce', 'main'])
}

export default BurgerIngredientsList;