import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgetTypeTable from './Burger-ingredients-table';

import s from './Burger-ingredients.module.sass';

const BurgerIngredients = ({ data, openModal }) => {

    return (
        <section className={`${s.section_container} pt-10`}>
            <h1 className={`${s.title} text text_type_main-large mb-5`}>Соберите бургер</h1>
            <div className={`${s.tab_wrapper}`}>
                <Tab active>
                    Булки
                </Tab>
                <Tab>
                    Соусы
                </Tab>
                <Tab>
                    Начинки
                </Tab>
            </div>
            <div className={`${s.ingredients_wrapper} pl-4 pb-10`}>
                <BurgetTypeTable openModal={(_id) => openModal(_id)} title='Булки' ingredients={data} type="bun" />
                <BurgetTypeTable openModal={(_id) => openModal(_id)} title='Соусы' ingredients={data} type="sauce" />
                <BurgetTypeTable openModal={(_id) => openModal(_id)} title='Начинки' ingredients={data} type="main" />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
       name: PropTypes.string.isRequired,
       type: PropTypes.string.isRequired,
       proteins: PropTypes.number.isRequired,
       fat: PropTypes.number.isRequired,
       carbohydrates: PropTypes.number.isRequired,
       calories: PropTypes.number.isRequired,
       price: PropTypes.number.isRequired,
       image: PropTypes.string.isRequired,
       image_mobile: PropTypes.string.isRequired,
       image_large: PropTypes.string.isRequired,
       __v: PropTypes.number.isRequired
    })).isRequired
}

export default BurgerIngredients;