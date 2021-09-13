import styles from './orders-statistic.module.css'
export default function OrdersStatistic() {
    return(
        <div className={styles.statisticsGrid}>
            <div className={styles.readyOrders}>
                <p className="text text_type_main-medium">Готовы:</p>
                <ul>
                    <li className={"text text_type_digits-medium " + styles.colorSuccess}>123</li>
                    <li className={"text text_type_digits-medium " + styles.colorSuccess}>123</li>
                    <li className={"text text_type_digits-medium " + styles.colorSuccess}>123</li>
                    <li className={"text text_type_digits-medium " + styles.colorSuccess}>123</li>
                    <li className={"text text_type_digits-medium " + styles.colorSuccess}>123</li>
                </ul>
            </div>
            <div className={styles.inProgressOrders}>
                <p className="text text_type_main-medium">В работе:</p>
                <ul>
                    <li className="text text_type_digits-medium">123</li>
                    <li className="text text_type_digits-medium">123</li>
                    <li className="text text_type_digits-medium">123</li>
                    <li className="text text_type_digits-medium">123</li>
                    <li className="text text_type_digits-medium">123</li>
                </ul></div>
            <div className={styles.total}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">222222</p>
            </div>
            <div className={styles.totalToday}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">4444444444444</p>
            </div>
        </div>
    )
}