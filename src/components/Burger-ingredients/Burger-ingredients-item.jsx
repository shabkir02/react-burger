import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './burger-ingredients.module.sass';


const BurgerIngredientsItem = ({ item, count, onIngredientClick }) => {

    const { name, price, image } = item;

    return (
        <div onClick={() => onIngredientClick(item)} className={`${s.ingredient_item}`}>
            <div className={`${s.header_item} pl-4 pb-1 pr-4`}>
                {count && (
                    <div className={s.ingredient_counter}>
                        <Counter count={count} size="default" />
                    </div>
                )}
                <img className="mb-1" src={image} alt={name} />
                <div className={`${s.price_wrapper} mb-1`}>
                    <span className="text text_type_digits-default">{price}</span>
                    <CurrencyIcon/>
                </div>
            </div>
            <h3 className={`${s.ingredient_name} text text_type_main-default`}>{name}</h3>
        </div>
    )
}

BurgerIngredientsItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
       name: PropTypes.string.isRequired,
       type: PropTypes.string.isRequired,
       proteins: PropTypes.number,
       fat: PropTypes.number,
       carbohydrates: PropTypes.number,
       calories: PropTypes.number,
       price: PropTypes.number.isRequired,
       image: PropTypes.string.isRequired,
       image_mobile: PropTypes.string.isRequired,
       image_large: PropTypes.string.isRequired,
       __v: PropTypes.number
    }),
    count: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool
      ])
}

export default BurgerIngredientsItem;