import styles from './order-details.module.css';
import {CheckMarkIcon, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

export default function OrderDetails(props) {
    return (
        <div className={styles.modal + ' p-30'}>
            <p className="text text_type_digits-large">{props.orderId}</p>
            <p className="text text_type_main-medium pt-8 pb-15">Индетификатор заказа</p>
            <CheckMarkIcon type="primary" />
            <p className="text text_type_main-default pt-15 pb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
            <div className={styles.close}>
                <CloseIcon onClick={props.closeHandler}  type="primary" />
            </div>     
        </div>
    )
}