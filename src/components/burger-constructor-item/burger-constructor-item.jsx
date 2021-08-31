import React, { useRef } from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import {  ConstructorElement, DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredientFromConstructor, moveIngredientInConstructor } from '../../services/actions';
import { useDrag, useDrop } from 'react-dnd';

import s from './burger-constructor-item.module.sass';

const BurgerConstructorItem = ({ ingredient, index }) => {

    const dispatch = useDispatch();
    const ref = useRef(null);

    const deleteIngredient = (ingredient) => {
        dispatch(deleteIngredientFromConstructor(ingredient))
    }

    const [, drop] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            dispatch(moveIngredientInConstructor({hoverIndex, dragIndex}))
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'ingredient',
        item: () => {
            return { index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div 
            ref={ref} 
            className={`${s.constructor_item} ${isDragging ? s.active : ''}`} 
        >
            <div className={s.drag_icon}>
                <DragIcon />
            </div>
            <ConstructorElement 
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => deleteIngredient(ingredient)}
            />
        </div>
    )
}

BurgerConstructorItem.propTypes = {
    ingredient: PropTypes.shape({
        _id: PropTypes.string.isRequired,
       name: PropTypes.string.isRequired,
       drag_id: PropTypes.string,
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
    }).isRequired,
    index: PropTypes.number.isRequired
}

export default BurgerConstructorItem;