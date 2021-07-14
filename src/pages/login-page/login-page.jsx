import React from 'react';
import { Logo, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { userLogin, SET_EMAIL, SET_PASSWORD } from '../../services/actions'

import s from './login-page.module.sass';

const LoginPage = () => {

    const dispatch = useDispatch();

    const { email, password } = useSelector(store => ({
        email: store.user.email,
        password: store.user.password
    }))

    const onFormSubmit = (e) => {
        e.preventDefault();

        dispatch(userLogin(email, password))
    }

    console.log(email, password);

    return (
        <div className={`${s.form_container} pt-30`} >
            <div className={s.form_wrapper}>
                <div className="mb-20">
                    <Logo/>
                </div>
                <form onSubmit={onFormSubmit} className={`${s.form} mb-20`}>
                    <h3 className="text text_type_main-medium mb-6">Вход</h3>
                    <div className="mb-6">
                        <EmailInput 
                            value={email}
                            onChange={e => dispatch({ type: SET_EMAIL, payload: e.target.value })}
                        />
                    </div>
                    <div className="mb-6">
                        <PasswordInput 
                            value={password}
                            onChange={e => dispatch({ type: SET_PASSWORD, payload: e.target.value })}
                        />
                    </div>
                    <Button>Войти</Button>
                </form>
                <p className={`${s.form_descr} text text_type_main-default mb-4`}>
                    Вы - новый пользователь? <Link to="/register" className={s.form_link}>Зарегестрироваться</Link>
                </p>
                <p className={`${s.form_descr} text text_type_main-default`}>
                    Забыли пароль? <Link to="/forgot-password" className={s.form_link}>Восстановить пароль</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;