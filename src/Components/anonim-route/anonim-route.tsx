import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import styles from '../../pages/./login.module.css';
import PropTypes from 'prop-types';
import { FC } from 'react';


type TPros = {
    [key: string]: number | boolean | string;
}

interface state {
    from: {
        pathname: string
    };
}

export const AnonimRoute: FC<TPros> = ({ children, ...rest }) => {
    const user = useSelector(state => state.auth.user);
    const userLoaded = useSelector(state => state.auth.userLoaded);
    const { state } = useLocation<state>();

    if (!userLoaded) return (
        <div className={styles.formContainer}>
            <p className="text text_type_main-default">Подождите, идет загрузка пользователя</p>
        </div>
    )

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !user ? (
                    children
                ) : (
                    <Redirect to={state?.from ? state.from.pathname : '/'} />
                )
            }
        />
    );
}

export default AnonimRoute;
