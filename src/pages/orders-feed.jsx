import styles from "./login.module.css";
import data from '../utils/orders-feed-test-data';
import { useEffect } from "react";
import OrdersStatistic from '../Components/orders-statistic/orders-statistic';
import { useDispatch, useSelector } from "react-redux";
import OrdersList from '../Components/orders-list/orders-list';
import {WS_COMMON_ORDERS_CONNECTION_START, WS_CONNECTION_CLOSE} from '../services/actions/wsActions';

export default function OrdersFeed() {
    const dispatch = useDispatch();
    const {wsConnected, code, error, commonOrders} = useSelector(state => state.ws);
    const {orders, statistics} = commonOrders;
    useEffect(() => {
        dispatch({type: WS_COMMON_ORDERS_CONNECTION_START})
        return () => {
            dispatch({type: WS_CONNECTION_CLOSE})
        }
    }, [dispatch])
    return(
        <> {wsConnected ? 
        <>
            <section className={styles.ordersFeedSection + " mt-10"}>
            <h2 className={styles.title + " text text_type_main-large"}>Лента заказов</h2>
            <article className={styles.ordersCards}>
                <OrdersList orders={orders}/>
            </article>
            <article className={styles.ordersStatistics}>
                <OrdersStatistic statistics={statistics} />
            </article>
            </section>
        </> : code || error ? 
        <>
            <p className="text text_type_main-default">Произошла ошибка подключения</p>
            <p className="text text_type_main-default">{'код ошибки' + code}</p>
            <p className="text text_type_main-default">{'сообщение: ' + error}</p>
        </> : <p className="text text_type_main-default">Идет загрузка...</p>}
        </>
    )
}