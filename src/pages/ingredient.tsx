import IngredientDetails from '../Components/ingredient-details/ingredient-details';
import Modal from '../Components/modal/modal';
import styles from './login.module.css';

export default function IngredientPage() {

    return (
        <div className={styles.center}>
            <Modal title="Детали ингредиента" children={<IngredientDetails />} hideCloseButton={true} />
        </div>
    )
}