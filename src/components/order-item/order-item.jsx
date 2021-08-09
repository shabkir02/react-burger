import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import data from '../../utils/data';

import s from './order-item.module.sass';

const OrderItem = ({ onOrderClick }) => {

    return (
        <div
            className={`${s.container_orders_item} mb-6 p-6`}
            onClick={() => onOrderClick(data[0])}
        >
            <div className={`${s.order_header} mb-6`}>
                <p className="text text_type_digits-default">#034535</p>
                <p className="text text_type_main-small">Сегодня, 16:20 i-GMT+3</p>
            </div>
            <h4 className="text text_type_main-medium mb-2">Death Star Starship Main бургер</h4>
            <p className="text text_type_main-small">Создан</p>
            <div className={`${s.container_orders_item_footer} mt-6`}>
                <div className={s.container_orders_item_ingredients}>
                    <div className={s.container_orders_item_ingredient}>
                        <img src={data[0].image} alt={data[0].name} />
                    </div>
                    <div className={s.container_orders_item_ingredient}>
                        <img src={data[0].image} alt={data[0].name} />
                    </div>
                    <div className={s.container_orders_item_ingredient}>
                        <img src={data[0].image} alt={data[0].name} />
                    </div>
                </div>
                <div className={`${s.container_orders_item_total}`}>
                    <span className="text text_type_digits-default mr-2">123</span>
                    <CurrencyIcon/>
                </div>
            </div>
        </div>
    )
}

OrderItem.propTypes = {
    onOrderClick: PropTypes.func.isRequired
}

export default OrderItem;