import React, { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import s from './order-item.module.sass';

const OrderItem = ({ onOrderClick, orderInfo }) => {

    const location = useLocation();
    const { path } = useRouteMatch();

    const { createdAt, ingredients, name, number, _id } = orderInfo;

    const { ingredientsStore } = useSelector(store => ({
        ingredientsStore: store.ingredients.ingredients
    }))

    const ingredientsFull = useMemo(() => {
        return ingredients.map(ingredientId => {
            return ingredientsStore.find(item => item._id === ingredientId)
        })
    }, [ingredients, ingredientsStore])

    const orderPrice = useMemo(() => {
        return ingredientsFull.reduce((acc, curr) => {
            return acc + curr.price
        }, 0)
    }, [ingredientsFull]);

    const ingredientsImageArr = useMemo(() => {
        const visibleArr = ingredientsFull.slice(0, 5);
        const hiddenArr = ingredientsFull.slice(5);

        return [visibleArr, hiddenArr]
    }, [ingredientsFull])

    const statusText = useMemo(() => {
        if (orderInfo) {
            switch(orderInfo.status) {
                case 'created':
                    return "Создан"
                case 'pending':
                    return "В работе"
                case 'done':
                    return 'Выполнен'
                default:
                    return ''
            }
        }
    }, [orderInfo])

    return (
        <Link
            to={{
                pathname: `${location.pathname}/${_id}`,
                state: { background: location }
            }}
            onClick={() => onOrderClick(orderInfo, ingredientsFull)}
            className={s.container_orders_item_wrapper}
        >
            <div className={`${s.container_orders_item} mb-6 p-6`}>
                <div className={`${s.order_header} mb-6`}>
                    <p className="text text_type_digits-default">#{number}</p>
                    <p className="text text_type_main-small dark_gray">{createdAt}</p>
                </div>
                <h4 className="text text_type_main-medium mb-2">{name}</h4>
                {path === "/profile/orders" && (
                    <p className={`text text_type_main-small ${orderInfo.status === 'done' ? 'blue' : ''}`}>{statusText}</p>
                )}
                <div className={`${s.container_orders_item_footer} mt-6`}>
                    <div className={s.container_orders_item_ingredients}>
                        {ingredientsImageArr[0].map((item, index) => (
                            <div 
                                className={s.container_orders_item_ingredient}
                                key={index}
                                style={{ 
                                    transform: `translateX(-${index * 15}px)`,
                                    zIndex: 6 - index
                                }}
                            >
                                <img src={item.image} alt={item.name} />
                            </div>
                        ))}
                        {ingredientsImageArr[1].length > 0 && (
                            <div 
                                className={s.container_orders_item_ingredient}
                                style={{ 
                                    transform: `translateX(-75px)`,
                                    zIndex: 1
                                }}
                            >
                                <img src={ingredientsImageArr[0][0].image} alt={ingredientsImageArr[0][0].name} />
                                <div className={`${s.container_orders_item_ingredient_length} text text_type_main-default`}>
                                    +{ingredientsImageArr[1].length}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`${s.container_orders_item_total}`}>
                        <span className="text text_type_digits-default mr-2">{orderPrice.toLocaleString('ru-RU')}</span>
                        <CurrencyIcon/>
                    </div>
                </div>
            </div>
        </Link>
    )
}

OrderItem.propTypes = {
    onOrderClick: PropTypes.func.isRequired
}

export default OrderItem;