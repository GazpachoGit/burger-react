import styles from "./orders-list.module.css";
import OrderCard from '../order-card/order-card';

export default function OrdersList({orders}) {
    return(
        <>
            {orders.length > 0 ?
                <ul className={styles.ordersList + ' scrollable'}>
                {orders.map(order => 
                    <OrderCard order={order} />    
                )}
                </ul> : 
                <p className="text text_type_main-default">Заказы отсутствуют</p>
            }
        </>
    )
}