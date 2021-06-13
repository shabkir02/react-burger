import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, ConstructorElement, DragIcon, Button  } from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientsContext } from '../../services/ingredientsContext';

import s from './burger-constructor.module.sass';

const BurgerConstructor = ({ handleOrderClick }) => {

    const { ingredients } = useContext(IngredientsContext)

    const bun = ingredients.filter(ingredient => ingredient.type === 'bun')[0];
    const otherIngredients = ingredients.filter(ingredient => ingredient.type !== 'bun');

    const finalIngredients = [...otherIngredients, bun, bun];

    const totalPrice = finalIngredients.reduce((accumulator, currentValue) => {
        console.log(accumulator);
        return accumulator + currentValue.price
    }, 0)

    return (
        <section className={`${s.section_container} pt-25`}>
           <div className={`pt-4 pr-4`}>
               <div className={`pl-8 mb-4`}>
                   <ConstructorElement 
                        type="top"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                   />
               </div>
               <div className={`${s.wrapper_inner} mb-4`}>
                   {otherIngredients.map(ingredient => (
                        <div key={ingredient._id} className={`${s.constructor_item}`}>
                            <div className={s.drag_icon}>
                                <DragIcon />
                            </div>
                            <ConstructorElement 
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </div>
                   ))}
               </div>
               <div className={`pl-8 pr-4`}>
                   <ConstructorElement 
                        type="bottom"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                   />
               </div>
           </div>
           <div className={`${s.constructor_footer}`}>
                <div className={`${s.total_wrapper} mr-10`}>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon />
                </div>
                <div onClick={() => handleOrderClick(finalIngredients)}>
                    <Button type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
           </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    handleOrderClick: PropTypes.func.isRequired
}

export default BurgerConstructor;