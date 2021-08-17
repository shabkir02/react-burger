import React, { useEffect, useCallback } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import OrderInfo from '../../components/order-info/order-info';
import { SET_CURRENT_ORDER_INFO, GET_ALL_ORDERS_SUCCESS } from '../../services/actions';
import { useSocket } from '../../hooks/useSocket';

import s from './order-info-page.module.sass';

const OrderInfoPage = () => {

    const params = useParams();
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const { ingredients, allOrders } = useSelector(store => ({
        ingredients: store.ingredients.ingredients,
        allOrders: store.order.allOrders
    }))

    console.log(params);
    console.log(match);

    const processEventAllOrders = useCallback((event) => {
        const normalizedMessage = JSON.parse(event.data);
        if (normalizedMessage.success === true) {
            dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: normalizedMessage })
        }
    }, [dispatch])
  
    const allOrdersSocket = useSocket('wss://norma.nomoreparties.space/orders/all', {
        onMessage: processEventAllOrders
    });
  
    useEffect(() => {
        allOrdersSocket.connect()
    }, [])

    useEffect(() => {
        if (ingredients && allOrders) {
            const currentOrder = allOrders.orders.find(order => order._id === params.id);

            const ingredientsArr = currentOrder.ingredients.map(ingredientId => {
                return ingredients.find(item => item._id === ingredientId)
            })

            dispatch({ type: SET_CURRENT_ORDER_INFO, payload: { order: currentOrder,  ingredientsArr} });
        }
    }, [allOrders, ingredients])

    return (
        <div className={s.order_wrapper}>
            <OrderInfo />
        </div>
    )
}

export default OrderInfoPage;