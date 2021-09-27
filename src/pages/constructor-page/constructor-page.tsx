import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import s from './constructor-page.module.sass';
import { TIngredient } from '../../services/types/data'

interface IConstructorPageProps {
    handleIngredientClick: (
        item: TIngredient
    ) => void;
    handleOrderClick: (
        propLocation: object
    ) => void;
}

const ConstructorPage = ({ handleIngredientClick, handleOrderClick }: IConstructorPageProps) => {

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <section className={s.table_wrapper}>
                    <BurgerIngredients handleIngredientClick={handleIngredientClick} />
                    <BurgerConstructor handleOrderClick={handleOrderClick} />
                </section>
            </DndProvider>
        </>
    )
}

export default ConstructorPage;