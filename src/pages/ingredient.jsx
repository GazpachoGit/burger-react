import IngredientDetails from '../Components/ingredient-details/ingredient-details';
import {useHistory} from 'react-router-dom';
import ModalOverlay from '../Components/modal-overlay/modal-overlay';
import styles from './login.module.css';

export default function IngredientPage() {
    const history = useHistory();

    const closeIngredientHandler = e => {
        history.push('/');
    }

    return (
        //<Modal title="Детали ингредиента" children={<IngredientDetails />} closeHandler={closeIngredientHandler} />
        <div className={styles.center}>
            <ModalOverlay title="Детали ингредиента" children={<IngredientDetails />} hideCloseButton={true}/>
        </div>
        
        
    )
}