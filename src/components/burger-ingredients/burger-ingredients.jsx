import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';

import s from './burger-ingredients.module.sass';

const BurgerIngredients = ({ handleIngredientClick }) => {

    const [currentTab, setCurrentTab] = useState('bun')
    const boxRef = useRef();

    const switchCurrentTab = (type) => {
        const offset = document.querySelector(`[data-scroll-id="${type}"]`).offsetTop;

        boxRef.current.scroll({
            left: 0,
            top: offset - 247,
            behavior: 'smooth'
        })
    }

    const switchCurrentTabOnScroll = (e) => {
        const bunContainer = document.querySelector(`[data-scroll-id="bun"]`);
        const sauceContainer = document.querySelector(`[data-scroll-id="sauce"]`);
        const mainContainer = document.querySelector(`[data-scroll-id="main"]`);

        if ((e.target.scrollTop + 248) > bunContainer.offsetTop && (e.target.scrollTop + 248) < sauceContainer.offsetTop && currentTab !== 'bun') {
            setCurrentTab('bun')
            return
        }
        if ((e.target.scrollTop + 248) > sauceContainer.offsetTop && (e.target.scrollTop + 248) < mainContainer.offsetTop && currentTab !== 'sauce') {
            setCurrentTab('sauce')
            return
        }
        if ((e.target.scrollTop + 248) > mainContainer.offsetTop && currentTab !== 'main') {
            setCurrentTab('main')
            return
        }
    }

    return (
        <section className={`${s.section_container} pt-10`}>
            <h1 className={`${s.title} text text_type_main-large mb-5`}>Соберите бургер</h1>
            <div className={`${s.tab_wrapper}`}>
                <Tab 
                    active={currentTab === 'bun'}
                    onClick={() => switchCurrentTab('bun')}
                >Булки</Tab>
                <Tab 
                    active={currentTab === 'sauce'}
                    onClick={() => switchCurrentTab('sauce')}
                >Соусы</Tab>
                <Tab 
                    active={currentTab === 'main'}
                    onClick={() => switchCurrentTab('main')}
                >Начинки</Tab>
            </div>
            <div 
                onScroll={switchCurrentTabOnScroll}
                ref={boxRef} 
                className={`${s.ingredients_wrapper} pl-4 pb-10`}
            >
                <BurgerIngredientsList onIngredientClick={handleIngredientClick} title='Булки' type="bun" />
                <BurgerIngredientsList onIngredientClick={handleIngredientClick} title='Соусы' type="sauce" />
                <BurgerIngredientsList onIngredientClick={handleIngredientClick} title='Начинки' type="main" />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    handleIngredientClick: PropTypes.func.isRequired
}

export default BurgerIngredients;