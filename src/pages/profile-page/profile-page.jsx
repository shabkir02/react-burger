import React from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import { setName, setEmail, setPassword, updateUserInfo } from '../../services/actions/user';

import s from './profile-page.module.sass';

const ProfilePage = () => {

    const dispatch = useDispatch();
    const { email, name, password } = useSelector(store => ({
        email: store.user.email,
        name: store.user.name,
        password: store.user.password
    }))

    const updateUserInfoClick = (e) => {
        e.preventDefault();
        dispatch(updateUserInfo({
            name,
            email,
            password
        }))
    }

    return (
        <div className={`${s.container_form} pt-30`}>
            <form  onSubmit={updateUserInfoClick} className={s.form_wrapper}>
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
                <div className={s.profile_btn_wrapper}>
                    <div className={`${s.profile_btn_cancel} text text_type_main-default`}>Отмена</div>
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ProfilePage;