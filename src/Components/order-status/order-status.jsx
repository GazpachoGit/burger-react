export default function OrderStatus({status}) {
    let orderStatus="";
    let ready = "";
    switch(status) {
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
