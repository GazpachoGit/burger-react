import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../services/actions/auth';

export function ProtectedRoute({ children, ...rest }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const userLoaded = useSelector(state => state.auth.userLoaded)

    const init = async () => {
        dispatch(getUser());
    };

    useEffect(() => {
        init();
    }, []);

    if (!userLoaded) {
        return null;
    }


    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
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