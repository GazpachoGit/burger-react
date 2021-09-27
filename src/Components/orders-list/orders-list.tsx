import styles from "./orders-list.module.css";
import OrderCard from '../order-card/order-card';
import { TOrder } from "../../services/types/data";
import { FC } from "react";

type TProps = {
    orders: Array<TOrder>
    showStatus: boolean
}

export const OrdersList: FC<TProps> = ({ orders, showStatus }) => {
    return (
        <>
            {orders && orders.length > 0 ?
                <ul className={styles.ordersList + ' scrollable'}>
                    {orders.map(order =>
                        <OrderCard key={order._id} order={order} showStatus={showStatus} />
                    )}
                </ul> :
                <p className="text text_type_main-default">Заказы отсутствуют</p>
            }
        </>
    )
}

export default OrdersList;