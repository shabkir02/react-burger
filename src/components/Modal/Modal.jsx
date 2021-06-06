import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../Modal-overlay/Modal-overlay';

import s from './Modal.module.sass';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends React.Component {
    

    render() {

        const { closeModal, children } = this.props;

        return ReactDOM.createPortal(
            (
                <div className={s.modal_wrapper}>
                    <div className={`${s.modal} pt-10 pl-10 pr-10 pb-15`} >
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
}