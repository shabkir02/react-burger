import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import s from './burger-ingredients-item.module.sass';

import { TIngredient } from '../../services/types/data';

interface IBurgerIngredientsItemProps {
    ingredient: TIngredient;
    count: number;
    onIngredientClick: (
        ingredient: TIngredient
    ) => void
}

const BurgerIngredientsItem = ({ ingredient, count, onIngredientClick }: IBurgerIngredientsItemProps) => {

    const location = useLocation();

    const { name, price, image, _id } = ingredient;

    const [, ingredientRef] = useDrag({
        type: 'constructor',
        item: ingredient,
        // collect: monitor => ({
        //     isDrag: monitor.isDragging()
        // })
    })


    return (
        <Link 
            to={{
                pathname: `/ingredients/${_id}`,
                state: { background: location }
            }}
            onClick={() => onIngredientClick(ingredient)} 
            className={`${s.ingredient_item}`}
            ref={ingredientRef}
        >
            <div className={`${s.header_item} pl-4 pb-1 pr-4`}>
                {count && (
                    <div className={s.ingredient_counter}>
                        <Counter count={count} size="default" />
                    </div>
                )}
                <img className="mb-1" src={image} alt={name} />
                <div className={`${s.price_wrapper} mb-1`}>
                    <span className="text text_type_digits-default">{price}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
            <h3 className={`${s.ingredient_name} text text_type_main-default`}>{name}</h3>
        </Link>
    )
}

BurgerIngredientsItem.propTypes = {
    ingredient: PropTypes.shape({
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
        PropTypes.oneOf([null]).isRequired
    ]),
    onIngredientClick: PropTypes.func.isRequired
}

export default BurgerIngredientsItem;