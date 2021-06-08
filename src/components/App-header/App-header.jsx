import React from "react";
import { Logo, ListIcon, BurgerIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './app-header.module.sass';

const AppHeader = () => {
    return (
        <nav className={`${s.header} pt-4 pb-4`}>
            <div className={s.header_container}>
                <ul className={s.header_left_wrapper}>
                    <li className={`${s.header_item} pl-5 pr-5 pt-4 pb-4 mr-2`}>
                        <div className="mr-2">
                            <BurgerIcon/>
                        </div>
                        <span className="text text_type_main-default">Конструктор</span>
                    </li>
                    <li className={`${s.header_item} pl-5 pr-5 pt-4 pb-4`}>
                        <div className="mr-2">
                            <ListIcon type="secondary"/>
                        </div>
                        <span className="text text_type_main-default">Лента заказа</span>
                    </li>
                </ul>
                <div className={s.header_logo}>
                    <Logo/>
                </div>
                <div className={`${s.header_item} pl-5 pr-5 pt-4 pb-4`}>
                    <div className="mr-2">
                        <ProfileIcon type="secondary"/>
                    </div>
                    <span className="text text_type_main-default">Личный кабинет</span>
                </div>
            </div>
        </nav>
    )
}

export default AppHeader;
        