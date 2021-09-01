import React, { useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import OrderInfo from '../../components/order-info/order-info';
import { WS_USER_ORDERS_CONNECTION_START } from '../../services/actions';
import { setCurrentOrderInfo } from '../../services/actions/modal';

import s from './order-info-page.module.sass';
import { TIngredient, TOrder } from '../../services/types/data';

const OrderInfoPage = () => {
    const params = useParams<{id: string}>();
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

    const dispatchCurrentOrder = (ordersArr: any) => {
        const currentOrder = ordersArr.orders.find((order: TOrder) => order._id === params.id);

        const ingredientsArr = currentOrder.ingredients.map((ingredientId: string) => {
            return ingredients.find((item: TIngredient) => item._id === ingredientId)
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