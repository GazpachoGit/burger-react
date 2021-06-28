import styles from './order-details.module.css';
import {CheckMarkIcon, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

export default function OrderDetails({orderId, closeHandler}) {
    return (
        <>
            <p className="text text_type_digits-large">{orderId}</p>
            <p className="text text_type_main-medium pt-8 pb-15">Индетификатор заказа</p>
            <CheckMarkIcon type="primary" />
            <p className="text text_type_main-default pt-15 pb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>    
        </>
    )
}

OrderDetails.propTypes = {
    orderId: PropTypes.number
}