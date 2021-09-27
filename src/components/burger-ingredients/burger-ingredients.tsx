import { useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/types/hooks';

import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
import Loader from '../loader/loader';

import s from './burger-ingredients.module.sass';
import { TIngredient, TIngredientsCategoryTitle, TIngredientsCategoryType } from '../../services/types/data';

interface IBurgerIngredientsProps {
    handleIngredientClick: (
        item: TIngredient
    ) => void
}

const BurgerIngredients = ({ handleIngredientClick }: IBurgerIngredientsProps) => {

    const [currentTab, setCurrentTab] = useState<TIngredientsCategoryType>('bun');
    const boxRef = useRef<HTMLDivElement>(null);
    const { ingredients } = useSelector(store => ({
        ingredients: store.ingredients.ingredients,
    }));

    const switchCurrentTab = (type: TIngredientsCategoryType): void => {
        const element = document.querySelector(`[data-scroll-id="${type}"]`)
        if (element && element instanceof HTMLElement) {
            const offset = element.offsetTop
            boxRef.current?.scroll({
                left: 0,
                top: offset - 247,
                behavior: 'smooth'
            })
        }
    }

    const switchCurrentTabOnScroll = (e: any): void => {
        const bunContainer = document.querySelector<HTMLElement>(`[data-scroll-id="bun"]`);
        const sauceContainer = document.querySelector<HTMLElement>(`[data-scroll-id="sauce"]`);
        const mainContainer = document.querySelector<HTMLElement>(`[data-scroll-id="main"]`);

        if ((e.target.scrollTop + 248) > bunContainer!.offsetTop && (e.target.scrollTop + 248) < sauceContainer!.offsetTop && currentTab !== 'bun') {
            setCurrentTab('bun')
            return
        }
        if ((e.target.scrollTop + 248) > sauceContainer!.offsetTop && (e.target.scrollTop + 248) < mainContainer!.offsetTop && currentTab !== 'sauce') {
            setCurrentTab('sauce')
            return
        }
        if ((e.target.scrollTop + 248) > mainContainer!.offsetTop && currentTab !== 'main') {
            setCurrentTab('main')
            return
        }
        return
    }

    const ingredientCategoryList: Array<{title: TIngredientsCategoryTitle; type: TIngredientsCategoryType;}> = [
        {title: 'Булки', type: 'bun'},
        {title: 'Соусы', type: 'sauce'},
        {title: 'Начинки', type: 'main'},
    ]

    return (
        <section className={`${s.section_container} pt-10`}>
            <h1 className={`${s.title} text text_type_main-large mb-5`}>Соберите бургер</h1>
                <div className={s.ingredients_wrapper}>
                    {!ingredients && <Loader />}
                    {ingredients && (
                        <>
                            <div className={`${s.tab_wrapper}`}>
                                <Tab 
                                    active={currentTab === 'bun'}
                                    onClick={() => switchCurrentTab('bun')}
                                    value="Начинки"
                                >Булки</Tab>
                                <Tab 
                                    active={currentTab === 'sauce'}
                                    onClick={() => switchCurrentTab('sauce')}
                                    value="Начинки"
                                >Соусы</Tab>
                                <Tab 
                                    active={currentTab === 'main'}
                                    onClick={() => switchCurrentTab('main')}
                                    value="Начинки"
                                >Начинки</Tab>
                            </div>
                            <div 
                                onScroll={switchCurrentTabOnScroll}
                                ref={boxRef} 
                                className={`${s.ingredients_items_wrapper} pl-4 pb-10`}
                            >
                                {ingredientCategoryList.map((category) => (
                                    <BurgerIngredientsList 
                                        key={category.type}
                                        onIngredientClick={handleIngredientClick} 
                                        title={category.title} 
                                        type={category.type}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
        </section>
    )
}

export default BurgerIngredients;