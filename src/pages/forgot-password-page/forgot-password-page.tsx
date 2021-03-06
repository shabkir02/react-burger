import { useEffect } from 'react';
import { FormEvent } from 'react';
import { Logo, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { Redirect, useLocation, useHistory } from 'react-router-dom';

import { setEmail } from '../../services/actions/user/user';
import { sendEmailRequest } from '../../services/actions/reset-password/reset-password'; 

import s from './forgot-password-page.module.sass';

const ForgotPasswordPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const { email, user, sendEmailSuccess } = useSelector(store => ({
        email: store.user.email,
        user: store.user.user,
        sendEmailSuccess: store.resetPassword.sendEmailSuccess
    }))

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(sendEmailRequest());
    }

    useEffect(() => {
        if (sendEmailSuccess && sendEmailSuccess.success) {
            history.replace({ pathname: '/reset-password', state: 'fromForgotPassword' });
        }
    }, [sendEmailSuccess, history, dispatch])

    if (user) {
        return <Redirect to="/" />
    }

    if (location.state !== 'fromLogin') {
        return <Redirect to="/login" />
    }

    return (
        <div className={`${s.form_container} pt-15`} >
            <div className={s.form_wrapper}>
                <div className="mb-15">
                    <Logo/>
                </div>
                <form 
                    className={`${s.form} mb-15`}
                    onSubmit={onFormSubmit}
                >
                    <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
                    <div className="mb-6">
                        <Input 
                            type="text"
                            placeholder="Укажите e-mail"
                            value={email}
                            onChange={e => dispatch(setEmail(e.target.value))}
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