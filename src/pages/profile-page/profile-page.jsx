import React from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import { SET_NAME, SET_EMAIL, SET_PASSWORD, updateUserInfo } from '../../services/actions';

import s from './profile-page.module.sass';

const ProfilePage = () => {

    const dispatch = useDispatch();
    const { email, name, password } = useSelector(store => ({
        email: store.user.email,
        name: store.user.name,
        password: store.user.password
    }))

    const updateUserInfoClick = () => {
        dispatch(updateUserInfo({
            name,
            email,
            password
        }))
    }

    return (
        <div className={`${s.container_form} pt-30`}>
            <div className={s.form_wrapper}>
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
                <div className={s.profile_btn_wrapper}>
                    <div className={`${s.profile_btn_cancel} text text_type_main-default`}>Отмена</div>
                    <Button onClick={updateUserInfoClick} type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;