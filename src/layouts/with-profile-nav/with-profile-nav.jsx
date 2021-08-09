import React from 'react';
import ProfileNav from '../../components/profile-nav/profile-nav';

import s from './with-profile-nav.module.sass';

const WithProfileNav = ({ children }) => {
    return (
        <div className={`${s.container}`} >
            <ProfileNav />
            {children}
        </div>
    )
}

export default WithProfileNav;