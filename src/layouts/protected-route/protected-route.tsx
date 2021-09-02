import React, { useEffect, useState, FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserInfo } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../hooks/hooks';

export const ProtectedRoute: FC = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.user)

    const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

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