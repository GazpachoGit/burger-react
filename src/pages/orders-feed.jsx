import styles from "./login.module.css";
import data from '../utils/orders-feed-test-data';
import { useEffect, useState } from "react";
import OrderCard from '../Components/order-card/order-card';
import OrdersStatistic from '../Components/orders-statistic/orders-statistic';
import { useDispatch, useSelector } from "react-redux";
import {WS_COMMON_ORDERS_CONNECTION_START} from '../services/actions/wsActions';

export default function OrdersFeed() {
    const dispatch = useDispatch();
    const {wsConnected, code, error, commonOrders, statistics} = useSelector(state => state.ws);
    useEffect(() => {
        dispatch({type: WS_COMMON_ORDERS_CONNECTION_START})
    }, [dispatch]) 
    const [state, setState] = useState(data);
    return(
        <> {wsConnected ? 
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
                    <OrdersStatistic statistics={statistics} />
                </article>
            </section>
        </> :
        <>
            <p className="text text_type_main-default">Произошла ошибка подключения</p>
            <p className="text text_type_main-default">{'код ошибки' + code}</p>
            <p className="text text_type_main-default">{'сообщение: ' + error}</p>
        </>}
            
        </>
    )
}