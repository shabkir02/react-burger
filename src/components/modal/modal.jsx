import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import s from './modal.module.sass';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ closeModal, children, title }) => {

    return ReactDOM.createPortal(
        (
            <div className={s.modal_wrapper}>
                <div className={`${s.modal} pt-10 pl-10 pr-10 pb-15`} >
                    {title && <h3 className={`text text_type_main-large ${s.modal_title}`}>{title}</h3>}
                    <div 
                        className={s.modal_close}
                        onClick={closeModal}
                    >
                        <CloseIcon type="primary" />
                    </div>
                    {children}
                </div>
                <ModalOverlay closeModal={closeModal} />
            </div>
        ),
        modalRoot
    )
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    title: PropTypes.string.isRequired
}

export default Modal;
