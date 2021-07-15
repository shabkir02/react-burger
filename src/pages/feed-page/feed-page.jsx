import React from 'react';

import s from './feed-page.module.sass';

const FeedPage = () => {

    return (
        <div className={s.container} >
            <div className={s.container_nav}>
                <p className={`${s.container_nav_item} text text_type_main-medium`}>Профиль</p>
                <p className={`${s.container_nav_item} text text_type_main-medium`}>История заказов</p>
                <p className={`${s.container_nav_item} text text_type_main-medium`}>Выход</p>

                <p className={`${s.container_nav_descr} text text_type_main-default mt-20`}>В этом разделе вы можете просмотреть свою историю заказов</p>
            </div>
            <div className={s.container_orders}> 
                <div className={`${s.container_orders_item} mb-6 p-6`}>
                    <div className={`${s.order_header} mb-6`}>
                        <p className="text text_type_digits-default">#034535</p>
                        <p className="text text_type_main-small">Сегодня, 16:20 i-GMT+3</p>
                    </div>
                    <h4 className="text text_type_main-medium mb-2">Death Star Starship Main бургер</h4>
                    <p className="text text_type_main-small">Создан</p>
                </div>
            </div>
        </div>
    )
}

export default FeedPage;