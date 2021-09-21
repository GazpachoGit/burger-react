import IngredientDetails from '../Components/ingredient-details/ingredient-details';
import ModalContent from '../Components/modal-content/modal-content';
import styles from './login.module.css';

export default function IngredientPage() {

    return (
        <div className={styles.center}>
            <ModalContent title="Детали ингредиента" children={<IngredientDetails />} hideCloseButton={true}/>
        </div>
    )
}