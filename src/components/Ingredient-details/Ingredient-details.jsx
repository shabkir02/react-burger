import React from 'react';

import s from './Ingredient-details.module.sass';

const IngredientDetails = ({ currentIng }) => {
    return (
        <div>
            <h3 className={`text text_type_main-large ${s.title}`}>Детали ингредиента</h3>
            <img className={`${s.image} mb-4`} src={currentIng.image} alt={currentIng.name} />
            <p className={`text text_type_main-medium ${s.subtitle} mb-8`}>
                Биокотлета из марсианской Магнолии
            </p>
            <div className={s.footer}>
                <div className={s.footer_item}>
                    <span className="text text_type_main-default">Калории,ккал</span>
                    <span className="text text_type_digits-default">{currentIng.calories}</span>
                </div>
                <div className={s.footer_item}>
                    <span className="text text_type_main-default">Белки, г</span>
                    <span className="text text_type_digits-default">{currentIng.proteins}</span>
                </div>
                <div className={s.footer_item}>
                    <span className="text text_type_main-default">Жиры, г</span>
                    <span className="text text_type_digits-default">{currentIng.fat}</span>
                </div>
                <div className={s.footer_item}>
                    <span className="text text_type_main-default">Углеводы, г</span>
                    <span className="text text_type_digits-default">{currentIng.carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}

export default IngredientDetails;