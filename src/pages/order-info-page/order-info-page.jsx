import React from 'react';

import OrderInfo from '../../components/order-info/order-info';

import s from './order-details-page.module.sass';

const OrderInfoPage = () => {

    return (
        <div className={s.order_wrapper}>
            <OrderInfo />
        </div>
    )
}

export default OrderInfoPage;