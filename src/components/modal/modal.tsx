import { FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks/hooks';

import s from './modal.module.sass';

const modalRoot = document.getElementById('modal-root');

interface IModalProps {
    closeModal: () => void
}

const Modal: FC<IModalProps> = ({ closeModal, children }) => {

    const modalInner = useSelector(store => store.modal.modalInner)

    if (!modalRoot) {
        return null
    }

    return ReactDOM.createPortal(
        (
            <div className={s.modal_wrapper}>
                <div className={`${s.modal} pt-10 pl-10 pr-10 pb-10 show_item`} >
                    {modalInner?.title && modalInner.type === 'ingredientDetails' && (
                        <h3 className={`text text_type_main-large ${s.modal_title}`}>{modalInner.title}</h3>
                    )}
                    {modalInner?.title && modalInner.type === 'orderInfo' && (
                        <h3 className={`text text_type_digits-default ${s.modal_title}`}>{modalInner.title}</h3>
                    )}
                    <div 
                        className={s.modal_close}
                        onClick={closeModal}
                    >
                        <CloseIcon type="primary" />
                    </div>
                    {children}
                </div>
                <div 
                    onClick={closeModal}
                    className={s.modal_overlay}
                ></div>
            </div>
        ),
        modalRoot
    )
}

export default Modal;
