import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from '../../hooks/hooks';

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

    const { allOrders, ingredients, wsAllOrdersConnect } = useSelector(store => ({
        allOrders: store.wsOrders.allOrders,
        wsAllOrdersConnect: store.wsOrders.wsAllOrdersConnect,
        ingredients: store.ingredients.ingredients
    }))
    
    const formOrdersStatusArr = (status: 'done' | 'created' | 'pending'):  Array<TOrder> | null => {
        if (!allOrders) {
            return null
        }

        const filterArr: Array<TOrder> = allOrders?.orders.filter((order: TOrder) => order.status === status);

        if (filterArr.length > 10) {
            return filterArr.slice(0, 10)
        } else {
            return filterArr
        }
    }

    const pendingOrdersArr = formOrdersStatusArr('pending')
    const doneOrdersArr = formOrdersStatusArr('done')

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
            {!wsAllOrdersConnect && (
                <p className="text text_type_main-large mb-10 dark_gray">Что-то пошло не так! :(</p>
            )}
            {allOrders && ingredients && wsAllOrdersConnect && (
                <div className={s.container_wrapper}>
                    <div className={s.orders_wrapper}>
                        {allOrdersContent}
                    </div>
                    <div className={s.details_wrapper}>
                        <div className={`${s.details_column} mb-15`}>
                            <div>
                                <h4 className="text text_type_main-medium mb-6">Готовы:</h4>
                                <div className={s.orders_status_column}>
                                    {doneOrdersArr?.map((order: TOrder) => (
                                        <p key={order._id} className="text text_type_digits-default mb-2 blue">{order.number}</p>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text text_type_main-medium mb-6">В работе:</h4>
                                <div className={s.orders_status_column}>
                                    {pendingOrdersArr?.map((order: TOrder) => (
                                        <p key={order._id} className="text text_type_digits-default mb-2">{order.number}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
                        <p className={`${s.order_done_text} text text_type_digits-medium text_shadow`}>{allOrders.total.toLocaleString('ru-RU')}</p>
                        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
                        <p className={`${s.order_done_text} text text_type_digits-medium text_shadow`}>{allOrders.totalToday.toLocaleString('ru-RU')}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FeedPage;