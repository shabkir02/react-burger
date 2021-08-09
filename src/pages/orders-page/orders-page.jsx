import React from 'react';
import PropTypes from 'prop-types';

import OrderItem from '../../components/order-item/order-item';

import s from './orders-page.module.sass';

const OrdersPage = ({ handleOrderInfoClick }) => {

    return (
        <div className={`${s.container_orders} pt-12`}> 
            <div className={s.container_orders_wrapper}>
                <OrderItem onOrderClick={handleOrderInfoClick} />
            </div>
        </div> 
    )
}

OrdersPage.propTypes = {
    handleOrderInfoClick: PropTypes.func.isRequired
}

export default OrdersPage;