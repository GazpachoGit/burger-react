import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../pages/./login.module.css';
import PropTypes from 'prop-types';

export default function AnonimRoute({ children, ...rest }) {
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

AnonimRoute.propTypes = {
    children: PropTypes.elementType.isRequired
}