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
            data-test="ingredient"
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

export default BurgerIngredientsItem;