import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { singOut } from '../../services/actions/auth';
import { useHistory } from 'react-router-dom';

export default function LogoutForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(singOut());
        history.push('/');
    }
    return(
        <>
            <div>
                <Button onClick={logoutHandler} type="primary" size="medium">Выйти</Button>
            </div>
        </>
    )
}