
import { Logo, ListIcon, BurgerIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSelector } from "../../hooks/hooks";

import s from './app-header.module.sass';

const AppHeader = () => {

    const { pathname } = useLocation();

    const user = useSelector(store => store.user.user)

    return (
        <header>
            <nav className={`${s.header} pt-4 pb-4`}>
                <div className={s.header_container}>
                    <ul className={s.header_left_wrapper}>
                        <NavLink 
                            to="/"
                            exact 
                            className={`${s.header_item} pl-5 pr-5 pt-4 pb-4 mr-2`}
                            activeClassName={s.active}
                        >
                            <div className="mr-2">
                                <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'}/>
                            </div>
                            <span className="text text_type_main-default">Конструктор</span>
                        </NavLink>
                        <NavLink 
                            className={`${s.header_item} pl-5 pr-5 pt-4 pb-4`}
                            to="/feed"
                            exact
                            activeClassName={s.active}
                        >
                            <div className="mr-2">
                                <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'}/>
                            </div>
                            <span className="text text_type_main-default">Лента заказа</span>
                        </NavLink>
                    </ul>
                    <Link to="/" className={s.header_logo}>
                        <Logo/>
                    </Link>
                    {!user && (
                        <NavLink 
                            to="/login" 
                            className={`${s.header_item} pl-5 pr-5 pt-4 pb-4`}
                            activeClassName={s.active}
                        >
                            <div className="mr-2">
                                <ProfileIcon  type={pathname === '/login' ? 'primary' : 'secondary'}/>
                            </div>
                            <span className="text text_type_main-default">Войти</span>
                        </NavLink>
                    )}
                    {user && (
                        <NavLink 
                            to="/profile" 
                            className={`${s.header_item} pl-5 pr-5 pt-4 pb-4`}
                            activeClassName={s.active}
                        >
                            <div className="mr-2">
                                <ProfileIcon type={(pathname === '/profile' || pathname === '/profile/orders') ? 'primary' : 'secondary'}/>
                            </div>
                            <span className="text text_type_main-default">Личный кабинет</span>
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;
        