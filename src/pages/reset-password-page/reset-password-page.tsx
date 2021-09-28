import { FormEvent, useEffect } from 'react';
import { Logo, Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { Redirect, useLocation, useHistory } from 'react-router-dom';

import { resetPasswordRequest, setEmailCode } from '../../services/actions/reset-password';
import { setPassword } from '../../services/actions/user';

import s from './reset-password-page.module.sass';

const ResetPasswordPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory()

    const { password, emailCode, user, resetPasswordSuccess } = useSelector(store => ({
        password: store.user.password,
        emailCode: store.resetPassword.emailCode,
        user: store.user.user,
        resetPasswordSuccess: store.resetPassword.resetPasswordSuccess
    }))

    useEffect(() => {
        if (resetPasswordSuccess && resetPasswordSuccess.success) {
            history.replace({ pathname: '/login' })
        }
    }, [history, resetPasswordSuccess])

    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(resetPasswordRequest())
    }

    if (user) {
        return <Redirect to="/" />
    }

    if (location.state !== 'fromForgotPassword') {
        return <Redirect to="/login" />
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
                            name="password"
                            value={password}
                            onChange={e => dispatch(setPassword(e.target.value))}
                        />
                    </div>
                    <div className="mb-6">
                        <Input 
                            type="text"
                            placeholder="Введите код из письма"
                            value={emailCode}
                            onChange={e => dispatch(setEmailCode(e.target.value))}
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