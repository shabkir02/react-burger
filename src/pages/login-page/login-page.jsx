import React, { useEffect } from 'react';
import { Logo, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userLogin, SET_EMAIL, SET_PASSWORD, RESET_EMAIL, RESET_PASSWORD, SET_USER } from '../../services/actions'
import { setCookie } from '../../utils/cookies';

import s from './login-page.module.sass';

const LoginPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { email, password, userLoginSuccess } = useSelector(store => ({
        email: store.user.email,
        password: store.user.password,
        userLoginSuccess: store.user.userLoginSuccess
    }))

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password))
        dispatch({ type: RESET_EMAIL })
        dispatch({ type: RESET_PASSWORD })
    }

    useEffect(() => {
        if (userLoginSuccess && userLoginSuccess.success) {
            const accessToken = userLoginSuccess.accessToken.split('Bearer ')[1];
            const refreshToken = userLoginSuccess.refreshToken;

            setCookie('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken)
            dispatch({ type: SET_USER })

            history.replace({ pathname: '/' })
        }
    }, [userLoginSuccess, dispatch, history])

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