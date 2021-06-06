import React from 'react';
import PropTypes from 'prop-types';

import BurgerIngredientsItem from './Burger-ingredients-item';

import s from './Burger-ingredients.module.sass';

const BurgetTypeTable = ({ title, ingredients, type, openModal }) => {
    return (
        <div className={`${s.type_wrapper} pt-10`}>
            <h3 className="text text_type_main-medium mb-6">{title}</h3>
            <div className={s.ingredients_type_wrapper}>
                {ingredients.map(item => {
                    if (item.type === type) {
                        return (
                            <BurgerIngredientsItem 
                                key={item._id} 
                                item={item} 
                                count={item._id === ingredients[0]._id ? 1 : false}
                                openModal={(_id) => openModal(_id)}
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}

BurgetTypeTable.propTypes = {
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

export default BurgetTypeTable;