import styles from './order-card.module.css';
import OrderIngredients from '../orders-ingredients/order-ingredients';
import {getFormatedDate} from '../../utils/order-service';
import {Link, useLocation} from 'react-router-dom';
import OrderStatus from '../order-status/order-status';

export default function OrderCard({order, showStatus}) {
    const location = useLocation();
    const date = getFormatedDate(order.createdAt);
    return (
        <Link className="link-drop-style"
            to={{
                pathname: `${location.pathname}/${order.number}`,
                state: { background: location }
            }}>
            <div className={styles.mainContainer + " p-6 m-4"}>
                <div className={styles.header}>
                    <p className="text text_type_main-medium">#{order.number}</p>
                    <p className="text text_type_main-default gray-text">{date}</p>
                </div>
                <p className="text text_type_main-medium">{order.name}</p>
                {showStatus && <OrderStatus status={order.status}/>}
                {order.ingredients?.length === 0 ? <p>В заказе нет игредиентов</p> : <OrderIngredients orderIngredients={order.ingredients} />}
            </div>
        </Link>
    )
} 