import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../services/actions/auth';
import styles from '../../pages/./login.module.css';

export default function AnonimRoute({ children, ...rest }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const userLoaded = useSelector(state => state.auth.userLoaded);
    const {state} = useLocation();

    if(!userLoaded) return(
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
                    <Redirect to={state?.from ? state.from.pathname : '/'}/>
                )
            }
        />
    );
}