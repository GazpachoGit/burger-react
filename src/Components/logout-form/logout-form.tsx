import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../services/hooks';
import { singOut } from '../../services/actions/auth';
import { useHistory } from 'react-router-dom';
import { FC } from 'react';

export const LogoutForm: FC<{}> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(singOut());
        history.push('/');
    }
    return(
        <div>
            <Button onClick={logoutHandler} type="primary" size="medium">Выйти</Button>
        </div>
    )
}

export default LogoutForm;