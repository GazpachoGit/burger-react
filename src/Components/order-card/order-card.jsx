import { useSelector } from "react-redux";
import styles from './order-card.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export default function OrderCard({order}) {
    const ingredients = useSelector(state => state.ingredients.ingredients.filter(ing => order.ingredients.includes(ing._id)));
    if(ingredients.length === 0 ) {
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
                        <img className={styles.imgContainer} alt="img" src='https://code.s3.yandex.net/react/code/bun-02-mobile.png' />
                        <img className={styles.imgContainer} alt="img" src='https://code.s3.yandex.net/react/code/bun-02-mobile.png' />
                        <img className={styles.imgContainer} alt="img" src='https://code.s3.yandex.net/react/code/bun-02-mobile.png' />
                        <img className={styles.imgContainer} alt="img" src='https://code.s3.yandex.net/react/code/bun-02-mobile.png' />
                        <img className={styles.imgContainer} alt="img" src='https://code.s3.yandex.net/react/code/bun-02-mobile.png' />
                </div>
                <div><span className="text text_type_digits-medium">480<CurrencyIcon type="primary" /></span></div>
            </div>
        </div>
    )
} 