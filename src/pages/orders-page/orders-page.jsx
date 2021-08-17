import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import OrderItem from '../../components/order-item/order-item';
import { useSocket } from '../../hooks/useSocket';
import { GET_USER_ORDERS_SUCCESS } from '../../services/actions';
import { getCookie } from '../../utils/cookies';

import s from './orders-page.module.sass';

const OrdersPage = ({ handleOrderInfoClick }) => {

    const dispatch = useDispatch();
    const { userOrders } = useSelector(store => ({
        userOrders: store.user.userOrders
    }))

    const processEvent = useCallback((event) => {
        const normalizedMessage = JSON.parse(event.data);
        if (normalizedMessage.success === true) {
            dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: normalizedMessage })
        }
    }, [dispatch])
  
    const { connect } = useSocket('wss://norma.nomoreparties.space/orders', {
        onMessage: processEvent
    });
  
    useEffect(() => {
        connect(getCookie('accessToken'))
    }, [])

    return (
        <div className={`${s.container_orders} pt-12`}> 
            <div className={s.container_orders_wrapper}>
                {userOrders && userOrders.orders.map(order => (
                    <OrderItem 
                        onOrderClick={handleOrderInfoClick} 
                        orderInfo={order}
                        key={order._id}
                    />
                ))}
            </div>
        </div> 
    )
}

OrdersPage.propTypes = {
    handleOrderInfoClick: PropTypes.func.isRequired
}

export default OrdersPage;