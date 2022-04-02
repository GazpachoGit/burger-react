import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useSelector } from '../../services/hooks';

export const OrderDetails: FC<{}> = () => {

    const number = useSelector(state => state.ingredients.orderNumber);
    const orderFailed = useSelector(state => state.ingredients.orderFailed);
    const orderRequest = useSelector(state => state.ingredients.orderRequest);
    const orderFailedMessage = useSelector(state => state.ingredients.orderFailedMessage)

    return (
        <>
            {orderRequest ?
                <>
                    <p className="text text_type_main-medium pt-8 pb-15">Обработка заказа...</p>
                </> : orderFailed ?
                    <>
                        <p className="text text_type_main-medium pt-8 pb-15">Произошла ошибка</p>
                        <p className="text text_type_main-default pt-15 pb-2">{orderFailedMessage}</p>
                    </> :
                    <>
                        <p className="text text_type_digits-large">{number}</p>
                        <p className="text text_type_main-medium pt-8 pb-15">Индетификатор заказа</p>
                        <CheckMarkIcon type="primary" />
                        <p className="text text_type_main-default pt-15 pb-2">Ваш заказ начали готовить</p>
                        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
                    </>
            }
        </>
    )
}

export default OrderDetails;
