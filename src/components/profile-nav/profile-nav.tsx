import { useDispatch } from '../../hooks/hooks';
import { NavLink } from 'react-router-dom';

import { userLogoutRequest } from '../../services/actions/user/user';

import s from './profile-nav.module.sass';

const ProfileNav = () => {

    const dispatch = useDispatch();

    const logoutOfProfile = () => {
        dispatch(userLogoutRequest())
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