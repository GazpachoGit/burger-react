import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from "../../utils/local-types";

export default function IngredientDetails({item}) {
    return (
        <>
            <img alt={item.name} src={item.image} />
            <p className="text text_type_main-default pt-4">{item.name}</p>
            <div className={styles.composition + ' pt-8'}>
                <span className="text text_type_main-default">Калории, ккал<br/>{item.calories}</span>
                <span className="text text_type_main-default">Белки, г<br/>{item.proteins}</span>
                <span className="text text_type_main-default">Жиры, г<br/>{item.fat}</span>
                <span className="text text_type_main-default">Углеводы, г<br/>{item.carbohydrates}</span>
            </div>
        </>
    )
}
IngredientDetails.propTypes ={
    item: ingredientType
}




