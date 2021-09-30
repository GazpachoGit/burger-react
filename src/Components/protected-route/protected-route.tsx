import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks';
import { FC, ReactNode, useEffect } from 'react';
import { getUser } from '../../services/actions/auth';
import styles from '../../pages/./login.module.css';

type TProps = {
    children: ReactNode,
    path: string,
    exact?: boolean
}

export const ProtectedRoute: FC<TProps> = ({ children, ...rest }) => {
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
        return <div className={styles.formContainer}>
            <p className="text text_type_main-default">Подождите, идет загрузка пользователя</p>
        </div>
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