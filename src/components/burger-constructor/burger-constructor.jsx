import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, ConstructorElement, DragIcon, Button  } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './burger-constructor.module.sass';

const BurgerConstructor = ({ data, handleOrderClick }) => {
    return (
        <section className={`${s.section_container} pt-25`}>
           <div className={`pt-4 pr-4`}>
               <div className={`pl-8 mb-4`}>
                   <ConstructorElement 
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i"
                        price={1255}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                   />
               </div>
               <div className={`${s.wrapper_inner} mb-4`}>
                   {data.map(item => {
                       if (item.type !== 'bun') {
                           return (
                                <div key={item._id} className={`${s.constructor_item}`}>
                                    <div className={s.drag_icon}>
                                        <DragIcon />
                                    </div>
                                    <ConstructorElement 
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </div>
                           )
                       }
                   })}
               </div>
               <div className={`pl-8 pr-4`}>
                   <ConstructorElement 
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i"
                        price={1255}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                   />
               </div>
           </div>
           <div className={`${s.constructor_footer}`}>
                <div className={`${s.total_wrapper} mr-10`}>
                    <span className="text text_type_digits-medium">610</span>
                    <CurrencyIcon />
                </div>
                <div onClick={handleOrderClick}>
                    <Button type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
           </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
       name: PropTypes.string.isRequired,
       type: PropTypes.string.isRequired,
       proteins: PropTypes.number,
       fat: PropTypes.number,
       carbohydrates: PropTypes.number,
       calories: PropTypes.number,
       price: PropTypes.number,
       image: PropTypes.string.isRequired,
       image_mobile: PropTypes.string.isRequired,
       image_large: PropTypes.string.isRequired,
       __v: PropTypes.number
    })),
    handleOrderClick: PropTypes.func.isRequired
}

export default BurgerConstructor;