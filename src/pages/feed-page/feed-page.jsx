import React from 'react';
import PropTypes from 'prop-types';

import OrderItem from '../../components/order-item/order-item';

import s from './feed-page.module.sass';

const FeedPage = ({ handleOrderInfoClick }) => {

    return (
        <div className={`${s.container} pt-10`} >
            <h2 className="text text_type_main-large mb-10">Лента заказов</h2>
            <div className={s.container_wrapper}>
                <div className={s.orders_wrapper}>
                    <OrderItem onOrderClick={handleOrderInfoClick} />
                </div>
                <div className={s.details_wrapper}>
                    <div className={`${s.details_column} mb-15`}>
                        <div>
                            <h4 className="text text_type_main-medium mb-6">Готовы:</h4>
                            <p className="text text_type_digits-default mb-2 blue">034533</p>
                        </div>
                        <div>
                            <h4 className="text text_type_main-medium mb-6">В работе:</h4>
                            <p className="text text_type_digits-default mb-2">034533</p>
                            <p className="text text_type_digits-default mb-2">034533</p>
                            <p className="text text_type_digits-default mb-2">034533</p>
                        </div>
                    </div>
                    <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
                    <p className="text text_type_digits-large mb-15 text_shadow">28 752</p>
                    <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
                    <p className="text text_type_digits-large text_shadow">138</p>
                </div>
            </div>
        </div>
    )
}

FeedPage.propTypes = {
    handleOrderInfoClick: PropTypes.func.isRequired
}

export default FeedPage;