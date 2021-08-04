import React, { useEffect } from 'react';
import { Logo, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import { SET_EMAIL, sendEmailForResetPass } from '../../services/actions';

import s from './forgot-password-page.module.sass';

const ForgotPasswordPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { email, sendEmailSuccess, user } = useSelector(store => ({
        email: store.user.email,
        sendEmailSuccess: store.resetPassword.sendEmailSuccess,
        user: store.user.user
    }))

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(sendEmailForResetPass(email));
    }

    useEffect(() => {
        if (sendEmailSuccess && sendEmailSuccess.success) {
            history.replace({ pathname: '/reset-password' });
        }
    }, [sendEmailSuccess, history, dispatch])

    if (user) {
        return <Redirect to="/" />
    }

    return (
        <div className={`${s.form_container} pt-30`} >
            <div className={s.form_wrapper}>
                <div className="mb-20">
                    <Logo/>
                </div>
                <form 
                    className={`${s.form} mb-20`}
                    onSubmit={onFormSubmit}
                >
                    <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
                    <div className="mb-6">
                        <Input 
                            type="text"
                            placeholder="Укажите e-mail"
                            value={email}
                            onChange={e => dispatch({ type: SET_EMAIL, payload: e.target.value })}
                        />
                    </div>
                    <Button>Восстановить</Button>
                </form>
                <p className={`${s.form_descr} text text_type_main-default mb-4`}>
                    Вспомнили пароль? <Link to="/login" className={s.form_link}>Войти</Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;