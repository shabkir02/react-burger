import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserInfo } from '../../services/actions';
import { useDispatch, useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.user)

    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        await dispatch(getUserInfo());
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route
            {...rest}
            render={({location}) => user ? (
                children
                ) : (
                    <Redirect
                        to={{ 
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
  );
} 