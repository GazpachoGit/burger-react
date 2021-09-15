import styles from './order-ingredients.module.css';
import { useSelector } from "react-redux";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export default function OrderIngredients({orderIngredients}) {
    const displayQuantity = 6;
    const ingredientsList = useSelector(state => state.ingredients.ingredients);
    if(ingredientsList.length === 0 ) {
        return <p className="text text_type_main-default">Загрузка ингредиентов</p>;
    }
    const initialIngredients = ingredientsList.filter(ing => orderIngredients.includes(ing._id));
    const ingredients = [];
    initialIngredients.forEach(ing => {
        let currentIngId = ingredients.findIndex(item => item._id === ing._id);
        currentIngId !== -1 ? ingredients[currentIngId].qty++ : ingredients.push({...ing, qty: 1});
    });
    const displayIngredients = ingredients.length > displayQuantity ? ingredients.slice(0, displayQuantity) : ingredients
    const total = ingredients.reduce((total, item) => item.qty ? total + item.price * item.qty : total, 0);
    return (
        <div className={styles.footer}>
                <div className={styles.imgsList}>  
                    {ingredients.length > displayQuantity && <span className={styles.rest + " text text_type_digits-default"}>+{ingredients.length - displayQuantity}</span>}

                    {displayIngredients.map((ing, index) => 
                        <img key={ing._id} style={{zIndex: index+1}} className={`${styles.imgContainer} ${ingredients.length > displayQuantity && index === 0 && styles.notLast}`} alt="img" src={ing.image_mobile} />
                    )}                    
                </div>
                <div><span className="text text_type_digits-medium">{total}<CurrencyIcon type="primary" /></span></div>
            </div>
    )
}