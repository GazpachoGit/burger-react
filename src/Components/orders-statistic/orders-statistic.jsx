import styles from './orders-statistic.module.css'
export default function OrdersStatistic({statistics}) {
    const {total, totalToday, readyOrders, inProgressOrders} = statistics;
    return(
            <div className={styles.statisticsGrid}>
                <div className={styles.readyOrders}>
                    <p className="text text_type_main-medium">Готовы:</p>
                    <ul className={styles.ordersList + ' scrollable'}>
                        {readyOrders.map(item => <li key={item} className={"text text_type_digits-medium " + styles.colorSuccess}>{item}</li>)}
                    </ul>
                </div>
                <div className={styles.inProgressOrders}>
                    <p className="text text_type_main-medium">В работе:</p>
                    <ul className={styles.ordersList + ' scrollable'}>
                        {inProgressOrders.map(item => <li key={item} className="text text_type_digits-medium">{item}</li>)}
                    </ul></div>
                <div className={styles.total}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                    <p className="text text_type_digits-large">{total}</p>
                </div>
                <div className={styles.totalToday}>
                    <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                    <p className="text text_type_digits-large">{totalToday}</p>
                </div>
            </div>
    )
}