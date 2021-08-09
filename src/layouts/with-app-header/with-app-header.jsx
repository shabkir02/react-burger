import React from 'react';
import AppHeader from '../../components/app-header/app-header';

const WithAppHeader = ({ children }) => {
    return (
        <>
            <AppHeader/>
            {children}
        </>
    )
}

export default WithAppHeader;