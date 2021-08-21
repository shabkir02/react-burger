import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import OrderItem from '../../components/order-item/order-item';
import { WS_USER_ORDERS_CONNECTION_START } from '../../services/actions';

import s from './orders-page.module.sass';

const OrdersPage = ({ handleOrderInfoClick }) => {

    const dispatch = useDispatch();
    const { userOrders } = useSelector(store => ({
        userOrders: store.wsOrders.userOrders,
    }))
  
    useEffect(() => {
        dispatch({ type: WS_USER_ORDERS_CONNECTION_START });
    }, [])

    return (
        <div className={`${s.container_orders} pt-12`}> 
            <div className={s.container_orders_wrapper}>
                {userOrders && userOrders?.orders?.map(order => (
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