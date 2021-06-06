import React from 'react';

import s from './Modal-overlay.module.sass';

const ModalOverlay = ({ closeModal }) => {
    return (
        <div 
            onClick={closeModal}
            className={s.modal_overlay}
        ></div>
    )
}

export default ModalOverlay;