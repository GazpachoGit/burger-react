import styles from './order-ingredients.module.css';
import { useSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatIngredientsList, getTotal } from '../../utils/order-service';
import { FC } from 'react';

export const OrderIngredients: FC<{ orderIngredients: Array<string> }> = ({ orderIngredients }) => {
    const displayQuantity = 6;
    const ingredientsList = useSelector(state => state.ingredients.ingredients);
    if (ingredientsList.length === 0) {
        return <p className="text text_type_main-default">Загрузка ингредиентов</p>;
    }
    const ingredients = formatIngredientsList(orderIngredients, ingredientsList);
    const displayIngredients = ingredients.length > displayQuantity ? ingredients.slice(0, displayQuantity) : ingredients
    const total = getTotal(ingredients);
    return (
        <div className={styles.footer}>
            <div className={styles.imgsList}>
                {ingredients.length > displayQuantity && <span className={styles.rest + " text text_type_digits-default"}>+{ingredients.length - displayQuantity}</span>}

                {displayIngredients.map((ing, index) =>
                    <img key={ing._id + index} style={{ zIndex: index + 1 }} className={`${styles.imgContainer} ${ingredients.length > displayQuantity && index === 0 && styles.notLast}`} alt="img" src={ing.image_mobile} />
                )}
            </div>
            <div><span className="text text_type_digits-medium">{total}<CurrencyIcon type="primary" /></span></div>
        </div>
    )
}
export default OrderIngredients;