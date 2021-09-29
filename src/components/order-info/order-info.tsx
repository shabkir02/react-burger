import { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks/hooks';

import s from './order-info.module.sass';
import { TIngredient } from '../../services/types/data';

const OrderInfo = () => {

    const { currentOrderInfo } = useSelector(store => ({
        currentOrderInfo: store.modal.currentOrderInfo
    }))

    const statusText = useMemo(() => {
        if (currentOrderInfo) {
            switch(currentOrderInfo.order.status) {
                case 'created':
                    return "Создан"
                case 'pending':
                    return "В работе"
                case 'done':
                    return 'Выполнен'
                default:
                    return ''
            }
        }
    }, [currentOrderInfo])

    const orderPrice: number = useMemo(() => {
        if (currentOrderInfo) {
            return currentOrderInfo.ingredientsArr.reduce((acc: number, curr: TIngredient): number => {
                return acc + curr.price
            }, 0)
        } else {
            return 0
        }
    }, [currentOrderInfo]);

    return (
        <div className='mt-4'>
            {currentOrderInfo && (
                <>
                    <h4 className="text text_type_main-medium mb-4" >{currentOrderInfo.order.name}</h4>
                    <p className="text text_type_main-default mb-4 blue" >{statusText}</p>
                    <p className="text text_type_main-medium mb-6" >Состав:</p>
                    <div className={`${s.order_info_wrapper} pr-6 mb-10`}>
                        {currentOrderInfo.ingredientsArr.map((ingredient: TIngredient, index: number) => (
                            <div key={index} className={`${s.order_info_item}`}>
                                <div className={`${s.order_info_icon} mr-4`}>
                                    <img className={s.order_info_image} src={ingredient.image} alt={ingredient.name} />
                                </div>
                                <p className={`${s.order_info_title} text text_type_main-default`} >{ingredient.name}</p>
                                <p className="text text_type_digits-default mr-2" >{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        ))}
                    </div>
                    <div className={`${s.order_info_footer}`}>
                        <p className={`${s.order_info_time} text text_type_main-default dark_gray`}>
                            {currentOrderInfo.order.createdAt}
                        </p>
                        <p className="text text_type_digits-default mr-2">{orderPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </>
            )}
        </div>
    )
}

export default OrderInfo;