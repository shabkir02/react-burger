import React, { useEffect } from 'react';
import { Logo, Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { resetPassword, SET_EMAILCODE, RESET_EMAILCODE, SET_PASSWORD, RESET_PASSWORD } from '../../services/actions'

import s from './reset-password-page.module.sass';

const ResetPasswordPage = () => {

    const dispatch = useDispatch();

    const { password, emailCode } = useSelector(store => ({
        password: store.user.password,
        emailCode: store.resetPassword.emailCode
    }))

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(password, emailCode))
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
                        <PasswordInput 
                            value={password}
                            onChange={e => dispatch({ type: SET_PASSWORD, payload: e.target.value })}
                        />
                    </div>
                    <div className="mb-6">
                        <Input 
                            type="text"
                            placeholder="Введите код из письма"
                            value={emailCode}
                            onChange={e => dispatch({ type: SET_EMAILCODE, payload: e.target.value })}
                        />
                    </div>
                    <Button>Сохранить</Button>
                </form>
                <p className={`${s.form_descr} text text_type_main-default mb-4`}>
                    Вспомнили пароль? <Link to="/login" className={s.form_link}>Войти</Link>
                </p>
            </div>
        </div>
    )
}

export default ResetPasswordPage;