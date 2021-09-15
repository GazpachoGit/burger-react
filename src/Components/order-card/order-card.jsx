import styles from './order-card.module.css';
import OrderIngredients from '../orders-ingredients/order-ingredients';
import {getDate} from '../../utils/date-utils';

export default function OrderCard({order}) {
    const date = getDate(order.createdAt);
    return (
        <div className={styles.mainContainer + " p-6 m-4"}>
            <div className={styles.header}>
                <p className="text text_type_main-default">{order.number}</p>
                <p className="text text_type_main-default gray-text">{date}</p>
            </div>
            <p className="text text_type_main-medium">{order.name}</p>
            {order.ingredients?.length === 0 ? <p>В заказе нет игредиентов</p> : <OrderIngredients orderIngredients={order.ingredients} />}
        </div>
    )
} 