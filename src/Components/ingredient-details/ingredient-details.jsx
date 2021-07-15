import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

export default function IngredientDetails() {
    const currentIngredient = useSelector(state => state.ingredients.currentIngredient);
    return (
        <>
            <img alt={currentIngredient.name} src={currentIngredient.image} />
            <p className="text text_type_main-default pt-4">{currentIngredient.name}</p>
            <div className={styles.composition + ' pt-8'}>
                <span className="text text_type_main-default">Калории, ккал<br/>{currentIngredient.calories}</span>
                <span className="text text_type_main-default">Белки, г<br/>{currentIngredient.proteins}</span>
                <span className="text text_type_main-default">Жиры, г<br/>{currentIngredient.fat}</span>
                <span className="text text_type_main-default">Углеводы, г<br/>{currentIngredient.carbohydrates}</span>
            </div>
        </>
    )
}





