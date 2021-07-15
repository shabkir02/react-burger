import React, { useEffect } from 'react';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userLogout, REMOVE_USER } from '../../services/actions';

import s from './profile-page.module.sass';

const ProfilePage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const userLogoutSuccess = useSelector(store => store.user.userLogoutSuccess)

    const logoutOfProfile = () => {
        const refreshToken = localStorage.getItem('refreshToken')
        dispatch(userLogout(refreshToken))
    }

    useEffect(() => {
        if (userLogoutSuccess && userLogoutSuccess.success) {
            localStorage.removeItem('refreshToken');
            dispatch({
                type: REMOVE_USER
            })
            history.replace({ pathname: '/' })
        }
    }, [userLogoutSuccess, history, dispatch])

    return (
        <div className={`${s.container} pt-30`} >
            <div className={s.container_nav}>
                <p className={`${s.container_nav_item} text text_type_main-medium`}>Профиль</p>
                <p className={`${s.container_nav_item} text text_type_main-medium`}>История заказов</p>
                <div 
                    className={`${s.container_nav_item} text text_type_main-medium`}
                    onClick={logoutOfProfile}
                >Выход</div>

                <p className={`${s.container_nav_descr} text text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div className={s.container_form}>
                <div className="mb-6">
                    <Input 
                        type="text"
                        placeholder="Имя"
                        // value={name}
                        // onChange={e => dispatch({ type: SET_NAME, payload: e.target.value })}
                    />
                </div>
                <div className="mb-6">
                    <EmailInput
                        // value={email}
                        // onChange={e => dispatch({ type: SET_EMAIL, payload: e.target.value })}
                    />
                </div>
                <div className="mb-6">
                    <PasswordInput 
                        // value={password}
                        // onChange={e => dispatch({ type: SET_PASSWORD, payload: e.target.value })}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;