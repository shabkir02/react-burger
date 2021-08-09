import Reacr from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './order-info.module.sass';
import data from '../../utils/data';

const OrderInfo = () => {

    return (
        <div className='mt-4'>
            <h4 className="text text_type_main-medium mb-2" >Black Hole Singularity острый бургер</h4>
            <p className="text text_type_main-default mb-15 blue" >Выполнен</p>
            <p className="text text_type_main-medium mb-6" >Состав:</p>
            <div className={`${s.order_info_wrapper} pr-6`}>
                <div className={`${s.order_info_item}`}>
                    <div className={`${s.order_info_icon} mr-4`}>
                        <img className={s.order_info_image} src={data[0].image} alt={data[0].name} />
                    </div>
                    <p className={`${s.order_info_title} text text_type_main-default`} >Флюоресцентная булка R2-D3</p>
                    <p className="text text_type_digits-default mr-2" >2 x 20</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={`${s.order_info_item}`}>
                    <div className={`${s.order_info_icon} mr-4`}>
                        <img className={s.order_info_image} src={data[0].image} alt={data[0].name} />
                    </div>
                    <p className={`${s.order_info_title} text text_type_main-default`} >Флюоресцентная булка R2-D3</p>
                    <p className="text text_type_digits-default mr-2" >2 x 20</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={`${s.order_info_item}`}>
                    <div className={`${s.order_info_icon} mr-4`}>
                        <img className={s.order_info_image} src={data[0].image} alt={data[0].name} />
                    </div>
                    <p className={`${s.order_info_title} text text_type_main-default`} >Флюоресцентная булка R2-D3</p>
                    <p className="text text_type_digits-default mr-2" >2 x 20</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={`${s.order_info_item}`}>
                    <div className={`${s.order_info_icon} mr-4`}>
                        <img className={s.order_info_image} src={data[0].image} alt={data[0].name} />
                    </div>
                    <p className={`${s.order_info_title} text text_type_main-default`} >Флюоресцентная булка R2-D3</p>
                    <p className="text text_type_digits-default mr-2" >2 x 20</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OrderInfo;