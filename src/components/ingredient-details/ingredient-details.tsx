import React from 'react';
import { useSelector } from '../../hooks/hooks';

import s from './ingredient-details.module.sass';

const IngredientDetails = () => {

    const currentIngredient = useSelector(store => store.modal.currentIngredient)

    return (
        <div>
            <img className={`${s.image} mb-4`} src={currentIngredient?.image} alt={currentIngredient?.name} />
            <p className={`text text_type_main-medium ${s.subtitle} mb-8`}>
                {currentIngredient?.name}
            </p>
            <div className={s.footer}>
                <div className={s.footer_item}>
                    <span className="text text_type_main-default">Калории,ккал</span>
                    <span className="text text_type_digits-default">{currentIngredient?.calories}</span>
                </div>
                <div className={s.footer_item}>
                    <span className="text text_type_main-default">Белки, г</span>
                    <span className="text text_type_digits-default">{currentIngredient?.proteins}</span>
                </div>
                <div className={s.footer_item}>
                    <span className="text text_type_main-default">Жиры, г</span>
                    <span className="text text_type_digits-default">{currentIngredient?.fat}</span>
                </div>
                <div className={s.footer_item}>
                    <span className="text text_type_main-default">Углеводы, г</span>
                    <span className="text text_type_digits-default">{currentIngredient?.carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}

export default IngredientDetails;