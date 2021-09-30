import styles from './order-card.module.css';
import OrderIngredients from '../orders-ingredients/order-ingredients';
import { getFormatedDate } from '../../utils/order-service';
import { Link, useLocation } from 'react-router-dom';
import OrderStatus from '../order-status/order-status';
import { FC } from 'react';
import { TOrder } from '../../services/types/data';

type TProps = {
    order: TOrder,
    showStatus?: boolean
}

export const OrderCard: FC<TProps> = ({ order, showStatus }) => {
    const location = useLocation();
    const date = getFormatedDate(order.createdAt);
    const trueIngredientsList = order.ingredients.filter(item => item);
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
                {showStatus && <OrderStatus status={order.status} />}
                {order.ingredients?.length === 0 || trueIngredientsList.length === 0 ? <p>В заказе нет игредиентов</p> : <OrderIngredients orderIngredients={trueIngredientsList} />}
            </div>
        </Link>
    )
}
export default OrderCard;