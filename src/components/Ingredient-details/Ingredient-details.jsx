import React from 'react';
import PropTypes from 'prop-types';

import s from './ingredient-details.module.sass';

const IngredientDetails = ({ currentIng }) => {
    return (
        <div>
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

IngredientDetails.propTypes = {
    currentIng: PropTypes.shape({
        _id: PropTypes.string,
       name: PropTypes.string.isRequired,
       type: PropTypes.string,
       proteins: PropTypes.number.isRequired,
       fat: PropTypes.number.isRequired,
       carbohydrates: PropTypes.number.isRequired,
       calories: PropTypes.number.isRequired,
       price: PropTypes.number,
       image: PropTypes.string.isRequired,
       image_mobile: PropTypes.string.isRequired,
       image_large: PropTypes.string.isRequired,
       __v: PropTypes.number
    }).isRequired
}

export default IngredientDetails;