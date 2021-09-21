import styles from "./orders-list.module.css";
import OrderCard from '../order-card/order-card';

export default function OrdersList({orders, showStatus}) {
    return(
        <>
            {orders && orders.length > 0 ?
                <ul className={styles.ordersList + ' scrollable'}>
                {orders.map(order => 
                    <OrderCard key={order._id} order={order} showStatus={showStatus}/>    
                )}
                </ul> : 
                <p className="text text_type_main-default">Заказы отсутствуют</p>
            }
        </>
    )
}