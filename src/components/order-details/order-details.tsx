import React from 'react';
import { useSelector } from '../../hooks/hooks';

import s from './order-details.module.sass';

import background from '../../images/order-detail.svg';
import accept from '../../images/stroke.svg';

const OrderDetails = () => {

    const order = useSelector(store => store.order.order);

    return (
        <div className={`pt-20 pb-20`}>
            <p className={`${s.count} text text_type_digits-large mb-8`}>{order?.number}</p>
            <h4 className={`${s.count_descr} text text_type_main-medium mb-15`}>идентификатор заказа</h4>
            <div className={`${s.image_wrapper} mb-15`}>
                <img className={s.accept} src={accept} alt="accept" /> 
                <img className={s.background} src={background} alt="background" />
            </div>
            <p className={`${s.footer_title} text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
            <p className={`${s.footer_descr} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;