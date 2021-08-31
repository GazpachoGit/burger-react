import IngredientDetails from '../Components/ingredient-details/ingredient-details';
import ModalOverlay from '../Components/modal-overlay/modal-overlay';
import styles from './login.module.css';

export default function IngredientPage() {

    return (
        <div className={styles.center}>
            <ModalOverlay title="Детали ингредиента" children={<IngredientDetails />} hideCloseButton={true}/>
        </div>
        
        
    )
}