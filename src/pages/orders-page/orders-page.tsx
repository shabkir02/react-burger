import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import OrderItem from '../../components/order-item/order-item';
import { WS_USER_ORDERS_CONNECTION_START } from '../../services/actions';

import s from './orders-page.module.sass';
import { TOrder, TIngredient } from '../../services/types/data';

interface IOrdersPageProps {
    handleOrderInfoClick: (
        order: TOrder, 
        ingredientsArr: ReadonlyArray<TIngredient>
    ) => void
}

const OrdersPage = ({ handleOrderInfoClick }: IOrdersPageProps) => {

    const dispatch = useDispatch();
    const { userOrders } = useSelector(store => ({
        userOrders: store.wsOrders.userOrders,
    }))
  
    useEffect(() => {
        dispatch({ type: WS_USER_ORDERS_CONNECTION_START });
    }, [])

    const ordersContetnt = useMemo(() => {
        if (userOrders && userOrders.orders) {
            return userOrders.orders.map((order: TOrder) => {
                if (order && order.ingredients) {
                    return (
                        <OrderItem 
                            onOrderClick={handleOrderInfoClick} 
                            orderInfo={order}
                            key={order._id}
                        />
                    )
                }
            })
        }
    }, [userOrders, handleOrderInfoClick])

    return (
        <div className={`${s.container_orders} pt-12`}> 
            <div className={s.container_orders_wrapper}>
                {ordersContetnt}
            </div>
        </div> 
    )
}

OrdersPage.propTypes = {
    handleOrderInfoClick: PropTypes.func.isRequired
}

export default OrdersPage;