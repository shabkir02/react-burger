import React from 'react';
import { CurrencyIcon, ConstructorElement, LockIcon, DeleteIcon, DragIcon, Button  } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './Burger-constructor.module.sass';

const BurgerConstructor = ({ data }) => {
    return (
        <section className={`${s.section_container} pt-25`}>
           <div className={`pt-4 pr-4`}>
               <div className={`pl-8 mb-4 pr-4`}>
                   <ConstructorElement 
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i"
                        price={1255}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                   />
               </div>
               <div className={`${s.wrapper_inner}`}>
                   <div className={`${s.constructor_item}`}>
                        <div className={s.drag_icon}>
                            <DragIcon />
                        </div>
                        <ConstructorElement 
                            text="Соус традиционный галактический"
                            price={15}
                            thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"
                        />
                   </div>
                   <div className={`${s.constructor_item}`}>
                        <div className={s.drag_icon}>
                            <DragIcon />
                        </div>
                        <ConstructorElement 
                            isLocked={true}
                            text="Мясо бессмертных моллюсков Protostomia"
                            price={1337}
                            thumbnail="https://code.s3.yandex.net/react/code/meat-02.png"
                        />
                   </div>
                   <div className={`${s.constructor_item}`}>
                        <div className={s.drag_icon}>
                            <DragIcon />
                        </div>
                        <ConstructorElement 
                            isLocked={true}
                            text="Краторная булка N-200i"
                            price={1255}
                            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                        />
                   </div>
               </div>
               <div className={`pl-8 mt-4 pr-4`}>
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
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
           </div>
        </section>
    )
}

export default BurgerConstructor;