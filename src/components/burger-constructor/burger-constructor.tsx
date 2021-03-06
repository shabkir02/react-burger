import { useMemo } from 'react';
import { CurrencyIcon, ConstructorElement, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useHistory, useLocation } from 'react-router-dom';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { addBunToConstructor, addIngredientToConstructor } from '../../services/actions/ingredients/ingredients';

import { TIngredient, TIngredientConstructor } from '../../services/types/data';

import s from './burger-constructor.module.sass';

interface IBurgerConstructorProps {
    handleOrderClick: (
        location: object
    ) => void
}

const BurgerConstructor = ({ handleOrderClick }: IBurgerConstructorProps) => {

    const history = useHistory();
    const location = useLocation()

    const { constructorIngredients, constructorBun, user } = useSelector(store => ({
        constructorIngredients: store.ingredients.constructorIngredients,
        constructorBun: store.ingredients.constructorBun,
        user: store.user.user
    }));

    const dispatch = useDispatch();

    const makeOrder = (): void => {
        if (!user) {
            history.push({ pathname: '/login' })
            return
        }

        if (constructorBun && constructorIngredients.length > 0) {
            handleOrderClick(location)
        }
    }

    const [, dropContainer] = useDrop({
        accept: "constructor",
        drop(item: TIngredient) {
            if (item.type === 'bun') {
                dispatch(addBunToConstructor(item))
                return
            }
            dispatch(addIngredientToConstructor({...item, drag_id: uuidv4()}))
        }
    })

    const totalPrice: number = useMemo(() => {
        if (constructorBun || constructorIngredients.length > 0) {
            const totalPrice = constructorIngredients.reduce((acc: number, curr: TIngredientConstructor): number => {
                return acc + curr.price
            }, 0)
    
            return (totalPrice + (constructorBun ? constructorBun.price : 0) * 2)
        } else {
            return 0
        }
    }, [constructorIngredients, constructorBun])

    return (
        <section className={`${s.section_container} pt-25`}>
                <div 
                    className={`pt-4 pr-4`}
                    ref={dropContainer}
                    data-test="constructor"
                >
                    {!constructorBun && constructorIngredients.length === 0 && (
                        <p className={`${s.no_ingredients} text text_type_main-default`}>???????????????????? ???????? ?????????????? ?? ??????????????????????</p>
                    )}
                    {constructorBun && (
                        <div className={`pl-8 mb-4 show_item`}>
                            <ConstructorElement 
                                    type="top"
                                    isLocked={true}
                                    text={`${constructorBun.name} (????????)`}
                                    price={constructorBun.price}
                                    thumbnail={constructorBun.image}
                            />
                        </div>
                    )}
                    {constructorIngredients.length > 0 && (
                        <div className={`${s.wrapper_inner} mb-4`}>
                            {constructorIngredients.map((ingredient: TIngredientConstructor, index: number) => (
                                    <BurgerConstructorItem
                                        index={index}
                                        ingredient={ingredient}
                                        key={ingredient.drag_id}
                                    />
                            ))}
                        </div>
                    )}
                    {constructorBun && (
                        <div className={`pl-8 pr-4 show_item`}>
                            <ConstructorElement 
                                    type="bottom"
                                    isLocked={true}
                                    text={`${constructorBun.name} (??????)`}
                                    price={constructorBun.price}
                                    thumbnail={constructorBun.image}
                            />
                        </div>
                    )}
                </div>
           <div className={`${s.constructor_footer}`}>
                <div className={`${s.total_wrapper} mr-10`}>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div onClick={makeOrder}>
                    <Button type="primary" size="medium">
                        ???????????????? ??????????
                    </Button>
                </div>
           </div>
        </section>
    )
}

export default BurgerConstructor;