import React from 'react';
import PropTypes from 'prop-types';

import s from './modal-overlay.module.sass';

const ModalOverlay = ({ closeModal }) => {
    return (
        <div 
            onClick={closeModal}
            className={s.modal_overlay}
        ></div>
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired
}

export default ModalOverlay;