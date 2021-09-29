import { useRef } from 'react';
import { useDispatch } from '../../hooks/hooks';
import {  ConstructorElement, DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

import { deleteIngredientFromConstructor, moveIngredientInConstructor } from '../../services/actions/ingredients/ingredients';

import s from './burger-constructor-item.module.sass';

import { TIngredientConstructor } from '../../services/types/data';

interface IBurgerConstructorItemProps {
    ingredient: TIngredientConstructor;
    index: number;
}

const BurgerConstructorItem = ({ ingredient, index }: IBurgerConstructorItemProps) => {

    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const deleteIngredient = (ingredient: TIngredientConstructor): void => {
        dispatch(deleteIngredientFromConstructor(ingredient))
    }

    const [, drop] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        hover(item: { index: number }, monitor) {
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
            if (clientOffset) {
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;

                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                dispatch(moveIngredientInConstructor({hoverIndex, dragIndex}))
                item.index = hoverIndex;
            }
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
            className={`${s.constructor_item} ${isDragging ? s.active : ''} show_item`} 
            data-test="constructor-ingredient"
        >
            <div className={s.drag_icon}>
                <DragIcon type="secondary" />
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

export default BurgerConstructorItem;