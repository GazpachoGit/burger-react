import { useDispatch, useSelector } from "../../services/hooks";
import OrdersList from '../orders-list/orders-list';
import { WS_USER_ORDERS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/wsActions';
import { useEffect } from "react";

export const UserOrderHistory = () => {
    const dispatch = useDispatch();
    const { wsConnected, code, error, userOrders } = useSelector(state => state.ws);
    useEffect(() => {
        dispatch({ type: WS_USER_ORDERS_CONNECTION_START })
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE })
        }
    }, [dispatch])

    const orders = userOrders?.orders ? userOrders.orders : [];

    return (
        <>
            {wsConnected ? <OrdersList orders={orders} showStatus={true} />
                : code || error ?
                    <>
                        <p className="text text_type_main-default">Произошла ошибка подключения</p>
                        <p className="text text_type_main-default">{'код ошибки' + code}</p>
                        <p className="text text_type_main-default">{'сообщение: ' + error}</p>
                    </>
                    : <p className="text text_type_main-default">Идет загрузка...</p>
            }

        </>
    )
}
export default UserOrderHistory;