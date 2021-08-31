import React, { useEffect, useCallback } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import OrderInfo from '../../components/order-info/order-info';
import { setCurrentOrderInfo, WS_USER_ORDERS_CONNECTION_START } from '../../services/actions';

import s from './order-info-page.module.sass';

const OrderInfoPage = () => {
    const params = useParams();
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    const { ingredients, allOrders, userOrders, currentOrderInfo } = useSelector(store => ({
        ingredients: store.ingredients.ingredients,
        allOrders: store.wsOrders.allOrders,
        userOrders: store.wsOrders.userOrders,
        currentOrderInfo: store.modal.currentOrderInfo
    }))

    useEffect(() => {
        if (path === '/profile/orders/:id') {
            dispatch({ type: WS_USER_ORDERS_CONNECTION_START })
        }
    }, [])

    const dispatchCurrentOrder = (ordersArr) => {
        const currentOrder = ordersArr.orders.find(order => order._id === params.id);

        const ingredientsArr = currentOrder.ingredients.map(ingredientId => {
            return ingredients.find(item => item._id === ingredientId)
        })

        dispatch(setCurrentOrderInfo({ order: currentOrder,  ingredientsArr}));
    }

    useEffect(() => {
        if (ingredients && allOrders && path === '/feed/:id') {
            dispatchCurrentOrder(allOrders)
        }
        if (ingredients && userOrders && path === '/profile/orders/:id') {
            dispatchCurrentOrder(userOrders)
        }
    }, [allOrders, ingredients, userOrders])
    
    return (
        <div className={s.order_wrapper}>
            {currentOrderInfo && <h3 className={`${s.title} text text_type_digits-medium`}>#{currentOrderInfo.order.number}</h3>}
            <OrderInfo />
        </div>
    )
}

export default OrderInfoPage;