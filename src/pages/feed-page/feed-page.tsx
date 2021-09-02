import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from '../../hooks/hooks';

import OrderItem from '../../components/order-item/order-item';

import s from './feed-page.module.sass';
import { TOrder, TIngredient } from '../../services/types/data';

interface IFeedPageProps {
    handleOrderInfoClick: (
        order: TOrder, 
        ingredientsArr: ReadonlyArray<TIngredient>
    ) => void
}

const FeedPage = ({ handleOrderInfoClick }: IFeedPageProps) => {

    const { allOrders, ingredients } = useSelector(store => ({
        allOrders: store.wsOrders.allOrders,
        ingredients: store.ingredients.ingredients
    }))
    // const dispatch = useDispatch();

    const formOrdersStatusArr = (status: 'done' | 'created' | 'pending') => {
        const filterArr = allOrders.orders.filter((order: TOrder) => order.status === status);

        if (filterArr.length > 10) {
            return filterArr.slice(0, 10)
        } else {
            return filterArr
        }
    }

    const pendingOrdersArr = allOrders ? formOrdersStatusArr('pending') : null
    const doneOrdersArr = allOrders ? formOrdersStatusArr('done') : null

    const allOrdersContent = useMemo(() => {
        if (allOrders && ingredients) {
            return allOrders.orders.map((order: TOrder) => {
                if (order && order.ingredients) {
                    return (
                        <OrderItem 
                            orderInfo={order} 
                            onOrderClick={handleOrderInfoClick} 
                            key={order._id}
                        />
                    )
                }
            })
        }
    }, [allOrders, handleOrderInfoClick, ingredients])

    return (
        <div className={`${s.container} pt-10`} >
            <h2 className="text text_type_main-large mb-10">Лента заказов</h2>
            {allOrders && ingredients && (
                <div className={s.container_wrapper}>
                    <div className={s.orders_wrapper}>
                        {allOrdersContent}
                    </div>
                    <div className={s.details_wrapper}>
                        <div className={`${s.details_column} mb-15`}>
                            <div>
                                <h4 className="text text_type_main-medium mb-6">Готовы:</h4>
                                <div className={s.orders_status_column}>
                                    {doneOrdersArr.map((order: TOrder) => (
                                        <p key={order._id} className="text text_type_digits-default mb-2 blue">{order.number}</p>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text text_type_main-medium mb-6">В работе:</h4>
                                <div className={s.orders_status_column}>
                                    {pendingOrdersArr.map((order: TOrder) => (
                                        <p key={order._id} className="text text_type_digits-default mb-2">{order.number}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
                        <p className="text text_type_digits-large mb-15 text_shadow">{allOrders.total.toLocaleString('ru-RU')}</p>
                        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
                        <p className="text text_type_digits-large text_shadow">{allOrders.totalToday.toLocaleString('ru-RU')}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

FeedPage.propTypes = {
    handleOrderInfoClick: PropTypes.func.isRequired
}

export default FeedPage;