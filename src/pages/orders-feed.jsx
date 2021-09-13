import styles from "./login.module.css";
import data from '../utils/orders-feed-test-data';
import { useState } from "react";
import OrderCard from '../Components/order-card/order-card';
import OrdersStatistic from '../Components/orders-statistic/orders-statistic';

export default function OrdersFeed() {
    const [state, setState] = useState(data);
    return(
        <>
            <section className={styles.ordersFeedSection + " mt-10"}>
            <h2 className={styles.title + " text text_type_main-large"}>Лента заказов</h2>
                <article className={styles.ordersCards}>
                    <ul className={styles.ordersList + ' scrollable'}>
                    {state.orders.map(order => 
                        <OrderCard order={order} />    
                    )}
                    </ul>
                </article>
                <article className={styles.ordersStatistics}>
                    <OrdersStatistic />
                </article>
            </section>
        </>
    )
}