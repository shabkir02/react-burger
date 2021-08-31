import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { userLogout } from '../../services/actions/user';

import s from './profile-nav.module.sass';

const ProfileNav = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector(store => store.user.user)

    const logoutOfProfile = () => {
        const refreshToken = localStorage.getItem('refreshToken')
        dispatch(userLogout(refreshToken))
    }

    if (!user) {
        history.replace({ pathname: '/login' });
    }

    return (
        <div className={`${s.container_nav} pt-30`}>
            <NavLink 
                to="/profile" 
                className={`${s.container_nav_item} text text_type_main-medium`}
                activeClassName={s.active}
                exact
            >Профиль</NavLink>
            <NavLink 
                to='/profile/orders'
                className={`${s.container_nav_item} text text_type_main-medium`}
                activeClassName={s.active}
            >История заказов</NavLink>
            <div 
                className={`${s.container_nav_item} text text_type_main-medium`}
                onClick={logoutOfProfile}
            >Выход</div>

            <p className={`${s.container_nav_descr} text text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
    )
}

export default ProfileNav;