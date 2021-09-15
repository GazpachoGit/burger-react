import { useDispatch, useSelector } from "react-redux";
import OrdersList from '../orders-list/orders-list';
import {WS_COMMON_ORDERS_CONNECTION_START, WS_CONNECTION_CLOSE} from '../../services/actions/wsActions';
import { useEffect } from "react";

export default function OrderHistory() {
    const dispatch = useDispatch();
    const {wsConnected, code, error, commonOrders} = useSelector(state => state.ws);
    const {orders, statistics} = commonOrders;
    useEffect(() => {
        dispatch({type: WS_COMMON_ORDERS_CONNECTION_START})
        return () => {
            dispatch({type: WS_CONNECTION_CLOSE})
        }
    }, [dispatch])
    return (
        <>
            <OrdersList orders={orders}/>
        </>
    )
}