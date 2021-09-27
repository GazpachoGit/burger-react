import { FC } from "react";

export const OrderStatus: FC<{ status: string }> = ({ status }) => {
    let orderStatus = "";
    let ready = "";
    switch (status) {
        case 'done':
            orderStatus = 'Выполнено';
            ready = " success-text"
            break;
        default:
            orderStatus = 'Готовится';
            break
    }
    return (
        <p className={"text text_type_main-default" + ready}>{orderStatus}</p>
    )
}

export default OrderStatus
