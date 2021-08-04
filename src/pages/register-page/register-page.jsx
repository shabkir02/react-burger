import React from 'react';
import { Logo, EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SET_EMAIL, SET_NAME, SET_PASSWORD, userRegister } from '../../services/actions';

import s from './register-page.module.sass';

const RegisterPage = () => {

    const dispatch = useDispatch()

    const { name, email, password, user } = useSelector(store => ({
        email: store.user.email,
        password: store.user.password,
        name: store.user.name,
        user: store.user.user
    }))

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(userRegister(name, email, password))
    }

    if (user) {
        return <Redirect to="/" />
    }

    return (
        <div className={`${s.form_container} pt-30`} >
            <div className={s.form_wrapper}>
                <div className="mb-20">
                    <Logo/>
                </div>
                <form onSubmit={onFormSubmit} className={`${s.form} mb-20`}>
                    <h3 className="text text_type_main-medium mb-6">Регистрация</h3>
                    <div className="mb-6">
                        <Input 
                            type="text"
                            placeholder="Имя"
                            value={name}
                            onChange={e => dispatch({ type: SET_NAME, payload: e.target.value })}
                        />
                    </div>
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
                    <Button>Зарегистрироваться</Button>
                </form>
                <p className={`${s.form_descr} text text_type_main-default mb-4`}>
                    Уже зарегистрированы? <Link to="/login" className={s.form_link}>Войти</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage;