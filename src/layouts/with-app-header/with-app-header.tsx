import React, { FC } from 'react';
import AppHeader from '../../components/app-header/app-header';

const WithAppHeader: FC = ({ children }) => {
    return (
        <>
            <AppHeader/>
            {children}
        </>
    )
}

export default WithAppHeader;