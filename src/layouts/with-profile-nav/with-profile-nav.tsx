import React, { FC } from 'react';
import ProfileNav from '../../components/profile-nav/profile-nav';

import s from './with-profile-nav.module.sass';

const WithProfileNav: FC = ({ children }) => {
    return (
        <div className={`${s.container}`} >
            <ProfileNav />
            {children}
        </div>
    )
}

export default WithProfileNav;