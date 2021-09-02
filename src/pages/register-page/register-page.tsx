import React, { FormEvent } from 'react';
import { Logo, EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/hooks';

import { setEmail, setName, setPassword, userRegister } from '../../services/actions/user';

import s from './register-page.module.sass';

const RegisterPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const { name, email, password, user } = useSelector(store => ({
        email: store.user.email,
        password: store.user.password,
        name: store.user.name,
        user: store.user.user
    }))

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userRegister(name, email, password))
    }

    if (user) {
        return <Redirect to="/" />
    }

    if (location.state !== 'fromLogin') {
        return <Redirect to="/login" />
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
                            onChange={e => dispatch(setName(e.target.value))}
                        />
                    </div>
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