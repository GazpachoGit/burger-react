import { useSelector } from "react-redux";
import styles from './order-card.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export default function OrderCard({order}) {
    const displayQuantity = 6;
    const initialIngredients = useSelector(state => state.ingredients.ingredients.filter(ing => order.ingredients.includes(ing._id)));
    const ingredients = [];
    initialIngredients.forEach(ing => {
        let currentIngId = ingredients.findIndex(item => item._id === ing._id);
        currentIngId !== -1 ? ingredients[currentIngId].qty++ : ingredients.push({...ing, qty: 1});
    });
    
    const displayIngredients = ingredients.length > displayQuantity ? ingredients.slice(0, displayQuantity) : ingredients
    if(initialIngredients.length === 0 ) {
        return null;
    }
    return (
        <div className={styles.mainContainer + " p-6 m-4"}>
            <div className={styles.header}>
                <p className="text text_type_main-default">#034535</p>
                <p className="text text_type_main-default gray-text">Сегодня, 16:20 i-GMT+3</p>
            </div>
            <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
            <div className={styles.footer}>
                <div className={styles.imgsList}>  
                    {ingredients.length > displayQuantity && <span className={styles.rest + " text text_type_digits-default"}>+{ingredients.length - displayQuantity}</span>}

                    {displayIngredients.map((ing, index) => 
                        <img key={ing._id} style={{zIndex: index+1}} className={`${styles.imgContainer} ${ingredients.length > displayQuantity && index === 0 && styles.notLast}`} alt="img" src={ing.image_mobile} />
                    )}                    
                </div>
                <div><span className="text text_type_digits-medium">480<CurrencyIcon type="primary" /></span></div>
            </div>
        </div>
    )
} 