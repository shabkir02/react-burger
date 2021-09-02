import React, { FormEvent } from 'react';
import { Logo, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/hooks';

import { userLogin, setEmail, setPassword } from '../../services/actions/user';

import s from './login-page.module.sass';

const LoginPage = () => {

    const dispatch = useDispatch();
    const { state } = useLocation<any>()

    const { email, password, user } = useSelector(store => ({
        email: store.user.email,
        password: store.user.password,
        user: store.user.user
    }))

    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(userLogin(email, password))
    }

    if (user) {
        return <Redirect to={ state?.from || '/' } />
    }

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
                            onChange={e => dispatch(setEmail(e.target.value))}
                        />
                    </div>
                    <div className="mb-6">
                        <PasswordInput 
                            value={password}
                            onChange={e => dispatch(setPassword(e.target.value))}
                        />
                    </div>
                    <Button>Войти</Button>
                </form>
                <p className={`${s.form_descr} text text_type_main-default mb-4`}>
                    Вы - новый пользователь? <Link to={{ pathname: "/register", state: 'fromLogin' }} className={s.form_link}>Зарегестрироваться</Link>
                </p>
                <p className={`${s.form_descr} text text_type_main-default`}>
                    Забыли пароль? <Link to={{ pathname: "/forgot-password", state: 'fromLogin' }} className={s.form_link}>Восстановить пароль</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;