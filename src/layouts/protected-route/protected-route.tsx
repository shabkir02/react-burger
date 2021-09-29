import { useEffect, useState, FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserInfoRequest } from '../../services/actions/user/user';
import { useDispatch, useSelector } from '../../hooks/hooks';

interface IProtectedRouteProps {
    path: string;
    exact?: boolean
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.user)

    const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

    const init = async () => {
        await dispatch(getUserInfoRequest());
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